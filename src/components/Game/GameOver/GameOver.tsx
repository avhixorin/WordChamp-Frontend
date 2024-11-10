import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import CTAButton from "@/utils/CTAbutton/CTAbutton";

interface GameOverProps {
  gameOver: boolean;
  handleNewGame: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ gameOver, handleNewGame }) => {
  const [showRanking, setShowRanking] = useState(false);

  useEffect(() => {
    if (gameOver) {
      const timer = setTimeout(() => setShowRanking(true), 3000); // Delay for showing leaderboard
      return () => clearTimeout(timer);
    }
    setShowRanking(false);
  }, [gameOver]);

  return (
    <div>
      <AnimatePresence>
        {gameOver && !showRanking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-white/20 backdrop-blur-md shadow-lg rounded-lg transform transition-transform duration-200"
          >
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-xl text-center border border-white/30 text-zinc-700">
              <h2 className="text-4xl font-bold">Game Over</h2>
              <p className="text-xl mt-4 text-zinc-600">Time's up!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRanking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-white/20 backdrop-blur-md shadow-lg rounded-lg transform transition-transform duration-200"
          >
            <div
              className="bg-transparent p-8 rounded-lg shadow-xl text-center backdrop-blur-lg border border-white/30 text-zinc-700 flex flex-col justify-around items-center gap-6"
              
            >
              <LeaderBoard />
              <CTAButton
                type="button"
                onClick={handleNewGame}
                disabled={false}
                label="Start New Game"
                colour="#1E90FF"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameOver;
