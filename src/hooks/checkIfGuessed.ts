import { RootState } from "@/Redux/store/store";
import { useSelector } from "react-redux";

const useCheckIfGuessed = () => {
  const { guessedWords } = useSelector((state: RootState) => state.individualPlayerData);

  const checkIfGuessed = (word: string) => {
    const normalizedWord = word.toLowerCase();
    return guessedWords.some((guessedWord) => guessedWord.toLowerCase() === normalizedWord);
  };

  return { checkIfGuessed };
};

export default useCheckIfGuessed;
