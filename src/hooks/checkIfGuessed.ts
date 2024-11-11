import { RootState } from "@/Redux/store/store";
import { GameMode } from "@/types/types";
import { useSelector } from "react-redux";

const useCheckIfGuessed = () => {
  
  const { guessedWords: SoloPlayerGuessedWords } = useSelector((state: RootState) => state.soloPlayer);
  const { guessedWords: MultiPlayerGuessedWords } = useSelector((state: RootState) => state.multiPlayerData);

  const { gameMode } = useSelector((state: RootState) => state.gameMode);

  const guessedWords = gameMode === GameMode.MULTIPLAYER ? MultiPlayerGuessedWords : SoloPlayerGuessedWords;

  const checkIfGuessed = (word: string) => {
    const normalizedWord = word.toLowerCase();
    return guessedWords.some((guessedWord) => guessedWord.toLowerCase() === normalizedWord);
  };

  return { checkIfGuessed };
};

export default useCheckIfGuessed;
