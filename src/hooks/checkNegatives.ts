import toast from "react-hot-toast";

const useMistake = () => {

  const buildCharCount = (word: string) => {
    const charCount: { [key: string]: number } = {};
    for (const char of word) {
      charCount[char] = (charCount[char] || 0) + 1;
    }
    return charCount;
  };

  const isMinorMistake = (primary: string, secondary: string) => {
    if (!primary || !secondary) {
      console.warn("Words are missing");
      return false;
    }

    const primaryCount = buildCharCount(primary);
    let minorMistake = false;

    for (const char of secondary) {
      if (!primaryCount[char]) {
        return false;
      }
      primaryCount[char]--;
      if (primaryCount[char] < 0) {
        minorMistake = true;
      }
    }
    return minorMistake;
  };

  const isGraveMistake = (primary: string, secondary: string) => {
    if (!primary || !secondary) {
      console.warn("Words are missing");
      return false;
    }

    const primaryCount = buildCharCount(primary);

    for (const char of secondary) {
      if (!primaryCount[char]) {
        return true;
      }
      primaryCount[char]--;
      if (primaryCount[char] < -1) {
        return true;
      }
    }
    return false;
  };

  const getNegativeScore = (primary: string, secondary: string) => {
    let score = 0;
    if (isGraveMistake(primary, secondary)) {
      score -= 5;
      toast("Almost there! You scored -2 this time", {
        icon: "😬",
        style: {
          background: "rgba(255, 255, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          opacity: 0.9,
          color: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backdropFilter: "blur(50px)",
        },
      });
    } else if (isMinorMistake(primary, secondary)) {
      score -= 3;
      toast("Just a small setback! You scored -1 this time", {
        icon: "😅",
        style: {
          background: "rgba(255, 165, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          opacity: 0.9,
          color: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backdropFilter: "blur(50px)",
        },
      });
    }

    return score;
  };

  return { getNegativeScore };
};

export default useMistake;
