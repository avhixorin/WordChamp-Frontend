import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Redux/store/store';
import { GameMode } from '@/types/types';
import { useNavigate } from 'react-router-dom';
import { Volume, VolumeX } from 'lucide-react';
import useSound from '@/hooks/useSound';
import Rules from '../Game/Rules/Rules';
import CTAButton from '@/utils/CTAbutton/CTAbutton';
import HostingForm from './HostingForm/HostingForm';
import JoiningForm from './JoiningForm/JoiningForm';
import { setGameMode } from '@/Redux/features/individualPlayerDataSlice';

const Page2: React.FC = () => {
  const dispatch = useDispatch();
  const [isHosting, setIsHosting] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  const [localMode, setLocalMode] = useState<GameMode | null>(null);
  const [muted, setMuted] = useState(false);

  const { playBackgroundMusic, stopBackgroundMusic } = useSound();
  const navigate = useNavigate();
  const gameMode = useSelector((state: RootState) => state.individualPlayerData.gameMode);

  useEffect(() => {
    if (muted) stopBackgroundMusic();
    else playBackgroundMusic("./sounds/background1.mp3");
  }, [muted, playBackgroundMusic, stopBackgroundMusic]);


  const handleGameModeChange = (mode: GameMode) => {
    setLocalMode(mode);
    dispatch(setGameMode(mode));
    if (mode === GameMode.SOLO) {
      navigate('/selection');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-game-bg bg-center p-4">
      <button onClick={() => setMuted(!muted)} className="absolute top-10 left-10 z-10">
        {muted ? <VolumeX size={32} stroke="#fdfdfd" /> : <Volume size={32} stroke="#fdfdfd" />}
      </button>

      <Rules />

      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-lg flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-white">Mode Selection</h1>
        {!localMode && (
          <div className="flex gap-4">
            <CTAButton type='button' disabled={false} label="Solo" colour="#2563eb" onClick={() => handleGameModeChange(GameMode.SOLO)} />
            <CTAButton type='button' disabled={false} label="Multiplayer" colour="#16a34a" onClick={() => handleGameModeChange(GameMode.MULTIPLAYER)} />
          </div>
        )}

        {localMode && gameMode === GameMode.MULTIPLAYER && (
          <div className="flex gap-4">
            {!isJoiningRoom && (
              <CTAButton type='button' disabled={false} label={isHosting ? 'Cancel Host' : 'Host'} colour="#2563eb" onClick={() => setIsHosting((prev) => !prev)} />
            )}
            {!isHosting && (
              <CTAButton type='button' disabled={false} label={isJoiningRoom ? 'Cancel Join' : 'Join Room'} colour="#16a34a" onClick={() => setIsJoiningRoom((prev) => !prev)} />
            )}
          </div>
        )}

        {isHosting && (
          <div className="w-full px-4 py-4 bg-white/20 backdrop-blur-md rounded-lg shadow-lg flex flex-col gap-4">
            <HostingForm />
          </div>
        )}

        {isJoiningRoom && !isHosting && (
          <div className="w-full px-4 py-4 bg-white/20 backdrop-blur-md rounded-lg shadow-lg flex flex-col gap-4">
            <JoiningForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page2;
