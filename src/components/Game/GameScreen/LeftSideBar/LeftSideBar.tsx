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
  <aside className="w-full max-w-96 h-full py-6 rounded-lg flex flex-col justify-between items-center">
    <div className="md:ml-10 mb-4 md:mb-0 w-full">
      <button onClick={handleMuteToggle} aria-label="Toggle Mute">
        {muted ? (
          <VolumeX size={32} stroke="#27272a" />
        ) : (
          <Volume size={32} stroke="#27272a" />
        )}
      </button>
    </div>
    <ScoreCard />
    <div className="hidden md:block">

    <Profile />
    </div>
  </aside>
);

export default SidebarLeft;
