import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link 
      to="/anime/list" 
      className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded-lg p-1 group"
      aria-label="Anime Search - Home"
    >
      {/* Logo Image */}
      <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border-2 border-indigo-300 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:border-indigo-400">
        <img 
          src="/images/AnimeSearchLogo.png" 
          alt="Anime Search Logo" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Logo Text */}
      <div className="flex flex-col hidden sm:flex">
        <span className="text-lg font-black text-indigo-900 group-hover:text-indigo-600 transition-colors duration-300 tracking-tight">
          ANIME
        </span>
        <span className="text-xs font-bold text-indigo-500 group-hover:text-indigo-600 transition-colors duration-300 -mt-1">
          SEARCH
        </span>
      </div>
    </Link>
  );
};
