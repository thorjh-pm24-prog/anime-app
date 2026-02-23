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
      <div
        className={`grid gap-4 ${
          viewMode === 'compact'
            ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6'
            : viewMode === 'list'
            ? 'grid-cols-1'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`bg-gray-200 rounded-lg animate-pulse ${
              viewMode === 'list'
                ? 'h-32'
                : viewMode === 'compact'
                ? 'h-40'
                : 'h-80'
            }`}
          ></div>
        ))}
      </div>
    );
  }

  if (animes.length === 0) {
    return (
      <div className="col-span-full py-16 text-center flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No anime found</h2>
        <p className="text-gray-600">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-4 transition-all duration-300 ${
        viewMode === 'compact'
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
          : viewMode === 'list'
          ? 'grid-cols-1'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}
    >
      {animes.map((anime, index) => (
        <div
          key={`${anime.mal_id}-${index}`}
          className="animate-fade-in"
          style={{
            animationDelay: `${Math.min(index * 30, 300)}ms`,
          }}
        >
          <AnimeCardCompact
            anime={anime}
            onClick={onCardClick}
            viewMode={viewMode}
          />
        </div>
      ))}
    </div>
  );
};
