import { useCallback, useRef } from 'react';

type SoundType = 'click' | 'favorite' | 'card' | 'success' | 'hover';

// Sound configurations using Web Audio API
const soundConfigs = {
  click: { frequency: 800, duration: 0.1, type: 'sine' as OscillatorType },
  favorite: { frequency: 1200, duration: 0.15, type: 'sine' as OscillatorType },
  card: { frequency: 600, duration: 0.12, type: 'triangle' as OscillatorType },
  success: { frequency: 1000, duration: 0.2, type: 'square' as OscillatorType },
  hover: { frequency: 500, duration: 0.05, type: 'sine' as OscillatorType },
};

// Anime-themed sound effects (kawaii beeps)
export const useSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(true);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback((soundType: SoundType = 'click', volume: number = 0.3) => {
    if (!enabledRef.current) return;

    try {
      const audioContext = getAudioContext();
      const config = soundConfigs[soundType];

      // Create oscillator for the main tone
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = config.type;
      oscillator.frequency.setValueAtTime(config.frequency, audioContext.currentTime);

      // Envelope for smooth sound
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + config.duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + config.duration);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, [getAudioContext]);

  // Play anime-style "kawaii" click sound
  const playKawaiClick = useCallback(() => {
    try {
      const audioContext = getAudioContext();
      const now = audioContext.currentTime;

      // First tone (high)
      const osc1 = audioContext.createOscillator();
      const gain1 = audioContext.createGain();
      osc1.connect(gain1);
      gain1.connect(audioContext.destination);
      osc1.frequency.setValueAtTime(1000, now);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc1.start(now);
      osc1.stop(now + 0.1);

      // Second tone (lower, delayed)
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc2.connect(gain2);
      gain2.connect(audioContext.destination);
      osc2.frequency.setValueAtTime(800, now + 0.05);
      gain2.gain.setValueAtTime(0.15, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc2.start(now + 0.05);
      osc2.stop(now + 0.15);
    } catch (error) {
      console.error('Error playing kawaii click:', error);
    }
  }, [getAudioContext]);

  // Play "pop" sound for favorites
  const playPopSound = useCallback(() => {
    try {
      const audioContext = getAudioContext();
      const now = audioContext.currentTime;

      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
      
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (error) {
      console.error('Error playing pop sound:', error);
    }
  }, [getAudioContext]);

  const toggleSound = useCallback(() => {
    enabledRef.current = !enabledRef.current;
    return enabledRef.current;
  }, []);

  const isSoundEnabled = useCallback(() => enabledRef.current, []);

  return {
    playSound,
    playKawaiClick,
    playPopSound,
    toggleSound,
    isSoundEnabled,
  };
};
