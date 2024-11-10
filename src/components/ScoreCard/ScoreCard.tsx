import { RootState } from '@/Redux/store/store';
import { GameMode } from '@/types/types';
import React from 'react';
import { useSelector } from 'react-redux';

interface BadgeProps {
  avatar: string;
  username: string;
  score: number;
  roundedClass: string;
  avatarSizeClass: string; 
}

const ScoreCardBadge: React.FC<BadgeProps> = ({ avatar, username, score, roundedClass, avatarSizeClass }) => {
  return (
    <div
      className={`w-full flex items-center gap-4 py-3 px-4 bg-white/20 backdrop-blur-md ${roundedClass} shadow-lg transform transition-transform duration-200 hover:scale-[1.02] border-b border-white/30 text-zinc-700`}
    >
      <div className={`${avatarSizeClass}`}>
        <img src={avatar} alt={`${username}'s avatar`} className="rounded-full" />
      </div>
      <div className="flex-1">
        <p className="text-lg font-semibold">{username}</p>
      </div>
      <div className="text-xl font-bold">{score}</div>
    </div>
  );
};

const ScoreCard: React.FC = () => {
  const { scores } = useSelector((state: RootState) => state.scores);
  const { user } = useSelector((state: RootState) => state.user);
  const { score } = useSelector((state: RootState) => state.individualPlayerData);
  const { gameMode } = useSelector((state: RootState) => state.individualPlayerData);

  const avatars = [
    { src: "./images/avatar4.png" },
    { src: "./images/avatar3.png" },
    { src: "./images/avatar2.png" },
    { src: "./images/avatar1.png" },
  ];

  const getAvatar = (index: number) => avatars[index % avatars.length]?.src || '👤';

  const avatarSizeClass = gameMode === GameMode.MULTIPLAYER ? "w-10 h-10" : "w-12 h-12";

  return (
    <div className="flex flex-col items-center w-full">
      {gameMode === GameMode.MULTIPLAYER ? (
        scores.length > 0 ? (scores.map((scoreObj, index) => (
          <ScoreCardBadge
            key={scoreObj.user.id}
            avatar={getAvatar(index)} 
            username={scoreObj.user.username}
            score={scoreObj.score}
            roundedClass={
              index === 0
                ? 'rounded-t-lg'
                : index === scores.length - 1
                ? 'rounded-b-lg'
                : ''
            }
            avatarSizeClass={avatarSizeClass}
          />
        ))) : (
          <p className="text-zinc-600 text-lg italic opacity-70">No scores to display</p>
        )
        
      ) : (
        <ScoreCardBadge
          avatar={getAvatar(typeof user?.avatar === 'number' ? user.avatar : 0) || "👤"}
          username={user?.username || "You"}
          score={score || 0} 
          roundedClass="rounded-lg"
          avatarSizeClass={avatarSizeClass}
        />
      )}
    </div>
  );
};

export default ScoreCard;
