import React, { useEffect, useState } from "react";
import "../../index.css";
import AlphabetSection from "./AlphabetSection/Alphabets";
import InputSection from "./InputSection/Input";
import GuessedWords from "./GuessedWords/GuessedWords";
import useSound from "@/hooks/useSound";
import {
  Axe,
  ScrollText,
  Shield,
  Timer,
  Volume,
  VolumeX,
  X,
} from "lucide-react";
import ScoreCard from "../ScoreCard/ScoreCard";
import ChatSection from "./ChatSection/Chats";
import { rulesContent } from "@/constants/Rules";
import { motion } from "framer-motion";
import Profile from "./Profile/Profile";
import { Difficulty, GameMode } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store/store";
import GameOver from "./GameOver/GameOver";
import { useNavigate } from "react-router-dom";

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

const SidebarLeft = ({
  handleMuteToggle,
  muted,
}: {
  handleMuteToggle: () => void;
  muted: boolean;
}) => (
  <aside className="w-full max-w-80 h-full py-6 rounded-lg flex flex-col justify-between items-center">
    <div className="ml-10 w-full">
      <button onClick={handleMuteToggle} aria-label="Toggle Mute">
        {muted ? (
          <VolumeX size={32} stroke="#27272a" />
        ) : (
          <Volume size={32} stroke="#27272a" />
        )}
      </button>
    </div>
    <ScoreCard />
    <Profile />
  </aside>
);

const MainGameSection = () => (
  <div className="w-full h-full flex flex-col justify-around items-center">
    <AlphabetSection />
    <GuessedWords />
    <InputSection />
  </div>
);

const SidebarRight = ({
  open,
  setOpen,
  powerUpVisible,
  togglePowerUpMenu,
  timer,
  timerColor,
  gameMode,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  powerUpVisible: boolean;
  togglePowerUpMenu: () => void;
  timer: number;
  timerColor: string;
  gameMode: GameMode;
}) => (
  <aside className="max-w-96 w-full h-full py-6 rounded-lg flex flex-col justify-between items-center">
    <RulesSection open={open} setOpen={setOpen} />
    {gameMode === GameMode.MULTIPLAYER && (
      <PowerUpSection
        powerUpVisible={powerUpVisible}
        togglePowerUpMenu={togglePowerUpMenu}
      />
    )}

    <TimerDisplay timer={timer} timerColor={timerColor} />
    {gameMode === GameMode.MULTIPLAYER && <ChatSection />}
  </aside>
);

const RulesSection = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div className="w-full flex flex-col items-end gap-4">
    {!open ? (
      <button onClick={() => setOpen(true)} aria-label="Show Rules">
        <ScrollText size={32} className="text-white" />
      </button>
    ) : (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
        <div className="bg-[url('/placeholder.svg?height=600&width=400')] bg-cover bg-center w-full max-w-2xl h-[80vh] rounded-lg shadow-2xl overflow-hidden relative animate-unfurl">
          <div className="absolute inset-0 bg-stone-100 bg-opacity-90"></div>
          <div className="relative h-full flex flex-col p-6 overflow-hidden custom-scrollbar">
            <h2 className="text-3xl font-bold mb-4 text-center text-amber-800 drop-shadow-md">
              WordChamp Rules
            </h2>
            <div className="flex-grow overflow-y-auto custom-scrollbar">
              {rulesContent.map((rule, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-amber-700">
                    {rule.icon}
                    {rule.title}
                  </h3>
                  <p className="text-lg leading-relaxed">{rule.content}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

const PowerUpSection = ({
  powerUpVisible,
  togglePowerUpMenu,
}: {
  powerUpVisible: boolean;
  togglePowerUpMenu: () => void;
}) => (
  <div className="relative transition-transform transform hover:scale-110 duration-300 cursor-pointer">
    <img
      src="./images/thunder.svg"
      width={32}
      height={32}
      alt="PowerUp Icon"
      onClick={togglePowerUpMenu}
    />
    {powerUpVisible && (
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
          delay: 0.2,
        }}
        className="absolute top-16 right-14 bg-transparent px-2 rounded-lg flex flex-col gap-4"
      >
        {[Timer, Shield, Axe].map((Icon, index) => (
          <motion.div
            key={index}
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              delay: index * 0.1,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 15,
              transition: { type: "spring", stiffness: 300, damping: 15 },
            }}
          >
            <Icon
              size={30}
              stroke="#000"
              fill="#fff"
              className="cursor-pointer"
            />
          </motion.div>
        ))}
      </motion.div>
    )}
  </div>
);

type TimerDisplayProps = {
  timer: number;
  timerColor: string;
};

const TimerDisplay = ({ timer, timerColor }: TimerDisplayProps) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div
      aria-label="Timer display"
      className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[rgba(255, 255, 255, 0.2)] backdrop-blur-lg border-none transition-all duration-300 hover:shadow-lg"
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <Timer size={28} strokeWidth={3} className="text-gray-600" />
      <span
        className="text-3xl font-semibold tracking-wider"
        style={{ color: timerColor }}
        aria-live="polite"
      >
        {formatTime(timer)}
      </span>
    </div>
  );
};

const timerColor = (timer: number) => {
  return timer <= 10
    ? "bg-red-500"
    : timer <= 30
    ? "bg-amber-500"
    : "bg-emerald-500";
};
