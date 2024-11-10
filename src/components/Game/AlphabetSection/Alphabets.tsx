import React from "react";
import { motion } from "framer-motion";
import AlphaContainer from "./AlphaContainer/AlphaContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store/store";
import { GameMode } from "@/types/types";

const AlphabetSection: React.FC = () => {
  const { gameMode, soloGameString } = useSelector((state: RootState) => state.individualPlayerData);

  // Safely extract the game string based on the game mode
  const gameString = useSelector((state: RootState) => {
    if (gameMode === GameMode.MULTIPLAYER) {
      return state.sharedGameData.currentGameString?.toUpperCase().split("") || [];
    } else {
      return soloGameString?.toUpperCase().split("") || [];
    }
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  return (
    <motion.div
      className="w-full py-4 flex justify-center items-center flex-wrap gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {gameString.length > 0 ? (
        gameString.map((letter, index) => (
          <AlphaContainer key={index} alphabet={letter} />
        ))
      ) : (
        <p className="text-gray-500">No game string available.</p> // Optional fallback message
      )}
    </motion.div>
  );
};

export default AlphabetSection;
