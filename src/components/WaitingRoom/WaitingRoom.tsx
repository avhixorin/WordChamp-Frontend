import { RootState } from '@/Redux/store/store';
import { RoomAction } from '@/types/types';
import CTAButton from '@/utils/CTAbutton/CTAbutton';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const WaitingRoom: React.FC = () => {
  const [disabledStatus, setDisabledStatus] = useState(true);
  const { maxRoomPlayers } = useSelector((state: RootState) => state.multiPlayerData) || { participants: 0 };
  const { room, players } = useSelector((state: RootState) => state.multiPlayerData) || {};
  const { roomAction } = useSelector((state: RootState) => state.multiPlayerUser) || {};
  
  useEffect(() => {
    if (maxRoomPlayers === players.length) {
      setDisabledStatus(false);
    } else {
      setDisabledStatus(true);
    }
  }, [players, maxRoomPlayers]);

  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-game-bg bg-center bg-no-repeat bg-cover flex justify-center items-center">
      <div className="bg-white/30 backdrop-blur-lg rounded-xl p-8 shadow-lg space-y-6 w-full max-w-lg animate-fadeIn">
        <h1 className="text-4xl text-center font-semibold text-zinc-700">Waiting Room</h1>
        <p className="text-center text-lg text-zinc-700">Please wait for other players to join</p>
        <p className="text-center text-xl font-bold text-zinc-700">Room ID: <span className="text-indigo-600">{room?.roomId}</span></p>
        <p className="text-center text-xl font-bold text-zinc-700">Room Password: <span className="text-indigo-600">{room?.roomPassword}</span></p>
        <p className="text-center text-xl font-bold text-zinc-700">Room Status: <span className="text-indigo-600">{roomAction}</span></p>
        <p className="text-center text-xl font-bold text-zinc-700">
          Current number of participants: <span className="text-indigo-600">{players.length}</span>
        </p>
        {
          roomAction === RoomAction.HOSTING && (
            <div className='w-full flex justify-center'>
          <CTAButton
            colour="#60a5fa"
            disabled={disabledStatus}
            type="button"
            label="Select Difficulty"
            onClick={() => navigate('/selection')}
          />
        </div>
          )
        }
        
      </div>
    </div>
  );
};

export default WaitingRoom;
