import React, { useState, useCallback, useEffect } from "react"; 
import { CardContent, CardHeader } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Difficulty, GameMode } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "@/hooks/connectSocket";
import { RootState } from "@/Redux/store/store";
import { useNavigate } from "react-router-dom";
import { setRoomDifficulty } from "@/Redux/features/multiPlayerDataSlice";
import { setSoloPlayerField } from "@/Redux/features/soloPlayerSlice";
import CTAButton from "@/utils/CTAbutton/CTAbutton";

const SelectionPage: React.FC = () => {
  const [localDifficulty, setLocalDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const soloUser = useSelector((state: RootState) => state.soloPlayer);
  const navigate = useNavigate();
  const { startSoloGame, startGame } = useSocket();
  const { room } = useSelector((state: RootState) => state.multiPlayerData);
  const { gameMode } = useSelector((state: RootState) => state.gameMode);
  const dispatch = useDispatch();
  const gameData = useSelector((state: RootState) => state.multiPlayerData);

  const [gameDataUpdated, setGameDataUpdated] = useState(gameData);

  // Update gameDataUpdated when gameData changes
  useEffect(() => {
    setGameDataUpdated(gameData);
  }, [gameData]);

  const handleClick = useCallback(() => {
    dispatch(setRoomDifficulty(localDifficulty));
    dispatch(setSoloPlayerField({ key: "difficulty", value: localDifficulty }));

    if (gameMode === GameMode.MULTIPLAYER && room) {
      startGame({ gameData: gameDataUpdated });
    } else {
      startSoloGame(soloUser);
      navigate("/game");
    }

    console.log("Starting game with difficulty:", localDifficulty);
  }, [localDifficulty, gameMode, room, startGame, gameDataUpdated, navigate, dispatch, soloUser, startSoloGame]);

  return (
    <div className="relative w-full h-full flex justify-center items-center overflow-hidden bg-game-bg bg-center bg-cover bg-no-repeat text-zinc-700">
      <div
        className="w-full max-w-lg max-h-96 bg-[rgba(255,255,255,0.1)] backdrop-blur-lg rounded-lg shadow-lg p-6"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <CardHeader>
          <h1 className="text-3xl text-center font-bold mb-4 text-zinc-700">Select Game Difficulty</h1>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-center items-center space-y-4 gap-4">
            <div className="w-full max-w-sm flex justify-center">
              <Select onValueChange={(value) => setLocalDifficulty(value as Difficulty)}>
                <SelectTrigger className="w-3/4 bg-[rgba(255,255,255,0.1)] backdrop-blur-lg text-zinc-700 p-2 rounded-lg font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Difficulty.EASY} className="cursor-pointer font-bold">
                    Easy
                  </SelectItem>
                  <SelectItem value={Difficulty.MEDIUM} className="cursor-pointer font-bold">
                    Medium
                  </SelectItem>
                  <SelectItem value={Difficulty.HARD} className="cursor-pointer font-bold">
                    Hard
                  </SelectItem>
                  <SelectItem value={Difficulty.GOD} className="cursor-pointer font-bold">
                    God
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CTAButton
            onClick={handleClick}
            type="button"
            disabled={false}
            colour="#4f46e5"
            label="Start Game"
            />
            {/* <Button 
              onClick={handleClick} 
              className="w-full max-w-lg bg-indigo-600 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Start Game
            </Button> */}
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default SelectionPage;
