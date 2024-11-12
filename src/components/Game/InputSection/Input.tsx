import React, { useState, useMemo } from "react";
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
import { Answer, GameMode, Verdict } from "@/types/types";
import {
  addSoloPlayerAnswer,
  addSoloPlayerGuessWord,
  updateSoloPlayerScore,
} from "@/Redux/features/soloPlayerSlice";
import {
  addMultiPlayerGuessedWord,
  updatePlayerScoreAndAnswer,
} from "@/Redux/features/multiPlayerDataSlice";
import useSocket from "@/hooks/connectSocket";

const InputSection: React.FC = () => {
  const dispatch = useDispatch();
  const { updateMultiPlayerUserScore } = useSocket();
  const filter = new Filter();
  const [inputWord, setInputWord] = useState<string>("");
  const validate = useValidate(inputWord);
  const { getScore } = useComplexity();
  const { getNegativeScore } = useMistake();
  const { checkIfGuessed } = useCheckIfGuessed();

  const { gameMode } = useSelector((state: RootState) => state.gameMode);
  const soloUser = useSelector((state: RootState) => state.soloPlayer);
  const multiPlayerUser = useSelector((state: RootState) => state.multiPlayerUser);
  const multiPlayerData = useSelector((state: RootState) => state.multiPlayerData);

  // Derive user based on game mode with useMemo
  const user = useMemo(() => (gameMode === GameMode.SOLO ? soloUser : multiPlayerUser), [
    gameMode,
    soloUser,
    multiPlayerUser,
  ]);

  // Derive game string based on game mode
  const gameString = useMemo(() => {
    const selectedGameString =
      gameMode === GameMode.MULTIPLAYER ? multiPlayerData.gameString : soloUser.gameString;
    return selectedGameString ? selectedGameString.toUpperCase().split(" ") : [];
  }, [gameMode, multiPlayerData, soloUser]);

  // Handle profanity detection and score update
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
    const guessedWordData: Answer = {
      word: inputWord.toUpperCase(),
      verdict: Verdict.PROFANE,
      awardedPoints: scorePenalty,
    };

    updateScoreAndGuesses(scorePenalty, guessedWordData);
  };

  // Update score and guesses for both modes
  const updateScoreAndGuesses = (score: number, guessedWordData: Answer) => {
    if (gameMode === GameMode.SOLO) {
      dispatch(updateSoloPlayerScore(score));
      dispatch(addSoloPlayerAnswer(guessedWordData));
      if(guessedWordData.verdict === Verdict.CORRECT){
        dispatch(addSoloPlayerGuessWord(inputWord.toUpperCase()));
      }
    } else {
      dispatch(
        updatePlayerScoreAndAnswer({
          playerId: user?.id ?? "",
          score,
          guessedWord: guessedWordData,
        })
      );
      dispatch(addMultiPlayerGuessedWord(inputWord.toUpperCase()));
      emitMultiPlayerScoreChange(guessedWordData);
    }
  };

  const emitMultiPlayerScoreChange = (guessedWord: Answer) => {
    updateMultiPlayerUserScore({
      roomData: multiPlayerData,
      player: multiPlayerUser,
      guessedWord: guessedWord,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (filter.isProfane(inputWord)) {
      handleProfanity();
      setInputWord("");
      return;
    }

    const isValid = await validate();
    const guessedWord = inputWord.toUpperCase();

    if (isValid && !checkIfGuessed(guessedWord)) {
      const finalScore = getScore(inputWord.toLowerCase());
      const correctWordData: Answer = {
        word: guessedWord,
        verdict: Verdict.CORRECT,
        awardedPoints: finalScore,
      };

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

      updateScoreAndGuesses(finalScore, correctWordData);
    } else {
      const negativeScore = getNegativeScore(gameString.join(" "), inputWord);
      const incorrectWordData: Answer = {
        word: guessedWord,
        verdict: Verdict.INCORRECT,
        awardedPoints: negativeScore,
      };

      updateScoreAndGuesses(negativeScore, incorrectWordData);
    }

    setInputWord("");
  };

  return (
    <Card className="w-full flex flex-col md:flex-row bg-transparent gap-4 justify-between items-center border-none shadow-none">
      <div className="w-full md:p-6 rounded-lg transform hover:scale-105 transition-transform duration-300 ease-out">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-4">
          <CardContent className="px-2 py-0 md:p-6 flex items-center gap-4">
            <motion.div
              className="flex-1 relative"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Input
                type="text"
                placeholder="Enter a word..."
                aria-label="Input word"
                className="w-full py-2 px-4 rounded-md text-lg font-semibold text-gray-800 shadow-md bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-md focus:outline-none focus:ring-4 focus:ring-blue-400/50"
                value={inputWord.toUpperCase()}
                onChange={(e) => setInputWord(e.target.value.toLowerCase())}
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <CTAButton
                type="submit"
                disabled={false}
                label="Enter"
                colour="#3b82f6"
                onClick={() => {}}
              />
            </motion.div>
          </CardContent>
        </form>
      </div>
    </Card>
  );
};

export default InputSection;
