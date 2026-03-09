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
import { DevicePreview, type DeviceType } from '@/components/DevicePreview';
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
    year: searchParams.get('year') ? parseInt(searchParams.get('year')!) : undefined,
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
      year: undefined,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-gray-50 flex flex-col">
      <SkipToMainContent />
      <Header />

      {/* Device View Selector - Fixed Top Right Corner */}
      <div className="fixed top-4 right-4 sm:top-5 sm:right-6 z-50 bg-indigo-100 rounded-lg border border-indigo-200 shadow-lg p-2.5 sm:p-3">
        <DevicePreview
          currentDevice={deviceMode as DeviceType}
          onDeviceChange={(device) => setDeviceMode(device as any)}
        />
      </div>

      <header className="bg-gradient-to-r from-indigo-100 via-purple-50 to-indigo-100 border-b border-indigo-300 sticky top-16 z-30 shadow-lg backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col gap-5 animate-fade-in">
            <div>
              <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-2 tracking-tight">
                Anime Discovery
              </h1>
              <p className="text-sm md:text-base text-gray-600 font-medium">Discover and save your favorite anime titles</p>
            </div>
            
            <SearchBar
              onSearch={handleSearch}
              initialValue={searchInput}
              placeholder="Search anime by title, genre, or character..."
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <MainContent>
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Control Bar */}
          <div className="mb-8 space-y-4">
            <FilterBar 
              onFilterApply={handleFilterApply} 
              onFilterReset={handleFilterReset}
              initialFilters={filters} 
            />
            <SortBar sortBy={sortBy} sortOrder={sortOrder} onSortChange={handleSortChange} />
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
            />
          )}

          {/* Anime Grid */}
          {!loading && !error && filteredAndSortedAnimes.length > 0 && (
            <div className="space-y-8">
              {/* Results Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-indigo-100 rounded-lg p-4 shadow-sm border border-indigo-200">
                <div className="text-sm text-gray-700 font-medium">
                  Showing <span className="font-bold text-blue-600">{filteredAndSortedAnimes.length}</span> result{filteredAndSortedAnimes.length !== 1 ? 's' : ''}
                  {Object.values(filters).some(v => v) && (
                    <span className="ml-3 px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 text-xs rounded-full font-semibold border border-blue-200">
                      Filters active
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
                <div className="mt-8 pb-8">
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
    </div>
  );
};
