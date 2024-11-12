import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useSound from "@/hooks/useSound";
import { Volume, VolumeX } from "lucide-react";
import Rules from "../Game/Rules/Rules";
import { useDispatch } from "react-redux";
import { resetSoloPlayer } from "@/Redux/features/soloPlayerSlice";
import { resetGameMode } from "@/Redux/features/gameModeSlice";
import { resetMultiPlayerData } from "@/Redux/features/multiPlayerDataSlice";
import { resetMultiplayerUser } from "@/Redux/features/multiPlayerUserSlice";
import { clearMessages } from "@/Redux/features/messageSlice";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEntering, setIsEntering] = useState(false);
  const { playEnterSound, playBackgroundMusic, stopBackgroundMusic } = useSound();
  useEffect(() => {
    dispatch(resetSoloPlayer());
    dispatch(resetGameMode());
    dispatch(resetMultiPlayerData());
    dispatch(resetMultiplayerUser());
    dispatch(clearMessages());
  },[dispatch]);
  useEffect(() => {
    playBackgroundMusic('/sounds/background1.mp3');

    return () => {
      stopBackgroundMusic();
    };
  }, [playBackgroundMusic, stopBackgroundMusic]);

  const handleEnterGame = () => {
    stopBackgroundMusic();
    setIsEntering(true);
    playEnterSound();

    setTimeout(() => {
      navigate("/mode");
    }, 1500);
  };

  const [muted, setMuted] = useState(false);
  return (
    <div className="relative w-full h-full flex justify-center items-center overflow-hidden bg-game-bg bg-center bg-cover bg-no-repeat font-super">

      <div className="absolute top-10 left-10 z-10">
        {
          muted ? (
            <button
              onClick={() => {
                setMuted(false);
                playBackgroundMusic('/sounds/background1.mp3');
              }}
            >
              <VolumeX size={32} stroke="#fdfdfd" />
            </button>
          ) : (
            <button
              onClick={() => {
                setMuted(true);
                stopBackgroundMusic();
              }}
            >
              <Volume size={32} stroke="#fdfdfd" />
            </button>
          )
        }
        
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-full px-4">
        <motion.img
          src="/images/title.png"
          initial={{ scale: 0 }}
          animate={{ scale: 1.1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 7,
            duration: 0.5,
          }}
          onAnimationComplete={() => {
            document
              .querySelector("img.w-[32rem]")
              ?.setAttribute("style", "transform: scale(1);");
          }}
          className="w-[32rem]"
        />

        <motion.button
          className="relative px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg 
            transition-transform duration-300 ease-out overflow-hidden"
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={handleEnterGame}
          initial={{ y: 0 }}
          animate={{ y: [0, -5, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1.5,
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 opacity-25 rounded-full blur-md -z-10 hover:backdrop-blur-lg hover:bg-transparent hover:text-white"></span>
          Enter Game
        </motion.button>
        
      </div>
      <Rules/>
      <AnimatePresence>
        {isEntering && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div
              className="w-0 h-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
              animate={{
                width: '200vmax',
                height: '200vmax',
                transition: { duration: 1.5, ease: 'easeInOut' },
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
