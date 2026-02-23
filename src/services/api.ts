import axios, { AxiosError } from 'axios';
import { Anime, AnimeListResponse, AnimeDetailResponse } from '@/types';

const API_BASE = 'https://api.jikan.moe/v4';
const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Simple error passthrough - don't retry here (handle in hook)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(error)
);

/**
 * Filter anime to exclude sensitive/inappropriate content
 */
const filterAppropriateContent = (animes: Anime[]): Anime[] => {
  return animes.filter((anime) => {
    // Filter out sensitive content by title
    const titleLower = anime.title?.toLowerCase() || '';
    const excludePatterns = ['kid version', 'child version', 'baby'];
    
    if (excludePatterns.some(pattern => titleLower.includes(pattern))) {
      return false;
    }
    
    // Exclude explicit content
    const rating = anime.rating?.toLowerCase() || '';
    if (rating.includes('hentai') || rating.includes('explicit') || rating.includes('rx')) {
      return false;
    }
    
    // Exclude kids-only type
    if (anime.type?.toLowerCase() === 'kids') {
      return false;
    }
    
    return true;
  });
};

export const animeAPI = {
  async searchAnime(
    query: string = '',
    page: number = 1,
    limit: number = 6
  ): Promise<AnimeListResponse> {
    try {
      const params: any = {
        page,
        limit,
      };

      if (query.trim()) {
        params.q = query;
      } else {
        params.order_by = 'popularity';
        params.sort = 'asc';
      }

      const response = await axiosInstance.get<AnimeListResponse>('/anime', { params });
      
      // Filter inappropriate content before returning
      const filteredData = filterAppropriateContent(response.data.data);
      
      return {
        ...response.data,
        data: filteredData,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || error.message || 'Failed to fetch anime'
        );
      }
      throw error;
    }
  },

  async getAnimeDetail(id: number): Promise<Anime> {
    try {
      const response = await axiosInstance.get<AnimeDetailResponse>(`/anime/${id}`);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || error.message || 'Failed to fetch anime details'
        );
      }
      throw error;
    }
  },

  // no-op for now
};
