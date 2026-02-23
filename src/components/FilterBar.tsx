import React, { useState, useEffect } from 'react';
import { FilterOptions } from '@/types';
import { useSound } from '@/hooks/useSound';

interface FilterBarProps {
  onFilterApply: (filters: Partial<FilterOptions>) => void;
  onFilterReset: () => void;
  initialFilters: Partial<FilterOptions>;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterApply, onFilterReset, initialFilters }) => {
  const [localFilters, setLocalFilters] = useState<Partial<FilterOptions>>(initialFilters);
  const { playSound } = useSound();

  useEffect(() => {
    setLocalFilters(initialFilters);
  }, [initialFilters]);

  const handleApply = () => {
    playSound('success', 0.2); // Play success sound when applying filters
    onFilterApply(localFilters);
  };

  const handleReset = () => {
    playSound('click', 0.15); // Play click sound when resetting
    const emptyFilters: Partial<FilterOptions> = {
      type: undefined,
      status: undefined,
      year: null,
      rating: undefined,
    };
    setLocalFilters(emptyFilters);
    onFilterReset();
  };

  const hasActiveFilters = localFilters.type || localFilters.status || localFilters.year || localFilters.rating;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <span className="text-sm text-blue-600 font-medium">
            {Object.values(localFilters).filter(v => v !== undefined && v !== null).length} active
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            value={localFilters.type || ''}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, type: e.target.value || undefined })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="TV">TV</option>
            <option value="Movie">Movie</option>
            <option value="OVA">OVA</option>
            <option value="Special">Special</option>
            <option value="ONA">ONA</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={localFilters.status || ''}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, status: e.target.value || undefined })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="airing">Airing</option>
            <option value="complete">Complete</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
          <select
            value={localFilters.year || ''}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, year: e.target.value ? parseInt(e.target.value) : null })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Years</option>
            {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <select
            value={localFilters.rating || ''}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, rating: e.target.value || undefined })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Ratings</option>
            <option value="g">G (All Ages)</option>
            <option value="pg">PG (Parental Guidance)</option>
          </select>
          <p className="mt-2 text-xs text-gray-500">Kids-safe content only</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={handleApply}
          className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          disabled={!hasActiveFilters}
          className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};
