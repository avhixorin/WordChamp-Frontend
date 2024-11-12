import React, { useEffect, useState } from 'react';
import { Volume, VolumeX } from 'lucide-react';
import useSound from '@/hooks/useSound';
import Rules from '../Game/Rules/Rules';
import CTAButton from '@/utils/CTAbutton/CTAbutton';
import HostingForm from './HostingForm/HostingForm';
import JoiningForm from './JoiningForm/JoiningForm';

const Page2: React.FC = () => {
  const [isHosting, setIsHosting] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  const [muted, setMuted] = useState(false);

  const { playBackgroundMusic, stopBackgroundMusic } = useSound();

  useEffect(() => {
    if (muted) stopBackgroundMusic();
    else playBackgroundMusic("./sounds/background1.mp3");
  }, [muted, playBackgroundMusic, stopBackgroundMusic]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-game-bg bg-center p-4 font-super">
      <button onClick={() => setMuted(!muted)} className="absolute top-10 left-10 z-10">
        {muted ? <VolumeX size={32} stroke="#fdfdfd" /> : <Volume size={32} stroke="#fdfdfd" />}
      </button>

      <Rules />

      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-lg flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-white">Mode Selection</h1>
        
          <div className="flex gap-4">
            {!isJoiningRoom && (
              <CTAButton type='button' disabled={false} label={isHosting ? 'Cancel Host' : 'Host'} colour="#2563eb" onClick={() => setIsHosting((prev) => !prev)} />
            )}
            {!isHosting && (
              <CTAButton type='button' disabled={false} label={isJoiningRoom ? 'Cancel Join' : 'Join Room'} colour="#16a34a" onClick={() => setIsJoiningRoom((prev) => !prev)} />
            )}
          </div>

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
