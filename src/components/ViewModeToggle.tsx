import React from 'react';
import { useAnimeStore } from '@/stores/animeStore';
import { ViewMode } from '@/types';

export const ViewModeToggle: React.FC = () => {
  const { viewMode, setViewMode } = useAnimeStore();

  const viewModes: { mode: ViewMode; icon: string; label: string; description: string }[] = [
    { mode: 'grid', icon: '⊞', label: 'Grid', description: 'Grid view (3 columns)' },
    { mode: 'list', icon: '≡', label: 'List', description: 'List view with details' },
    { mode: 'compact', icon: '▪', label: 'Compact', description: 'Compact view (5 columns)' },
  ];

  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
      {viewModes.map(({ mode, icon, label, description }) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          className={`
            flex items-center justify-center gap-1 px-3 py-2 rounded-md font-medium
            transition-all duration-200 transform hover:scale-105 active:scale-95
            ${
              viewMode === mode
                ? 'bg-white text-blue-600 shadow-md'
                : 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }
          `}
          title={description}
          aria-label={`${label} view`}
          aria-pressed={viewMode === mode}
        >
          <span className="text-lg">{icon}</span>
          <span className="hidden sm:inline text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
};
