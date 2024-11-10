import { RootState } from '@/Redux/store/store';
import { GameMode } from '@/types/types';
import React from 'react';
import { useSelector } from 'react-redux';

const Profile: React.FC = () => {
  const { difficulty, maxGameParticipants: numPlayers } = useSelector(
    (state: RootState) => state.sharedGameData
  );
  const { roomId, password } = useSelector((state: RootState) => state.room);
  const { gameMode } = useSelector((state: RootState) => state.individualPlayerData);

  // Conditionally adjust profile card size based on game mode
  const profileCardClass = gameMode === GameMode.MULTIPLAYER ? 'max-h-60' : 'max-h-48';
  const profileContentClass = gameMode === GameMode.MULTIPLAYER ? '' : 'text-center';

  return (
    <div
      className={`w-full ${profileCardClass} py-4 px-4 flex flex-col gap-4 items-center bg-white/10 backdrop-blur-md rounded-lg shadow-lg`}
    >
      <h2 className="text-2xl font-bold text-teal-600">Game Room Details</h2>

      <div className={`flex flex-col gap-4 w-full max-w-md ${profileContentClass}`}>
        {/* Difficulty Level */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-800">Difficulty Level:</span>
          <span className="text-lg font-semibold text-teal-900">{difficulty}</span>
        </div>

        {gameMode === GameMode.MULTIPLAYER && (
          <>
            {/* Number of Players */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">Number of Players:</span>
              <span className="text-lg font-semibold text-teal-900">{numPlayers}</span>
            </div>

            {/* Room ID */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">Room ID:</span>
              <span className="text-lg font-semibold text-teal-900">{roomId}</span>
            </div>

            {/* Room Password */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">Room Password:</span>
              <span className="text-lg font-semibold text-teal-900">{password}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
