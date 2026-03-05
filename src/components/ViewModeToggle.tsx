import React from 'react';
import { useAnimeStore } from '@/stores/animeStore';
import { ViewMode } from '@/types';

export const ViewModeToggle: React.FC = () => {
  const { viewMode, setViewMode } = useAnimeStore();

  const viewModes: { mode: ViewMode; icon: string; label: string; description: string }[] = [
    { mode: 'grid', icon: '▦', label: 'Grid', description: 'Grid view (3 columns)' },
    { mode: 'list', icon: '☰', label: 'List', description: 'List view with details' },
    { mode: 'compact', icon: '⊞', label: 'Compact', description: 'Compact view (5 columns)' },
  ];

  return (
    <div className="flex gap-1.5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg p-2 shadow-sm border border-gray-200">
      {viewModes.map(({ mode, icon, label, description }) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-md font-semibold transition-all ${
            viewMode === mode
              ? 'bg-white text-blue-600 border border-blue-300 shadow-md'
              : 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-white hover:bg-opacity-50'
          }`}
          title={description}
          aria-label={`${label} view`}
          aria-pressed={viewMode === mode}
        >
          <span className="text-lg">{icon}</span>
          <span className="hidden sm:inline text-xs">{label}</span>
        </button>
      ))}
    </div>
  );
};
