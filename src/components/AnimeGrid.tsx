import React from 'react';
import { Anime } from '@/types';
import { ViewMode } from '@/types';
import { AnimeCardCompact } from './AnimeCardCompact';

interface AnimeGridProps {
  animes: Anime[];
  viewMode: ViewMode;
  onCardClick: (anime: Anime) => void;
  isLoading?: boolean;
}

export const AnimeGrid: React.FC<AnimeGridProps> = ({
  animes,
  viewMode,
  onCardClick,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className={`grid gap-4 ${
          viewMode === 'compact'
            ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6'
            : viewMode === 'list'
            ? 'grid-cols-1'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`bg-gray-200 rounded-lg animate-pulse ${
              viewMode === 'list'
                ? 'h-32'
                : viewMode === 'compact'
                ? 'h-40'
                : 'h-80'
            }`}></div>
        ))}
      </div>
    );
  }

  if (animes.length === 0) {
    return (
      <div className="col-span-full py-16 text-center flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No results found</h2>
        <p className="text-sm text-gray-600">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${
        viewMode === 'compact'
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
          : viewMode === 'list'
          ? 'grid-cols-1'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
      {animes.map((anime, index) => (
        <AnimeCardCompact
          key={`${anime.mal_id}-${index}`}
          anime={anime}
          onClick={onCardClick}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};
