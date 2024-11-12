import ScoreCard from "@/components/ScoreCard/ScoreCard";
import { Volume, VolumeX } from "lucide-react";
import Profile from "../../Profile/Profile";

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

export default SidebarLeft;
