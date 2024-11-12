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
  <aside className="max-w-96 w-full h-full py-6 rounded-lg flex flex-col justify-between items-end gap-4">
    <div className="w-full flex flex-col gap-6 mr-4">
    <RulesSection open={open} setOpen={setOpen} />
    {gameMode === GameMode.MULTIPLAYER && (
      <PowerUpSection
        powerUpVisible={powerUpVisible}
        togglePowerUpMenu={togglePowerUpMenu}
      />
     )}
    </div>
    

    <TimerDisplay timer={timer} timerColor={timerColor} />
    {gameMode === GameMode.MULTIPLAYER && <ChatSection />}
  </aside>
);

export default SidebarRight;
