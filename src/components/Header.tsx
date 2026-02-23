import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAnimeStore } from '@/stores/animeStore';
import { ViewModeToggle } from './ViewModeToggle';
import { DevicePreview, type DeviceType } from './DevicePreview';

export const Header: React.FC = () => {
  const location = useLocation();
  const { favorites, deviceMode, setDeviceMode } = useAnimeStore();
  const isListPage = location.pathname === '/anime/list';

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <nav 
        className="max-w-7xl mx-auto px-4 py-4"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex justify-between items-center gap-4 flex-wrap">
          {/* Logo / Branding */}
          <Link 
            to="/anime/list" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded"
            aria-label="Anime Explorer - Home"
          >
            <span className="text-2xl sm:text-3xl" aria-hidden="true">🎬</span>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-gray-900">Anime Explorer</span>
              <span className="text-xs text-gray-500 hidden sm:block">Discover & Track</span>
            </div>
          </Link>

          {/* Navigation & Right Section */}
          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            <Link
              to="/anime/list"
              className={`font-medium transition-colors rounded px-3 py-2 text-sm sm:text-base ${
                isListPage 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500`}
              aria-current={isListPage ? 'page' : undefined}
            >
              <span className="hidden sm:inline">Browse</span>
              <span className="sm:hidden">🔍</span>
            </Link>
            
            {favorites.length > 0 && (
              <div 
                className="flex items-center gap-1 sm:gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg font-medium text-sm sm:text-base whitespace-nowrap"
                role="status"
                aria-label={`${favorites.length} favorite anime`}
              >
                <span aria-hidden="true">❤️</span>
                <span className="font-semibold">{favorites.length}</span>
                <span className="hidden sm:inline text-xs">Favorite{favorites.length !== 1 ? 's' : ''}</span>
              </div>
            )}
            
            {/* Device Mode Toggle */}
            <div className="flex items-center gap-2">
              <DevicePreview
                currentDevice={deviceMode as DeviceType}
                onDeviceChange={(device) => setDeviceMode(device as any)}
              />
            </div>
            
            {/* View Mode Toggle - Only show on list page */}
            {isListPage && (
              <div className="border-l pl-2 md:pl-4">
                <ViewModeToggle />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

