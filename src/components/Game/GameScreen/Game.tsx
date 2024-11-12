import React, { useEffect, useState } from "react";
import "../../../index.css";
import useSound from "@/hooks/useSound";
import { Difficulty, GameMode } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store/store";
import GameOver from "../GameOver/GameOver";
import { useNavigate } from "react-router-dom";
import SidebarLeft from "./LeftSideBar/LeftSideBar";
import MainGameSection from "./Mid/Mid";
import SidebarRight from "./RightSideBar/RightSideBar";

const Game: React.FC = () => {
  const { gameMode } = useSelector((state: RootState) => state.gameMode);
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [powerUpVisible, setPowerUpVisible] = useState(false);
  const [timer, setTimer] = useState<number>(1);
  const { playBackgroundMusic, stopBackgroundMusic } = useSound();
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const { difficulty: SoloModeDifficulty } = useSelector((state: RootState) => state.soloPlayer);
  const { roomDifficulty: MultiplayerDifficulty } = useSelector((state: RootState) => state.multiPlayerData);
  useEffect(() => {
    if (gameMode === GameMode.MULTIPLAYER) {
      setDifficulty(MultiplayerDifficulty);
    } else {
      setDifficulty(SoloModeDifficulty);
    }
  }, [gameMode, MultiplayerDifficulty, SoloModeDifficulty]);
  useEffect(() => {
    enableFullScreenOnKeyPress();
    return () => disableFullScreenOnKeyPress();
  }, []);

  useEffect(() => {
    setTimer(getMaxTimeForDifficulty(difficulty));
    const interval = setInterval(() => {
      setTimer((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [difficulty]);

  useEffect(() => {
    if (timer <= 0) {
      handleGameOver();
    }
  }, [timer]);

  const handleMuteToggle = () => {
    setMuted((prev) => !prev);
    if (muted) {
      stopBackgroundMusic();
    } else {
      playBackgroundMusic("./sounds/background1.mp3");
    }
  };

  const togglePowerUpMenu = () => setPowerUpVisible((prev) => !prev);
  const handleGameOver = () => {
    setGameOver(true);
    console.log("Game over!");
  };
  const navigate = useNavigate();
  const [gameOver, setGameOver] = useState(false);
  const handleNewGame = () => {
    navigate("/");
  };
  return (
    <div className="relative flex justify-around items-center bg-game-bg1 bg-center bg-cover w-full p-4 h-full gap-2">
      <GameOver gameOver={gameOver} handleNewGame={handleNewGame} />
      {/* Left Sidebar */}
      <SidebarLeft handleMuteToggle={handleMuteToggle} muted={muted} />

      {/* Main Game Section */}
      <MainGameSection />

      {/* Right Sidebar */}
      <SidebarRight
        open={open}
        setOpen={setOpen}
        powerUpVisible={powerUpVisible}
        togglePowerUpMenu={togglePowerUpMenu}
        timer={timer}
        timerColor={timerColor(timer)}
        gameMode={gameMode}
      />
    </div>
  );
};

export default Game;

// Helper Functions and Utility Components

function enableFullScreenOnKeyPress() {
  const enterFullScreen = () => document.documentElement.requestFullscreen();
  const exitFullScreen = () => document.exitFullscreen();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "F") {
      if (document.fullscreenElement) {
        exitFullScreen();
      } else {
        enterFullScreen();
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
}

function disableFullScreenOnKeyPress() {
  window.removeEventListener("keydown", enableFullScreenOnKeyPress);
}

const getMaxTimeForDifficulty = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.EASY:
      return 5 * 60;
    case Difficulty.MEDIUM:
      return 3.5 * 60;
    case Difficulty.HARD:
      return 2 * 60;
    case Difficulty.GOD:
      return 40;
    default:
      return 5 * 60;
  }
};

const timerColor = (timer: number) => {
  return timer <= 10
    ? "bg-red-500"
    : timer <= 30
    ? "bg-amber-500"
    : "bg-emerald-500";
};
