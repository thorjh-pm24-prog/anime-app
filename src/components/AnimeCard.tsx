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
  const { playKawaiClick, playPopSound } = useSound();
  const favorite = isFavorite(anime.mal_id);

  const imageUrl = imageError
    ? 'https://via.placeholder.com/300x400?text=No+Image'
    : anime.images?.jpg?.large_image_url;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound(); // Play cute pop sound for favorites
    if (favorite) {
      removeFavorite(anime.mal_id);
    } else {
      addFavorite(anime);
    }
  };

  const handleCardClick = () => {
    playKawaiClick(); // Play anime-style click sound
    onClick(anime);
  };

  return (
    <div
      onClick={() => onClick(anime)}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col group"
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
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all transform hover:scale-110"
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

        <p className="text-sm text-gray-600 line-clamp-3">
          {anime.synopsis || 'No synopsis available.'}
        </p>
      </div>
    </div>
  );
};
