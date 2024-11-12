import { RootState } from '@/Redux/store/store';
import { Difficulty, GameMode, MultiplayerUser, Room, SoloPlayer } from '@/types/types';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Profile: React.FC = () => {
  const [difficultyLevel, setDifficultyLevel] = useState<Difficulty>(Difficulty.EASY);
  const [players, setPlayers] = useState<MultiplayerUser[]>([]);
  const [user, setUser] = useState<SoloPlayer | null>(null);
  const [maxGamePlayers, setMaxGamePlayers] = useState<number>(1);
  const [roomData, setRoomData] = useState<Room | null>(null);

  const { difficulty: SoloDifficulty } = useSelector((state: RootState) => state.soloPlayer);
  const { roomDifficulty: MultiplayerDifficulty, maxRoomPlayers, room, players: MultiplayerPlayers } = useSelector((state: RootState) => state.multiPlayerData);
  const { gameMode } = useSelector((state: RootState) => state.gameMode);
  const soloPlayer = useSelector((state: RootState) => state.soloPlayer);

  useEffect(() => {
    if (gameMode === GameMode.MULTIPLAYER) {
      setPlayers(MultiplayerPlayers);
      setDifficultyLevel(MultiplayerDifficulty);
      setMaxGamePlayers(maxRoomPlayers);
      setRoomData(room);
    } else {
      setUser(soloPlayer);
      setDifficultyLevel(SoloDifficulty);
      setMaxGamePlayers(1);
      setRoomData(null);
    }
  }, [gameMode, MultiplayerDifficulty, maxRoomPlayers, room, SoloDifficulty, soloPlayer, MultiplayerPlayers]);

  // Profile card classes based on game mode
  const profileCardClass = gameMode === GameMode.MULTIPLAYER ? 'max-h-60' : 'max-h-48';
  const profileContentClass = gameMode === GameMode.MULTIPLAYER ? '' : 'text-center';

  return (
    <div className={`w-full ${profileCardClass} py-4 px-4 flex flex-col gap-4 items-center bg-white/10 backdrop-blur-md rounded-lg shadow-lg font-super`}>
      <h2 className="text-2xl font-bold text-teal-600">Game Room Details</h2>

      <div className={`flex flex-col gap-4 w-full max-w-md ${profileContentClass}`}>
        {/* Difficulty Level */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-800">Difficulty Level:</span>
          <span className="text-lg font-semibold text-teal-900">{difficultyLevel}</span>
        </div>

        {gameMode === GameMode.MULTIPLAYER ? (
          <>
            {/* Multiplayer Game Info */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">Number of Players:</span>
              <span className="text-lg font-semibold text-teal-900">{maxGamePlayers}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">Room ID:</span>
              <span className="text-lg font-semibold text-teal-900">{roomData?.roomId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">Room Password:</span>
              <span className="text-lg font-semibold text-teal-900">{roomData?.roomPassword}</span>
            </div>

            {/* Display Players */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">Players:</span>
              {players.length > 0 ? (
                <ul className="flex justify-evenly gap-1">
                  {players.map((player) => (
                    <li key={player.id} className="text-lg text-teal-900">
                      {player.username} - {player.roomAction}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-lg text-teal-900">No players available</span>
              )}
            </div>
          </>
        ) : (
          // Display Host Info in Solo Mode
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-800">Host:</span>
            <span className="text-lg font-semibold text-teal-900">{user?.username}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
