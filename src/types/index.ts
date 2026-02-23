// API Response Types
export interface AnimeGenre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface AnimeImage {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
  maximum_image_url: string;
}

export interface AnimeImages {
  jpg: AnimeImage;
  webp: AnimeImage;
  png?: AnimeImage;
}

export interface AnimeAired {
  from: string;
  to: string | null;
  prop: {
    from: { day: number; month: number; year: number };
    to: { day: number | null; month: number | null; year: number | null };
  };
  string: string;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: AnimeImages;
  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
  };
  approved: boolean;
  titles: Array<{ type: string; title: string }>;
  title: string;
  title_english?: string;
  title_japanese?: string;
  title_synonyms?: string[];
  type: string;
  source: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: AnimeAired;
  premiered?: string;
  broadcast?: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
  producers?: Array<{ mal_id: number; type: string; name: string; url: string }>;
  licensors?: Array<{ mal_id: number; type: string; name: string; url: string }>;
  studios?: Array<{ mal_id: number; type: string; name: string; url: string }>;
  genres: AnimeGenre[];
  explicit_genres?: AnimeGenre[];
  themes?: AnimeGenre[];
  demographics?: AnimeGenre[];
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  rating?: string | null;
  synopsis: string | null;
  background?: string;
  season?: string;
  year?: number;
}

export interface PaginationInfo {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface AnimeListResponse {
  data: Anime[];
  pagination: PaginationInfo;
}

export interface AnimeDetailResponse {
  data: Anime;
}

// Filter and Sort Types
export interface FilterOptions {
  type?: string;
  status?: string;
  rating?: string;
  year?: number;
}

export type SortOption = 'title' | 'score' | 'popularity' | 'year';
export type SortOrder = 'asc' | 'desc';
export type ViewMode = 'grid' | 'list' | 'compact';
export type DeviceMode = 'phone' | 'tablet' | 'desktop';

// State Management Types
export interface Favorite {
  id: number;
  title: string;
  image: string;
  addedAt: number;
}

export interface AnimeStoreState {
  favorites: Favorite[];
  addFavorite: (anime: Anime) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  loadFavorites: () => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
}

// Search State Types
export interface SearchFilters {
  query: string;
  type: string;
  status: string;
  rating: string;
  year: number | null;
  sortBy: SortOption;
  sortOrder: SortOrder;
}
