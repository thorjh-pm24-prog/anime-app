import { useState, useEffect, useCallback, useRef } from 'react';
import { Anime, AnimeListResponse } from '@/types';
import { animeAPI } from '@/services/api';

export { useSound } from './useSound';

export const useDebounce = <T,>(value: T, delay: number = 700): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

interface UseAnimeSearchResult {
  animes: Anime[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  search: (query: string, page: number) => Promise<void>;
}

// Simple search result cache
const searchCache = new Map<string, { data: Anime[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useAnimeSearch = (): UseAnimeSearchResult => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pendingRequestRef = useRef<string | null>(null);
  const MAX_RETRIES = 3;

  const search = useCallback(
    async (query: string = '', page: number = 1) => {
      const requestKey = `${query}|${page}`;
      
      // Skip if this exact request is already pending
      if (pendingRequestRef.current === requestKey) {
        return;
      }
      
      // Check cache first
      const cacheKey = `${query}|${page}`;
      const cached = searchCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setAnimes(cached.data);
        setLoading(false);
        return;
      }
      
      pendingRequestRef.current = requestKey;
      setLoading(true);
      setError(null);

      const performSearch = async (retryCount: number = 0): Promise<void> => {
        try {
          const response = await animeAPI.searchAnime(query, page, 6);
          
          // Cache the results
          searchCache.set(cacheKey, {
            data: response.data,
            timestamp: Date.now(),
          });
          
          // Only update if this is still the pending request
          if (pendingRequestRef.current === requestKey) {
            setAnimes(response.data);
            setTotalPages(response.pagination.last_visible_page);
            setCurrentPage(response.pagination.current_page);
            setTotalItems(response.pagination.items.total);
            setError(null);
          }
        } catch (err) {
          // Ignore if request was superseded
          if (pendingRequestRef.current !== requestKey) {
            return;
          }
          
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch anime';
          const is429 = errorMessage.includes('429') || errorMessage.includes('Too Many Requests');

          if (is429 && retryCount < MAX_RETRIES) {
            console.log(`Rate limited. Retrying in 2s (${retryCount + 1}/${MAX_RETRIES})...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            await performSearch(retryCount + 1);
            return;
          }

          setError(errorMessage);
          setAnimes([]);
        } finally {
          if (pendingRequestRef.current === requestKey) {
            setLoading(false);
          }
        }
      };

      await performSearch();
      pendingRequestRef.current = null;
    },
    []
  );

  return { animes, loading, error, totalPages, currentPage, totalItems, search };
};

interface UseAnimeDetailResult {
  anime: Anime | null;
  loading: boolean;
  error: string | null;
  fetchDetail: (id: number) => Promise<void>;
}

export const useAnimeDetail = (): UseAnimeDetailResult => {
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const data = await animeAPI.getAnimeDetail(id);
      setAnime(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch anime details';
      setError(errorMessage);
      setAnime(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { anime, loading, error, fetchDetail };
};
