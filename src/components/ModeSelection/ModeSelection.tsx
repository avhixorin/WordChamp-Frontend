import { setGameMode } from "@/Redux/features/gameModeSlice";
import { GameMode } from "@/types/types";
import CTAButton from "@/utils/CTAbutton/CTAbutton";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ModeSelection: React.FC = () => {
  const [isEntering, setIsEntering] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGameModeChange = (mode: GameMode) => {
    dispatch(setGameMode(mode));
    setIsEntering(true);
    setTimeout(() => navigate("/welcome"), 1500); // Delay navigation to complete animation
  };

  return (
    <div className="w-full h-full bg-game-bg bg-center bg-no-repeat bg-cover flex flex-col justify-center items-center font-super overflow-hidden p-4 gap-8">
      <h1 className="text-3xl font-bold text-white">Mode Selection</h1>
      <div className="flex gap-4">
        <CTAButton
          type="button"
          disabled={false}
          label="Solo"
          colour="#2563eb"
          onClick={() => handleGameModeChange(GameMode.SOLO)}
        />
        <CTAButton
          type="button"
          disabled={false}
          label="Multiplayer"
          colour="#16a34a"
          onClick={() => handleGameModeChange(GameMode.MULTIPLAYER)}
        />
      </div>

      {/* Entering Animation */}
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
              className="w-0 h-0 bg-gradient-to-r from-[#E5E6AF] via-[#C3E1C1] to-[#B1DFCB] rounded-full"
              animate={{
                width: "200vmax",
                height: "200vmax",
                transition: { duration: 1.5, ease: "easeInOut" },
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModeSelection;
