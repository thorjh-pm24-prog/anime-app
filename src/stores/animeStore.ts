import { create } from 'zustand';
import { AnimeStoreState, Favorite, ViewMode, DeviceMode } from '@/types';
import { Anime } from '@/types';

const FAVORITES_STORAGE_KEY = 'anime-favorites';
const VIEW_MODE_STORAGE_KEY = 'anime-view-mode';
const DEVICE_MODE_STORAGE_KEY = 'anime-device-mode';

export const useAnimeStore = create<AnimeStoreState>((set, get) => ({
  favorites: [],
  viewMode: (localStorage.getItem(VIEW_MODE_STORAGE_KEY) as ViewMode) || 'grid',
  deviceMode: (localStorage.getItem(DEVICE_MODE_STORAGE_KEY) as DeviceMode) || 'desktop',

  addFavorite: (anime: Anime) => {
    const newFavorite: Favorite = {
      id: anime.mal_id,
      title: anime.title,
      image: anime.images?.jpg?.large_image_url || '',
      addedAt: Date.now(),
    };

    set((state) => {
      const updated = [...state.favorites, newFavorite];
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      return { favorites: updated };
    });
  },

  removeFavorite: (id: number) => {
    set((state) => {
      const updated = state.favorites.filter((fav) => fav.id !== id);
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      return { favorites: updated };
    });
  },

  isFavorite: (id: number) => {
    return get().favorites.some((fav) => fav.id === id);
  },

  loadFavorites: () => {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (stored) {
      try {
        set({ favorites: JSON.parse(stored) });
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    }
  },

  setViewMode: (mode: ViewMode) => {
    localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode);
    set({ viewMode: mode });
  },

  setDeviceMode: (mode: DeviceMode) => {
    localStorage.setItem(DEVICE_MODE_STORAGE_KEY, mode);
    set({ deviceMode: mode });
  },
}));
