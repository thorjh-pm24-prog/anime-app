import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Anime, FilterOptions, SortOption, SortOrder } from '@/types';
import { useAnimeSearch, useDebounce } from '@/hooks';
import { useAnimeStore } from '@/stores/animeStore';
import { SearchBar } from '@/components/SearchBar';
import { FilterBar } from '@/components/FilterBar';
import { SortBar } from '@/components/SortBar';
import { AnimeGrid } from '@/components/AnimeGrid';
import { Pagination } from '@/components/Pagination';
import { Header } from '@/components/Header';
import { LoadingSpinner, ErrorMessage, EmptyState } from '@/components/common';
import { MainContent, SkipToMainContent, ResultAnnouncement } from '@/components/Accessibility';

export const AnimeListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { animes, loading, error, totalPages, currentPage, search } = useAnimeSearch();
  const { viewMode, deviceMode, setDeviceMode } = useAnimeStore();

  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<Partial<FilterOptions>>({
    type: searchParams.get('type') || undefined,
    status: searchParams.get('status') || undefined,
    year: searchParams.get('year') ? parseInt(searchParams.get('year')!) : null,
    rating: searchParams.get('rating') || undefined,
  });
  const [sortBy, setSortBy] = useState<SortOption>((searchParams.get('sortBy') as SortOption) || 'score');
  const [sortOrder, setSortOrder] = useState<SortOrder>((searchParams.get('sortOrder') as SortOrder) || 'desc');

  const debouncedSearch = useDebounce(searchInput, 400);
  const page = parseInt(searchParams.get('page') || '1');

  // Apply client-side filtering and sorting to results
  const filteredAndSortedAnimes = useMemo(() => {
    let filtered = [...animes];

    // Apply filters
    if (filters.type) {
      filtered = filtered.filter(anime => anime.type?.toLowerCase() === filters.type?.toLowerCase());
    }
    if (filters.status) {
      filtered = filtered.filter(anime => anime.status?.toLowerCase() === filters.status?.toLowerCase());
    }
    if (filters.year) {
      filtered = filtered.filter(anime => anime.year === filters.year);
    }
    if (filters.rating) {
      filtered = filtered.filter(anime => {
        const rating = anime.rating?.toLowerCase() || '';
        if (filters.rating === 'g') return !rating.includes('pg') && !rating.includes('r') && !rating.includes('18');
        if (filters.rating === 'pg') return rating.includes('pg') || !rating;
        return true;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal: any = 0;
      let bVal: any = 0;

      switch (sortBy) {
        case 'score':
          aVal = a.score || 0;
          bVal = b.score || 0;
          break;
        case 'popularity':
          aVal = a.popularity || 999999;
          bVal = b.popularity || 999999;
          break;
        case 'year':
          aVal = a.year || 0;
          bVal = b.year || 0;
          break;
        case 'title':
        default:
          aVal = a.title?.toLowerCase() || '';
          bVal = b.title?.toLowerCase() || '';
      }

      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [animes, filters, sortBy, sortOrder]);

  useEffect(() => {
    // Update URL params based on current state
    const newParams = new URLSearchParams();
    if (debouncedSearch.trim()) {
      newParams.set('q', debouncedSearch);
    }
    if (filters.type) newParams.set('type', filters.type);
    if (filters.status) newParams.set('status', filters.status);
    if (filters.year) newParams.set('year', filters.year.toString());
    if (filters.rating) newParams.set('rating', filters.rating);
    newParams.set('sortBy', sortBy);
    newParams.set('sortOrder', sortOrder);
    newParams.set('page', page.toString());

    setSearchParams(newParams, { replace: false });

    // Perform search with debounced query and current page
    search(debouncedSearch, page);
  }, [debouncedSearch, page, search, setSearchParams, filters, sortBy, sortOrder]);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    const params = new URLSearchParams();
    if (value.trim()) params.set('q', value);
    if (filters.type) params.set('type', filters.type);
    if (filters.status) params.set('status', filters.status);
    if (filters.year) params.set('year', filters.year.toString());
    if (filters.rating) params.set('rating', filters.rating);
    params.set('sortBy', sortBy);
    params.set('sortOrder', sortOrder);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleFilterApply = (newFilters: Partial<FilterOptions>) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (debouncedSearch.trim()) params.set('q', debouncedSearch);
    if (newFilters.type) params.set('type', newFilters.type);
    if (newFilters.status) params.set('status', newFilters.status);
    if (newFilters.year) params.set('year', newFilters.year.toString());
    if (newFilters.rating) params.set('rating', newFilters.rating);
    params.set('sortBy', sortBy);
    params.set('sortOrder', sortOrder);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleFilterReset = () => {
    const emptyFilters: Partial<FilterOptions> = {
      type: undefined,
      status: undefined,
      year: null,
      rating: undefined,
    };
    setFilters(emptyFilters);
    const params = new URLSearchParams();
    if (debouncedSearch.trim()) params.set('q', debouncedSearch);
    params.set('sortBy', sortBy);
    params.set('sortOrder', sortOrder);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleSortChange = (newSortBy: SortOption, newSortOrder: SortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    const params = new URLSearchParams();
    if (debouncedSearch.trim()) params.set('q', debouncedSearch);
    if (filters.type) params.set('type', filters.type);
    if (filters.status) params.set('status', filters.status);
    if (filters.year) params.set('year', filters.year.toString());
    if (filters.rating) params.set('rating', filters.rating);
    params.set('sortBy', newSortBy);
    params.set('sortOrder', newSortOrder);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('q', debouncedSearch);
    params.set('page', newPage.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnimeSelect = (anime: Anime) => {
    navigate(`/anime/detail/${anime.mal_id}`, { state: { anime } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <SkipToMainContent />
      <Header />

      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Anime Explorer
              </h1>
              <p className="text-gray-600">Discover, search, and track your favorite anime</p>
            </div>
            
            <SearchBar
              onSearch={handleSearch}
              initialValue={searchInput}
              placeholder="Search anime by name, genre, or studio..."
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <MainContent>
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Control Bar */}
          <div className="mb-8 bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col gap-4">
              {/* Filters and Sort */}
              <div className="space-y-4">
                <FilterBar 
                  onFilterApply={handleFilterApply} 
                  onFilterReset={handleFilterReset}
                  initialFilters={filters} 
                />
                <SortBar sortBy={sortBy} sortOrder={sortOrder} onSortChange={handleSortChange} />
              </div>
            </div>
          </div>

          {/* Result Count and Announcement */}
          <ResultAnnouncement count={filteredAndSortedAnimes.length} />

          {/* Loading State */}
          {loading && <LoadingSpinner message="Loading anime data..." />}

          {/* Error State */}
          {error && !loading && (
            <ErrorMessage message={error} onRetry={() => search(debouncedSearch, page)} />
          )}

          {/* No Results */}
          {!loading && !error && filteredAndSortedAnimes.length === 0 && (
            <EmptyState
              title={searchInput ? 'No anime found' : 'Start your search'}
              message={
                searchInput
                  ? 'Try different keywords or adjust your filters'
                  : 'Enter a search term to discover amazing anime'
              }
              icon={searchInput ? '😢' : '🔍'}
            />
          )}

          {/* Anime Grid */}
          {!loading && !error && filteredAndSortedAnimes.length > 0 && (
            <div className="space-y-6">
              {/* Results Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{filteredAndSortedAnimes.length}</span> result{filteredAndSortedAnimes.length !== 1 ? 's' : ''}
                  {Object.values(filters).some(v => v) && (
                    <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                      Filters applied
                    </span>
                  )}
                </div>
              </div>

              {/* Anime Grid */}
              <AnimeGrid
                animes={filteredAndSortedAnimes}
                viewMode={viewMode}
                onCardClick={handleAnimeSelect}
                isLoading={loading}
              />

              {/* Pagination */}
              {animes.length > 0 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </MainContent>

      {/* Footer */}
      <footer className="mt-auto border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">About</h3>
              <p className="text-sm text-gray-600">Anime Explorer helps you discover and track your favorite anime with ease.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Data Source</h3>
              <p className="text-sm text-gray-600">All anime data is provided by the Jikan API, powered by MyAnimeList.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>🎬 Grid, List & Compact views</li>
                <li>❤️ Favorites with local storage</li>
                <li>🔍 Advanced filtering & sorting</li>
                <li>♿ Full accessibility support</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-gray-500">
            <p>© 2026 Anime Explorer • Accessible Design • Built with React & TypeScript</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
