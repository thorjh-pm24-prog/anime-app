import React from 'react';
import { useAnimeStore } from '@/stores/animeStore';
import { ViewMode } from '@/types';
import { useSound } from '@/hooks/useSound';

export const ViewModeToggle: React.FC = () => {
  const { viewMode, setViewMode } = useAnimeStore();
  const { playClick } = useSound();

  const viewModes: { mode: ViewMode; icon: string; label: string; description: string }[] = [
    { mode: 'grid', icon: '▦', label: 'Grid', description: 'Grid view (3 columns)' },
    { mode: 'list', icon: '☰', label: 'List', description: 'List view with details' },
    { mode: 'compact', icon: '⊞', label: 'Compact', description: 'Compact view (5 columns)' },
  ];

  return (
    <div className="flex gap-1.5 bg-gradient-to-r from-indigo-100 to-purple-50 rounded-lg p-2 shadow-md border border-indigo-300 backdrop-blur-sm">
      {viewModes.map(({ mode, icon, label, description }) => (
        <button
          key={mode}
          onClick={() => {
            playClick();
            setViewMode(mode);
          }}
          className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-md font-bold transition-all duration-300 ${
            viewMode === mode
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform'
              : 'bg-white bg-opacity-60 text-gray-700 hover:text-indigo-700 hover:bg-white hover:shadow-md hover:-translate-y-0.5'
          }`}
          title={description}
          aria-label={`${label} view`}
          aria-pressed={viewMode === mode}
        >
          <span className="text-lg">{icon}</span>
          <span className="hidden sm:inline text-xs font-semibold">{label}</span>
        </button>
      ))}
    </div>
  );
};
