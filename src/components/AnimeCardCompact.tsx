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
  const { playClick } = useSound();
  const favorite = isFavorite(anime.mal_id);

  const imageUrl = imageError
    ? 'https://via.placeholder.com/300x400?text=No+Image'
    : anime.images?.jpg?.large_image_url;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    if (favorite) {
      removeFavorite(anime.mal_id);
    } else {
      addFavorite(anime);
    }
  };

  const handleCardClick = () => {
    onClick(anime);
  };

  // List View
  if (viewMode === 'list') {
    return (
      <div
        onClick={handleCardClick}
        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer p-5 flex gap-4 border border-gray-100 hover:-translate-y-0.5 group"
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
        <div className="flex-shrink-0 w-28 h-36 relative overflow-hidden rounded-lg border border-gray-200 shadow-md">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 animate-shimmer"></div>
          )}
          <img
            src={imageUrl}
            alt={anime.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              imageLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
            }`}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors" title={anime.title}>
            {anime.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-2">
            {anime.synopsis || 'No synopsis available.'}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-2 mt-3 text-xs">
            {anime.type && (
              <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-full font-semibold border border-blue-200">
                {anime.type}
              </span>
            )}
            {anime.episodes && (
              <span className="px-3 py-1 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-full font-semibold border border-purple-200">
                {anime.episodes} eps
              </span>
            )}
            {anime.year && (
              <span className="px-3 py-1 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 rounded-full font-semibold border border-orange-200">
                {anime.year}
              </span>
            )}
            {anime.score && (
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 rounded-full font-bold border border-yellow-200">
                {anime.score.toFixed(1)}/10
              </span>
            )}
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`flex-shrink-0 px-3 py-2 text-xs font-semibold rounded-lg transition-all shadow-sm flex items-center gap-1 ${
            favorite
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          title={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg className="w-4 h-4" fill={favorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{favorite ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    );
  }

  // Compact View
  if (viewMode === 'compact') {
    return (
      <div
        onClick={handleCardClick}
        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col hover:-translate-y-1 group border border-gray-100"
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
        <div className="relative aspect-[2/3] bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 animate-shimmer"></div>
          )}
          <img
            src={imageUrl}
            alt={anime.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              imageLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
            }`}
          />

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-1.5 text-xs font-semibold rounded-lg shadow-md transition-all flex items-center justify-center ${
              favorite
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            title={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className="w-4 h-4" fill={favorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Compact Content */}
        <div className="p-3 flex-1 flex flex-col">
          <h3
            className="text-xs font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors"
            title={anime.title}
          >
            {anime.title}
          </h3>

          {anime.score && (
            <div className="mt-2 text-xs font-bold text-gray-700 flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded w-fit border border-yellow-200">
              Score: {anime.score.toFixed(1)}
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
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col hover:-translate-y-1 group border border-gray-100"
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
      <div className="relative aspect-[2/3] bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-shimmer"></div>
        )}
        <img
          src={imageUrl}
          alt={anime.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            imageLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
          }`}
        />

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 text-xs font-semibold rounded-lg shadow-md transition-all flex items-center justify-center ${
            favorite
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          title={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg className="w-5 h-5" fill={favorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
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

        <p className="text-xs text-gray-600 line-clamp-3 mb-3 flex-1">
          {anime.synopsis || 'No synopsis available.'}
        </p>

        {/* Card Footer Info */}
        <div className="mt-auto pt-2 border-t border-gray-100 space-y-2">
          {anime.score && (
            <div className="flex items-center gap-1.5 text-sm font-bold text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full border border-yellow-200">
              Score: {anime.score.toFixed(1)}/10
            </div>
          )}
          {anime.type && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-semibold border border-blue-200">{anime.type}</span>
              {anime.episodes && <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full font-semibold border border-purple-200">{anime.episodes} eps</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
