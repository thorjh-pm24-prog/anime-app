import React, { useState } from 'react';
import { Anime } from '@/types';
import { useAnimeStore } from '@/stores/animeStore';
import { useSound } from '@/hooks/useSound';

interface AnimeCardProps {
  anime: Anime;
  onClick: (anime: Anime) => void;
  viewMode?: 'grid' | 'list' | 'compact';
}

export const AnimeCardCompact: React.FC<AnimeCardProps> = ({
  anime,
  onClick,
  viewMode = 'grid',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useAnimeStore();
  const { playKawaiClick, playPopSound } = useSound();
  const favorite = isFavorite(anime.mal_id);

  const imageUrl = imageError
    ? 'https://via.placeholder.com/300x400?text=No+Image'
    : anime.images?.jpg?.large_image_url;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    if (favorite) {
      removeFavorite(anime.mal_id);
    } else {
      addFavorite(anime);
    }
  };

  const handleCardClick = () => {
    playKawaiClick();
    onClick(anime);
  };

  // List View
  if (viewMode === 'list') {
    return (
      <div
        onClick={handleCardClick}
        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer p-4 flex gap-4 animate-fade-in hover:translate-y-(-2px)"
        tabIndex={0}
        role="button"
        aria-label={`${anime.title} - ${anime.score || 'N/A'} rating`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleCardClick();
          }
        }}
      >
        {/* Image */}
        <div className="flex-shrink-0 w-24 h-32 relative group overflow-hidden rounded-md">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-200 animate-pulse"></div>
          )}
          <img
            src={imageUrl}
            alt={anime.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-scale duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors" title={anime.title}>
            {anime.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {anime.synopsis || 'No synopsis available.'}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-2 mt-3 text-xs text-gray-600">
            {anime.type && (
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">
                {anime.type}
              </span>
            )}
            {anime.episodes && (
              <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded">
                {anime.episodes} Episodes
              </span>
            )}
            {anime.year && (
              <span className="px-2 py-1 bg-green-50 text-green-700 rounded">
                {anime.year}
              </span>
            )}
            {anime.score && (
              <span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded font-semibold flex items-center gap-1">
                <span>⭐</span> {anime.score.toFixed(1)}
              </span>
            )}
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="flex-shrink-0 p-2 text-xl hover:scale-125 transition-transform active:scale-95"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          title={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
      </div>
    );
  }

  // Compact View
  if (viewMode === 'compact') {
    return (
      <div
        onClick={handleCardClick}
        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer h-full flex flex-col group animate-fade-in hover:-translate-y-1"
        tabIndex={0}
        role="button"
        aria-label={`${anime.title} - ${anime.score || 'N/A'} rating`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleCardClick();
          }
        }}
      >
        {/* Image Container - Smaller */}
        <div className="relative aspect-[2/3] bg-gray-200 overflow-hidden">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-200 animate-pulse"></div>
          )}
          <img
            src={imageUrl}
            alt={anime.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all transform hover:scale-110 active:scale-95"
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            title={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <span className="text-lg">{favorite ? '❤️' : '🤍'}</span>
          </button>
        </div>

        {/* Compact Content */}
        <div className="p-2 flex-1 flex flex-col">
          <h3
            className="text-xs font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors"
            title={anime.title}
          >
            {anime.title}
          </h3>

          {anime.score && (
            <div className="mt-1 text-xs font-semibold text-yellow-600 flex items-center gap-1">
              <span>⭐</span> {anime.score.toFixed(1)}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default Grid View
  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col group animate-fade-in hover:-translate-y-1"
      tabIndex={0}
      role="button"
      aria-label={`${anime.title} - ${anime.score || 'N/A'} rating`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] bg-gray-200 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-200 animate-pulse"></div>
        )}
        <img
          src={imageUrl}
          alt={anime.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all transform hover:scale-110 active:scale-95"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          title={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <span className="text-xl">{favorite ? '❤️' : '🤍'}</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3
          className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors"
          title={anime.title}
        >
          {anime.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
          {anime.synopsis || 'No synopsis available.'}
        </p>

        {/* Card Footer Info */}
        <div className="mt-auto space-y-2">
          {anime.score && (
            <div className="flex items-center gap-1 text-sm">
              <span className="text-yellow-500">⭐</span>
              <span className="font-semibold text-gray-900">{anime.score.toFixed(1)}</span>
              <span className="text-gray-600">({anime.scored_by?.toLocaleString() || 0})</span>
            </div>
          )}
          {anime.type && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <span>📺</span>
              <span>{anime.type}</span>
              {anime.episodes && <span className="text-gray-400">• {anime.episodes} eps</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
