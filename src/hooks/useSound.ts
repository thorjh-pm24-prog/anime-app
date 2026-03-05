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

export const useSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const enabledRef = useRef(true);
  const clickUrl = useMemo(() => createClickSoundUrl(), []);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(clickUrl);
      audioRef.current.preload = 'auto';
    }
    return audioRef.current;
  }, [clickUrl]);

  const playClick = useCallback((volume: number = 0.15) => {
    if (!enabledRef.current) return;
    const audio = getAudio();
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play().catch(() => undefined);
  }, [getAudio]);

  const toggleSound = useCallback(() => {
    enabledRef.current = !enabledRef.current;
    return enabledRef.current;
  }, []);

  const isSoundEnabled = useCallback(() => enabledRef.current, []);

  return {
    playClick,
    toggleSound,
    isSoundEnabled,
  };
};
