import { updateScore } from '@/Redux/features/scoreSlice';
import { RootState } from '@/Redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import useSocket from './connectSocket';
import { GameMode } from '@/types/types';

const countVowels = (word: string) => word.match(/[aeiou]/gi)?.length || 0;
const countConsonants = (word: string) => word.match(/[bcdfghjklmnpqrstvwxyz]/gi)?.length || 0;
const countSyllables = (word: string) => {
  word = word.toLowerCase().replace(/e$/, "");
  const syllableMatches = word.match(/[aeiou]{1,2}/g);
  return syllableMatches ? syllableMatches.length : 1;
};

const useComplexity = () => {
  const dispatch = useDispatch();
  const { updateMultiPlayerUserScore } = useSocket();
  const { roomId } = useSelector((state: RootState) => state.room);
  const { gameMode } = useSelector((state: RootState) => state.individualPlayerData);
  const user = useSelector((state: RootState) => state.user);

  const getScore = (word: string) => {
    if (gameMode === GameMode.SOLO) {
      return 10; 
    }

    if (!word || typeof word !== 'string') return 1;

    const length = word.length;
    const vowels = countVowels(word);
    const consonants = countConsonants(word);
    const syllables = countSyllables(word);
    const uncommonLetters = (word.match(/[qxz]/gi) || []).length;
    let score = 1;

    if (length > 10) score += 1;
    if (length > 15) score += 1;
    if (vowels > consonants) score -= 1;
    if (syllables > 2) score += 1;
    if (syllables > 4) score += 1;
    score += uncommonLetters;

    const finalScore = Math.min(Math.max(score, 1), 5);

    // Update the score if the game is in MULTIPLAYER mode
    if (user.user) {
      dispatch(updateScore({ playerId: user.user?.username, score: finalScore }));
    }

    if (user.user?.username) {
      updateMultiPlayerUserScore({ playerId: user.user.username, score: finalScore, roomId: roomId });
    }

    return finalScore;
  };

  return { getScore };
};

export default useComplexity;
