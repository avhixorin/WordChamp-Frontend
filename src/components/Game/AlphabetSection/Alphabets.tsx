import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AlphaContainer from "./AlphaContainer/AlphaContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store/store";
import { GameMode } from "@/types/types";

const AlphabetSection: React.FC = () => {
  const { gameString: MultiPlayerString } = useSelector((state: RootState) => state.multiPlayerData);
  const { gameMode } = useSelector((state: RootState) => state.gameMode);
  const { gameString: SoloGameString } = useSelector((state: RootState) => state.soloPlayer);

  const [gameString, setGameString] = useState<string[]>([]);

  useEffect(() => {
    const updatedString =
      gameMode === GameMode.MULTIPLAYER
        ? (MultiPlayerString ? MultiPlayerString.toUpperCase().split("") : [])
        : (SoloGameString ? SoloGameString.toUpperCase().split("") : []);
    
    setGameString(updatedString);
  }, [gameMode, MultiPlayerString, SoloGameString]); // Depend on relevant state variables

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  return (
    <motion.div
      className="w-full py-4 flex justify-center items-center flex-wrap gap-4 font-super"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {gameString.length > 0 ? (
        gameString.map((letter, index) => (
          <AlphaContainer key={index} alphabet={letter} />
        ))
      ) : (
        <p className="text-gray-500">No game string available.</p> 
      )}
    </motion.div>
  );
};

export default AlphabetSection;
