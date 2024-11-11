import { RootState } from "@/Redux/store/store";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { GameMode } from "@/types/types";

const useValidate = (word: string) => {
  const { gameString: MultiPlayerString } = useSelector((state: RootState) => state.multiPlayerData);
  const { gameMode } = useSelector((state: RootState) => state.gameMode);
  const { gameString: SoloGameString } = useSelector((state: RootState) => state.soloPlayer);

  const gameString = gameMode === GameMode.MULTIPLAYER ? MultiPlayerString : SoloGameString;

  const doesIncludes = (primary: string, secondary: string) => {
    if (primary && secondary) {
      const primaryCount: { [key: string]: number } = {};

      for (const char of primary) {
        primaryCount[char] = (primaryCount[char] || 0) + 1;
      }

      for (const char of secondary) {
        if (!primaryCount[char]) {
          return false; 
        }
        primaryCount[char]--; 
        if (primaryCount[char] < 0) {
          return false;
        }
      }
      return true; 
    } else {
      console.warn("Words are missing");
      return false;
    }
  };

  const validate = useCallback(async (): Promise<boolean> => {
    if (word.length > 0 && doesIncludes(gameString, word)) { 
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );

        if (response.ok) {
          return true; 
        } else {
          toast("That's not a valid word in the dictionary!", {
            icon: "📖",
            style: {
              background: "rgba(255, 165, 0, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              opacity: 0.9,
              color: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              backdropFilter: "blur(50px)",
            }
          });
          return false; 
        }
      } catch (error) {
        console.error("Error validating word:", error);
        toast("Unable to validate the word at the moment.", {
          icon: "⚠️",
          style: {
            background: "rgba(255, 69, 0, 0.5)",
            color: "#fff",
          }
        });
        return false;
      }
    } 
    return false;
  }, [word, gameString]);
  return validate;
};

export default useValidate;
