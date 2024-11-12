import { GameMode } from "@/types/types";
import RulesSection from "../RuleSection/RuleSection";
import PowerUpSection from "../PowerUpSection/PowerUpSection";
import TimerDisplay from "../TimerSection/TimerSection";
import ChatSection from "../../ChatSection/Chats";

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
  <aside className="w-full md:max-w-96 h-full py-4 px-2 md:px-6 rounded-lg flex flex-col md:flex-col justify-between items-center md:items-end gap-4 font-super">
    {/* Rules and Power-Up Sections */}
    <div className="w-full flex flex-col gap-4">
      <RulesSection open={open} setOpen={setOpen} />
      {gameMode === GameMode.MULTIPLAYER && (
        <PowerUpSection
          powerUpVisible={powerUpVisible}
          togglePowerUpMenu={togglePowerUpMenu}
        />
      )}
    </div>

    {/* Timer Display */}
    <TimerDisplay timer={timer} timerColor={timerColor} />

    {/* Chat Section (Visible in Multiplayer Mode Only) */}
    {gameMode === GameMode.MULTIPLAYER && (
      <div className="w-full md:w-auto flex justify-center md:justify-end">
        <ChatSection />
      </div>
    )}
  </aside>
);

export default SidebarRight;
