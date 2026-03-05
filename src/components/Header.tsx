import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAnimeStore } from '@/stores/animeStore';
import { ViewModeToggle } from './ViewModeToggle';

export const Header: React.FC = () => {
  const location = useLocation();
  const { favorites } = useAnimeStore();
  const isListPage = location.pathname === '/anime/list';

  return (
    <header className="bg-white border-b border-gray-200 border-opacity-50 sticky top-0 z-50 shadow-sm">
      <nav 
        className="max-w-7xl mx-auto px-4 py-4"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex justify-between items-center gap-4 flex-wrap">
          {/* Logo / Branding */}
          <Link 
            to="/anime/list" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded group"
            aria-label="Anime Search - Home"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-blue-800 transition-colors">
              Anime Search
            </span>
          </Link>

          {/* Navigation & Right Section */}
          <div className="flex items-center gap-3 md:gap-6 flex-wrap">
            <Link
              to="/anime/list"
              className={`font-medium transition-all duration-200 rounded px-3 py-2 text-sm ${
                isListPage 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500`}
              aria-current={isListPage ? 'page' : undefined}
            >
              Browse
            </Link>
            
            {favorites.length > 0 && (
              <div 
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 text-gray-700 rounded-lg font-medium text-sm whitespace-nowrap border border-red-200 border-opacity-50 hover:border-red-300 hover:shadow-md transition-all"
                role="status"
                aria-label={`${favorites.length} favorite anime`}
              >
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                <span className="font-bold text-red-600">{favorites.length}</span>
                <span className="hidden sm:inline text-gray-600">Saved</span>
              </div>
            )}
            
            {/* View Mode Toggle - Only show on list page */}
            {isListPage && <ViewModeToggle />}
          </div>
        </div>
      </nav>
    </header>
  );
};

