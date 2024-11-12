import React, { useState, useEffect } from 'react';

const icons = ['🍎', '🍊', '🍇', '🍉', '🍌', '🍒', '🍑', '🍍'];

const shuffleArray = (arr:string[]) => [...arr, ...arr].sort(() => Math.random() - 0.5);
type TileProps = {
  icon:string,
  isFlipped: boolean,
  onClick: () => void
}
const Tile = ({ icon, isFlipped, onClick }: TileProps) => (
  <div
    className={`h-24 w-24 m-2 flex items-center justify-center text-4xl 
      bg-blue-500 rounded-lg ${isFlipped ? '' : 'bg-opacity-50'}`}
    onClick={onClick}
  >
    {isFlipped ? icon : '❓'}
  </div>
);

const Memory: React.FC = () => {
  const [tiles, setTiles] = useState(shuffleArray(icons));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flipped.length === 2) {
      const [firstIndex, secondIndex] = flipped;
      if (tiles[firstIndex] === tiles[secondIndex]) {
        setMatched((prev) => [...prev, firstIndex, secondIndex]);
      }
      setTimeout(() => setFlipped([]), 1000);
      setMoves((prev) => prev + 1);
    }
  }, [flipped, tiles]);

  const handleClick = (index: number) => {
    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
      setFlipped((prev) => [...prev, index]);
    }
  };

  const resetGame = () => {
    setTiles(shuffleArray(icons));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-100 font-super">
      <h1 className="text-4xl mb-4 font-bold">Memory Tile Game</h1>
      <div className="grid grid-cols-4 gap-4">
        {tiles.map((icon, index) => (
          <Tile
            key={index}
            icon={icon}
            isFlipped={flipped.includes(index) || matched.includes(index)}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <div className="mt-4 text-xl">Moves: {moves}</div>
      {matched.length === tiles.length && (
        <div className="mt-4 text-2xl font-bold text-green-600">You Win!</div>
      )}
      <button onClick={resetGame} className="mt-4 p-2 bg-blue-600 text-white rounded">
        Restart Game
      </button>
    </div>
  );
};


export default Memory;
