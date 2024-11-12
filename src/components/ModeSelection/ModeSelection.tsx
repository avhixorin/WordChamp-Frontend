import { setGameMode } from "@/Redux/features/gameModeSlice";
import { GameMode } from "@/types/types";
import CTAButton from "@/utils/CTAbutton/CTAbutton";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ModeSelection: React.FC = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleGameModeChange = (mode: GameMode) => {
    dispatch(setGameMode(mode));
    navigate("/welcome")
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-game-bg bg-center bg-no-repeat p-4 gap-8 font-super overflow-y-auto">
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
    </div>
  );
};

export default ModeSelection;
