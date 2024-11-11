import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { GameMode } from "@/types/types";
import useSound from "@/hooks/useSound";
import { Volume, VolumeX } from "lucide-react";
import CTAButton from "@/utils/CTAbutton/CTAbutton";
import { AnimatePresence, motion } from "framer-motion";
import { RootState } from "@/Redux/store/store";
import { setSoloPlayerField } from "@/Redux/features/soloPlayerSlice";
import { setMultiPlayerUserField } from "@/Redux/features/multiPlayerUserSlice";

const avatars = [
  {
    name: "Hikari-Blade",
    src: "https://res.cloudinary.com/avhixorin/image/upload/v1731336213/avatar4_elomef.png",
  },
  {
    name: "Ryuu-Reign",
    src: "https://res.cloudinary.com/avhixorin/image/upload/v1731336212/avatar3_ahl1hl.png",
  },
  {
    name: "Nami-Storm",
    src: "https://res.cloudinary.com/avhixorin/image/upload/v1731336212/avatar2_qt1ogf.png",
  },
  {
    name: "Aki-Rei",
    src: "https://res.cloudinary.com/avhixorin/image/upload/v1731336218/avatar1_lw5cta.png",
  },
];

export default function Welcome() {
  const { gameMode } = useSelector((state: RootState) => state.gameMode);
  const dispatch = useDispatch();
  const [isEntering, setIsEntering] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [username, setUsername] = useState("@");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { playEnterSound, playBackgroundMusic, stopBackgroundMusic } =
    useSound();
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    playBackgroundMusic("./sounds/background1.mp3");
    return () => stopBackgroundMusic();
  }, [playBackgroundMusic, stopBackgroundMusic]);

  const handleEnter = useCallback(() => {
    if (!selectedAvatar || !username || username === "@") {
      setErrorMessage("Please select an avatar and enter a valid username.");
      return;
    }

    stopBackgroundMusic();
    playEnterSound();
    setIsEntering(true);
    if (gameMode === GameMode.SOLO) {
      dispatch(setSoloPlayerField({ key: "id", value: uuid() }));
      dispatch(setSoloPlayerField({ key: "username", value: username }));
      dispatch(setSoloPlayerField({ key: "avatar", value: selectedAvatar }));
      navigate("/selection");
    } else {
      dispatch(setMultiPlayerUserField({ key: "id", value: uuid() }));
      dispatch(setMultiPlayerUserField({ key: "username", value: username }));
      dispatch(setMultiPlayerUserField({ key: "avatar", value: selectedAvatar }));

      setTimeout(() => {
        navigate("/pg2");
      }, 1500);
    }
  }, [
    stopBackgroundMusic,
    playEnterSound,
    dispatch,
    username,
    selectedAvatar,
    navigate,
    gameMode,
  ]);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") handleEnter();
    },
    [handleEnter]
  );

  useEffect(() => {
    document.querySelector("html")?.addEventListener("keydown", handleKeydown);
    return () =>
      document
        .querySelector("html")
        ?.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  const avatarList = useMemo(() => avatars, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden bg-game-bg bg-center bg-cover bg-white">
      <div className="absolute top-10 left-10 z-10">
        {muted ? (
          <button
            onClick={() => {
              setMuted(false);
              playBackgroundMusic("./sounds/background1.mp3");
            }}
          >
            <VolumeX size={32} stroke="#fdfdfd" />
          </button>
        ) : (
          <button
            onClick={() => {
              setMuted(true);
              stopBackgroundMusic();
            }}
          >
            <Volume size={32} stroke="#fdfdfd" />
          </button>
        )}
      </div>
      <div className="absolute inset-0 opacity-70"></div>
      <div className="absolute max-w-lg h-full bg-scroll bg-center bg-cover"></div>

      <div className="relative bg-transparent font-super rounded-3xl p-8 max-w-md w-full space-y-8 z-10 shadow-2xl shadow-neonAccent/40">
        <div className="text-4xl md:text-5xl font-bold text-center animate-bounce text-slate-100 dark:text-neonBlue">
          Welcome to WORD CHAMP!
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-200 dark:text-neonAccent text-center">
            Choose Your Avatar
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {avatarList.map((avatar) => (
              <button
                key={avatar.name}
                className={`p-4 rounded-xl transition-transform duration-300 ease-in-out ${
                  selectedAvatar === avatar.src
                    ? "bg-neonBlue scale-110 shadow-lg shadow-neonBlue/50"
                    : "bg-white/10 backdrop-blur-sm hover:backdrop-blur-md hover:scale-105"
                }`}
                onClick={() => setSelectedAvatar(avatar.src)}
              >
                <img
                  src={avatar.src}
                  alt={avatar.name}
                  className={`w-12 h-12 mx-auto ${
                    selectedAvatar === avatar.name
                      ? "opacity-100"
                      : "opacity-70"
                  }`}
                />
                <p
                  className={`mt-2 text-center font-bold text-sm ${
                    selectedAvatar === avatar.name
                      ? "text-red-700"
                      : "text-slate-700"
                  }`}
                >
                  {avatar.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-center gap-2">
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent border-2 border-gray-600 placeholder-gray-400 text-xl font-extrabold text-slate-600 rounded-lg focus:ring-2 focus:ring-neonBlue focus:ring-opacity-50 focus:outline-none transition-all duration-300 shadow-md hover:shadow-lg"
            style={{
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          />
          {errorMessage && (
            <p className="text-red-600 text-center">{errorMessage}</p>
          )}
          <CTAButton
            disabled={isEntering}
            type="button"
            label="Enter Game"
            colour="#ece5a1"
            onClick={handleEnter}
          />
        </div>
      </div>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap");

        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(-5px); }
          50% { transform: translateY(0); }
        }
      `}</style>

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
}
