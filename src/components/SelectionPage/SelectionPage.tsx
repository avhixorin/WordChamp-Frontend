import React, { useState, useCallback } from "react"; 
import { Card, CardContent, CardHeader } from "../ui/card";
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
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { setRoomDifficulty } from "@/Redux/features/multiPlayerDataSlice";
import { setSoloPlayerField } from "@/Redux/features/soloPlayerSlice";

const SelectionPage: React.FC = () => {
  const [localDifficulty, setLocalDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const soloUser = useSelector((state: RootState) => state.soloPlayer);
  const navigate = useNavigate();
  const { startSoloGame,startGame } = useSocket();
  const { room } = useSelector((state: RootState) => state.multiPlayerData);
  const { gameMode } = useSelector((state: RootState) => state.gameMode);
  const dispatch = useDispatch();
  const gameData = useSelector((state: RootState) => state.multiPlayerData);

  const handleClick = useCallback(() => {
    dispatch(setRoomDifficulty(localDifficulty));
    dispatch(setSoloPlayerField({key: "difficulty", value: localDifficulty}));
    if (gameMode === GameMode.MULTIPLAYER && room) {
      startGame({gameData});
    } else {
      startSoloGame(soloUser);
      navigate("/game");
    }
    console.log("Starting game with difficulty:", localDifficulty);
  }, [localDifficulty, gameMode, room, startGame, gameData, navigate, dispatch, soloUser, startSoloGame]);

  return (
    <div className="relative w-full h-full flex justify-center items-center overflow-hidden bg-game-bg bg-center bg-cover bg-no-repeat text-zinc-700">
      <Card className="px-6 bg-opacity-80 shadow-lg backdrop-blur-md rounded-lg">
        <CardHeader>
          <h1 className="text-3xl text-center font-bold mb-4">
            Select Game Difficulty
          </h1>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="w-full max-w-sm">
              <Select onValueChange={(value) => setLocalDifficulty(value as Difficulty)}>
                <SelectTrigger className="w-full bg-slate-800 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
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
            <Button 
              onClick={handleClick} 
              className="w-full bg-indigo-600 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Start Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectionPage;
