import { Card } from "@/components/ui/card";
import { RootState } from "@/Redux/store/store";
import React from "react";
import { useSelector } from "react-redux";

type WordProps = {
  word: string;
};

const WordsCover: React.FC<WordProps> = ({ word }) => {
  return (
    <Card className="px-4 py-2 m-2 bg-[rgba(189,182,182,0.34)] text-zinc-800 text-md font-semibold rounded-full shadow-md transform hover:scale-105 hover:bg-[rgba(101,208,243,0.55)] transition-transform duration-200"
    >
      {word}
    </Card>
  );
};


const GuessedWords: React.FC = () => {
  const guessedWords = useSelector((state: RootState) => state.individualPlayerData.guessedWords);

  return (
    <Card className="w-full flex flex-col items-center bg-transparent py-4 space-y-4 border-none shadow-none">
      <div className="flex flex-wrap justify-center gap-1">
        {guessedWords && guessedWords.length > 0 ? (
          guessedWords.map((word, index) => <WordsCover key={index} word={word} />)
        ) : (
          <p className="text-white text-lg italic opacity-70">No words guessed yet!</p>
        )}
      </div>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap");

        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }
      `}</style>
    </Card>
  );
};

export default GuessedWords;
