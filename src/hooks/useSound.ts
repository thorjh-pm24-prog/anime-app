import { useCallback, useMemo, useRef } from 'react';

const createClickSoundUrl = () => {
  const sampleRate = 8000;
  const durationSeconds = 0.05;
  const samples = Math.floor(sampleRate * durationSeconds);
  const dataSize = samples;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  const writeString = (offset: number, value: string) => {
    for (let i = 0; i < value.length; i += 1) {
      view.setUint8(offset + i, value.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate, true);
  view.setUint16(32, 1, true);
  view.setUint16(34, 8, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  for (let i = 0; i < samples; i += 1) {
    const decay = Math.max(0, 1 - i / (samples * 0.6));
    const amplitude = i < 6 ? 80 : i < 18 ? 40 : 0;
    const sample = 128 + Math.round(amplitude * decay);
    view.setUint8(44 + i, sample);
  }

  const blob = new Blob([buffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
};

const createLoveSoundUrl = () => {
  const sampleRate = 16000;
  const durationSeconds = 0.4;
  const samples = Math.floor(sampleRate * durationSeconds);
  const dataSize = samples * 2;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  const writeString = (offset: number, value: string) => {
    for (let i = 0; i < value.length; i += 1) {
      view.setUint8(offset + i, value.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  // Generate ascending notes with harmonics (like a magical sparkle)
  for (let i = 0; i < samples; i += 1) {
    const t = i / sampleRate;
    const decay = Math.exp(-3 * t);
    const fadeOut = Math.max(0, 1 - t / durationSeconds);
    
    // Three ascending frequencies creating a pleasant chord
    const freq1 = 800 + (t * 600); // Rising tone
    const freq2 = 600 + (t * 400); // Harmony
    const freq3 = 1000 + (t * 800); // Sparkle
    
    const wave1 = Math.sin(2 * Math.PI * freq1 * t);
    const wave2 = Math.sin(2 * Math.PI * freq2 * t) * 0.5;
    const wave3 = Math.sin(2 * Math.PI * freq3 * t) * 0.3;
    
    const combined = (wave1 + wave2 + wave3) * decay * fadeOut;
    const sample = Math.round(combined * 8000);
    
    view.setInt16(44 + i * 2, sample, true);
  }

  const blob = new Blob([buffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
};

export const useSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const loveAudioRef = useRef<HTMLAudioElement | null>(null);
  const enabledRef = useRef(true);
  const clickUrl = useMemo(() => createClickSoundUrl(), []);
  const loveUrl = useMemo(() => createLoveSoundUrl(), []);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(clickUrl);
      audioRef.current.preload = 'auto';
    }
    return audioRef.current;
  }, [clickUrl]);

  const getLoveAudio = useCallback(() => {
    if (!loveAudioRef.current) {
      loveAudioRef.current = new Audio(loveUrl);
      loveAudioRef.current.preload = 'auto';
    }
    return loveAudioRef.current;
  }, [loveUrl]);

  const playClick = useCallback((volume: number = 0.15) => {
    if (!enabledRef.current) return;
    const audio = getAudio();
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play().catch(() => undefined);
  }, [getAudio]);

  const playLove = useCallback((volume: number = 0.3) => {
    if (!enabledRef.current) return;
    const audio = getLoveAudio();
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play().catch(() => undefined);
  }, [getLoveAudio]);

  const toggleSound = useCallback(() => {
    enabledRef.current = !enabledRef.current;
    return enabledRef.current;
  }, []);

  const isSoundEnabled = useCallback(() => enabledRef.current, []);

  return {
    playClick,
    playLove,
    toggleSound,
    isSoundEnabled,
  };
};
