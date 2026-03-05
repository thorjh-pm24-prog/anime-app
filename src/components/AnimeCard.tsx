import React, { useState } from 'react';
import { Anime } from '@/types';
import { useAnimeStore } from '@/stores/animeStore';
import { useSound } from '@/hooks/useSound';

interface AnimeCardProps {
  anime: Anime;
  onClick: (anime: Anime) => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
  anime,
  onClick,
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

  return (
    <div
      onClick={() => onClick(anime)}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col hover:-translate-y-1 group border border-gray-100"
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
          className={`w-full h-full object-cover transition-transform duration-500 ${
            imageLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
          }`}
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 text-xs font-medium rounded-lg shadow-md transition-all flex items-center gap-1 ${
            favorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          } hover:shadow-lg`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          title={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg className="w-4 h-4" fill={favorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="hidden sm:inline">{favorite ? 'Saved' : 'Save'}</span>
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

        <p className="text-xs text-gray-600 line-clamp-3 flex-1">
          {anime.synopsis || 'No synopsis available.'}
        </p>

        {/* Score Display */}
        {anime.score && (
          <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
            <span className="text-xs text-gray-600 font-medium">Score</span>
            <span className="text-sm font-bold text-gray-900">{anime.score.toFixed(1)}/10</span>
          </div>
        )}
      </div>
    </div>
  );
};
