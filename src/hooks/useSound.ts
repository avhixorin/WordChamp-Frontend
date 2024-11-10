import { useRef, useCallback } from 'react';

const useSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playBackgroundMusic = useCallback((src: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(console.error);
    }
  }, []);

  const stopBackgroundMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }, []);

  const muteBackgroundMusic = useCallback(() => {
    if(audioRef.current){
      audioRef.current.muted = true
    }
  },[])

  const unMuteBackgroundMusic = useCallback(() => {
    if(audioRef.current){
      audioRef.current.muted = false
    }
  },[])

  const playEnterSound = useCallback(() => {
    const audioContext = new (window.AudioContext || window.AudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.5);

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.connect(gainNode).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  }, []);

  return { playBackgroundMusic, stopBackgroundMusic, playEnterSound, muteBackgroundMusic, unMuteBackgroundMusic };
};

export default useSound;
