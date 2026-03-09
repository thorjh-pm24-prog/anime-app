import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAnimeStore } from '@/stores/animeStore';
import { ViewModeToggle } from './ViewModeToggle';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const location = useLocation();
  const { favorites } = useAnimeStore();
  const isListPage = location.pathname === '/anime/list';

  return (
    <header className="bg-gradient-to-r from-indigo-100 via-purple-50 to-indigo-100 border-b border-indigo-300 sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-opacity-95">
      <nav 
        className="max-w-7xl mx-auto px-4 py-3 sm:py-4"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex justify-between items-center gap-4 flex-wrap">
          {/* Logo Component */}
          <Logo />

          {/* Navigation & Right Section */}
          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            <Link
              to="/anime/list"
              className={`font-semibold transition-all duration-300 rounded-lg px-3 py-2.5 text-sm ${
                isListPage 
                  ? 'text-indigo-700 bg-white bg-opacity-70 shadow-md hover:shadow-lg hover:bg-opacity-100' 
                  : 'text-gray-700 hover:text-indigo-700 hover:bg-white hover:bg-opacity-40'
              } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
              aria-current={isListPage ? 'page' : undefined}
            >
              Browse
            </Link>
            
            {favorites.length > 0 && (
              <div 
                className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-gradient-to-r from-rose-100 to-pink-100 text-gray-800 rounded-lg font-semibold text-xs sm:text-sm whitespace-nowrap border border-rose-300 border-opacity-70 hover:border-rose-400 hover:shadow-md transition-all duration-300 animate-pulse-gentle"
                role="status"
                aria-label={`${favorites.length} favorite anime`}
              >
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-rose-500 animate-bounce-gentle" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                <span className="font-bold text-rose-600">{favorites.length}</span>
                <span className="hidden sm:inline text-gray-700">Saved</span>
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