import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Filter } from "bad-words";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CTAButton from "@/utils/CTAbutton/CTAbutton";
import useValidate from "@/hooks/validateWord";
import useComplexity from "@/hooks/checkComplexity";
import useMistake from "@/hooks/checkNegatives";
import useCheckIfGuessed from "@/hooks/checkIfGuessed";
import { RootState } from "@/Redux/store/store";
import { GameMode, MultiplayerUser, SoloPlayer, Verdict } from "@/types/types";
import { addSoloPlayerAnswer, updateSoloPlayerScore } from "@/Redux/features/soloPlayerSlice";
import { addMultiPlayerUserAnswer, updateMultiPlayerUserScore } from "@/Redux/features/multiPlayerUserSlice";
import { updatePlayerScoreAndAnswer } from "@/Redux/features/multiPlayerDataSlice";

const InputSection: React.FC = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<SoloPlayer | MultiplayerUser>();
  const { gameMode } = useSelector((state: RootState) => state.gameMode);
  const soloUser = useSelector((state: RootState) => state.soloPlayer);
  const multiPlayerUser = useSelector((state: RootState) => state.multiPlayerUser);

  useEffect(() => {
    if (gameMode === GameMode.SOLO) {
      setUser(soloUser);
    } else {
      setUser(multiPlayerUser);
    }
  }, [gameMode, soloUser, multiPlayerUser]);

  const { gameString: MultiPlayerString } = useSelector((state: RootState) => state.multiPlayerData);
  const { gameString: SoloPlayerString } = useSelector((state: RootState) => state.soloPlayer);

  const [gameString, setGameString] = useState<string[]>([]);

  useEffect(() => {
    // Ensure strings are defined before calling toUpperCase
    const updatedGameString =
      gameMode === GameMode.MULTIPLAYER
        ? MultiPlayerString ? MultiPlayerString.toLocaleUpperCase().split(" ") : []
        : SoloPlayerString ? SoloPlayerString.toLocaleUpperCase().split(" ") : [];

    setGameString(updatedGameString);
  }, [gameMode, MultiPlayerString, SoloPlayerString]);

  const [inputWord, setInputWord] = useState<string>("");

  const filter = new Filter();
  const validate = useValidate(inputWord.toLowerCase());
  const { getScore } = useComplexity();
  const { getNegativeScore } = useMistake();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputWord(e.target.value);

  const handleProfanity = () => {
    toast(`Oh no! That's a profane word!`, {
      icon: "🤬",
      style: {
        background: "rgba(255, 0, 0, 0.8)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        opacity: 0.9,
        color: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backdropFilter: "blur(50px)",
      },
    });

    const scorePenalty = -3;
    if (gameMode === GameMode.SOLO) {
      dispatch(updateSoloPlayerScore(scorePenalty));
      dispatch(addSoloPlayerAnswer({ word: inputWord.toUpperCase(), verdict: Verdict.PROFANE, awardedPoints: scorePenalty }));
    } else {
      dispatch(updateMultiPlayerUserScore(scorePenalty));
      dispatch(addMultiPlayerUserAnswer({ word: inputWord.toUpperCase(), verdict: Verdict.PROFANE, awardedPoints: scorePenalty }));
      dispatch(updatePlayerScoreAndAnswer({
        playerId: user ? user.username : "",
        score: scorePenalty,
        guessedWord: { word: inputWord.toUpperCase(), verdict: Verdict.PROFANE, awardedPoints: scorePenalty },
      }));
    }
  };

  const { checkIfGuessed } = useCheckIfGuessed();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (filter.isProfane(inputWord)) {
      handleProfanity();
      return;
    }

    const isValid = await validate();
    if (isValid && !checkIfGuessed(inputWord.toUpperCase())) {
      const finalScore = getScore(inputWord.toLowerCase());

      toast(`That's correct! You’ve earned +${finalScore} points!`, {
        icon: "🎉",
        style: {
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          opacity: 0.9,
          color: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backdropFilter: "blur(50px)",
        },
      });

      if (gameMode === GameMode.SOLO) {
        dispatch(updateSoloPlayerScore(finalScore));
        dispatch(addSoloPlayerAnswer({ word: inputWord.toUpperCase(), verdict: Verdict.CORRECT, awardedPoints: finalScore }));
      } else {
        dispatch(updateMultiPlayerUserScore(finalScore));
        dispatch(addMultiPlayerUserAnswer({ word: inputWord.toUpperCase(), verdict: Verdict.CORRECT, awardedPoints: finalScore }));
        dispatch(updatePlayerScoreAndAnswer({
          playerId: user ? user.username : "",
          score: finalScore,
          guessedWord: { word: inputWord.toUpperCase(), verdict: Verdict.CORRECT, awardedPoints: finalScore },
        }));
      }
    } else {
      const negativeScore = getNegativeScore(gameString.join(""), inputWord);
      if (gameMode === GameMode.SOLO) {
        dispatch(updateSoloPlayerScore(negativeScore));
        dispatch(addSoloPlayerAnswer({ word: inputWord.toUpperCase(), verdict: Verdict.INCORRECT, awardedPoints: negativeScore }));
      } else {
        dispatch(updateMultiPlayerUserScore(negativeScore));
        dispatch(addMultiPlayerUserAnswer({ word: inputWord.toUpperCase(), verdict: Verdict.INCORRECT, awardedPoints: negativeScore }));
        dispatch(updatePlayerScoreAndAnswer({
          playerId: user ? user.username : "",
          score: negativeScore,
          guessedWord: { word: inputWord.toUpperCase(), verdict: Verdict.INCORRECT, awardedPoints: negativeScore },
        }));
      }
    }
    setInputWord("");
  };

  return (
    <Card className="w-full flex flex-col md:flex-row bg-transparent gap-4 justify-between items-center border-none shadow-none">
      <div className="w-full p-6 rounded-lg transform hover:scale-105 transition-transform duration-300 ease-out">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <CardContent className="flex items-center gap-4">
            <motion.div className="flex-1 relative" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <Input
                type="text"
                placeholder="Enter a word..."
                className="w-full py-2 px-4 rounded-md text-lg font-semibold text-gray-800 shadow-md bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-md focus:outline-none focus:ring-4 focus:ring-blue-400/50"
                value={inputWord.toUpperCase()}
                onChange={handleInputChange}
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <CTAButton type="submit" disabled={false} label="Enter" colour="#3b82f6" onClick={() => {}} />
            </motion.div>
          </CardContent>
        </form>
      </div>
    </Card>
  );
};

export default InputSection;
