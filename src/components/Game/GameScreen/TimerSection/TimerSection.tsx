import { Timer } from "lucide-react";

type TimerDisplayProps = {
    timer: number;
    timerColor: string;
  };
  
  const TimerDisplay = ({ timer, timerColor }: TimerDisplayProps) => {
    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    };
  
    return (
      <div
        aria-label="Timer display"
        className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[rgba(255, 255, 255, 0.2)] backdrop-blur-lg border-none transition-all duration-300 hover:shadow-lg font-super"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <Timer size={28} strokeWidth={3} className="text-gray-600" />
        <span
          className="text-3xl font-semibold tracking-wider"
          style={{ color: timerColor }}
          aria-live="polite"
        >
          {formatTime(timer)}
        </span>
      </div>
    );
  };

    export default TimerDisplay;
  
  