import { RootState } from '@/Redux/store/store';
import { RoomAction } from '@/types/types';
import CTAButton from '@/utils/CTAbutton/CTAbutton';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const WaitingRoom: React.FC = () => {
  const [disabledStatus, setDisabledStatus] = useState(true);
  const [isEntering, setIsEntering] = useState(false);
  const { maxRoomPlayers, room, players } = useSelector((state: RootState) => state.multiPlayerData) || {};
  const { roomAction } = useSelector((state: RootState) => state.multiPlayerUser) || {};

  useEffect(() => {
    setDisabledStatus(maxRoomPlayers !== players.length);
  }, [players, maxRoomPlayers]);

  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-game-bg bg-center bg-no-repeat bg-cover flex justify-center items-center font-super overflow-hidden">
      <div className="bg-white/30 backdrop-blur-lg rounded-xl p-8 shadow-lg space-y-6 w-full max-w-lg animate-fadeIn">
        <h1 className="text-4xl text-center font-semibold text-zinc-700">Waiting Room</h1>
        <p className="text-center text-lg text-zinc-700">
          Thank you for your patience! Please wait while all players join the room. The game will begin once everyone is here and the host selects the game difficulty.
        </p>
        <p className="text-center text-xl font-bold text-zinc-700">Room ID: <span className="text-indigo-600">{room?.roomId}</span></p>
        <p className="text-center text-xl font-bold text-zinc-700">Room Password: <span className="text-indigo-600">{room?.roomPassword}</span></p>
        <p className="text-center text-xl font-bold text-zinc-700">Room Status: <span className="text-indigo-600">{roomAction}</span></p>
        <p className="text-center text-xl font-bold text-zinc-700">
          Current number of participants: <span className="text-indigo-600">{players.length} / {maxRoomPlayers}</span>
        </p>

        {/* Section to display currently joined players */}
        <div className="bg-white/20 backdrop-blur rounded-lg p-4 shadow-md">
          <h2 className="text-center text-lg font-semibold text-zinc-700 mb-2">Currently Joined Players</h2>
          <ul className="flex flex-col gap-2">
            {players.map((player, index) => (
              <li key={index} className="text-center text-lg text-indigo-600">
                {player.username}
              </li>
            ))}
          </ul>
        </div>

        {roomAction === RoomAction.HOSTING && (
          <>
          
          <div className='w-full flex justify-center'>
            <CTAButton
              colour="#60a5fa"
              disabled={disabledStatus}
              type="button"
              label="Select Difficulty"
              onClick={() => {
                setIsEntering(true);
                setTimeout(() => {
                  navigate("/selection");
                }, 1500);
                }}
            />
          </div>

<AnimatePresence>
{isEntering && (
  <motion.div
    className="absolute inset-0 z-20 flex items-center justify-center bg-black"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.5 }}
  >
    <motion.div
      className="w-0 h-0 bg-gradient-to-r from-[#E5E6AF] via-[#C3E1C1] to-[#B1DFCB] rounded-full"
      animate={{
        width: "200vmax",
        height: "200vmax",
        transition: { duration: 1.5, ease: "easeInOut" },
      }}
    />
  </motion.div>
)}
</AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default WaitingRoom;
