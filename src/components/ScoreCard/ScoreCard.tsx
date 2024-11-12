import { RootState } from '@/Redux/store/store';
import { GameMode } from '@/types/types';
import React, { useMemo } from 'react';
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
  const { gameMode } = useSelector((state: RootState) => state.gameMode);
  const soloUser = useSelector((state: RootState) => state.soloPlayer);
  const { players } = useSelector((state: RootState) => state.multiPlayerData);

  const avatarSizeClass = useMemo(
    () => (gameMode === GameMode.MULTIPLAYER ? "w-10 h-10" : "w-12 h-12"),
    [gameMode]
  );

  return (
    <div className="flex flex-col items-center w-full font-super">
      {gameMode === GameMode.MULTIPLAYER ? (
        players.length > 0 ? (
          players.map((player, index) => (
            <ScoreCardBadge
              key={player.id}
              avatar={player.avatar}
              username={player.username}
              score={player.score}
              roundedClass={
                index === 0
                  ? 'rounded-t-lg'
                  : index === players.length - 1
                  ? 'rounded-b-lg'
                  : ''
              }
              avatarSizeClass={avatarSizeClass}
            />
          ))
        ) : (
          <p className="text-zinc-600 text-lg italic opacity-70">No scores to display</p>
        )
      ) : (
        <ScoreCardBadge
          avatar={soloUser?.avatar || ""}
          username={soloUser?.username || "You"}
          score={soloUser?.score || 0}
          roundedClass="rounded-lg"
          avatarSizeClass={avatarSizeClass}
        />
      )}
    </div>
  );
};

export default ScoreCard;
