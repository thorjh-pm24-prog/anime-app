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
  const { playClick } = useSound();

  useEffect(() => {
    setLocalFilters(initialFilters);
  }, [initialFilters]);

  const handleApply = () => {
    playClick();
    onFilterApply(localFilters);
  };

  const handleReset = () => {
    playClick();
    const emptyFilters: Partial<FilterOptions> = {
      type: undefined,
      status: undefined,
      year: undefined,
      rating: undefined,
    };
    setLocalFilters(emptyFilters);
    onFilterReset();
  };

  const hasActiveFilters = localFilters.type || localFilters.status || localFilters.year || localFilters.rating;
  const activeCount = Object.values(localFilters).filter(v => v !== undefined && v !== null).length;

  return (
    <div className="bg-indigo-100 rounded-lg border border-indigo-200 shadow-sm p-5 mb-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">
          Filters
        </h3>
        {hasActiveFilters && (
          <span className="text-xs font-semibold px-3 py-1.5 bg-indigo-200 text-indigo-700 rounded-full">
            {activeCount} active
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
          <select
            value={localFilters.type || ''}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, type: e.target.value || undefined })
            }
            className="w-full px-3 py-2.5 text-sm border border-indigo-300 rounded-lg bg-indigo-50 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-30 outline-none transition-all hover:border-indigo-400"
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
          <select
            value={localFilters.status || ''}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, status: e.target.value || undefined })
            }
            className="w-full px-3 py-2.5 text-sm border border-indigo-300 rounded-lg bg-indigo-50 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-30 outline-none transition-all hover:border-indigo-400"
          >
            <option value="">All Status</option>
            <option value="airing">Airing</option>
            <option value="complete">Complete</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
          <select
            value={localFilters.year || ''}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, year: e.target.value ? parseInt(e.target.value) : undefined })
            }
            className="w-full px-3 py-2.5 text-sm border border-indigo-300 rounded-lg bg-indigo-50 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-30 outline-none transition-all hover:border-indigo-400"
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
          <select
            value={localFilters.rating || ''}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, rating: e.target.value || undefined })
            }
            className="w-full px-3 py-2.5 text-sm border border-indigo-300 rounded-lg bg-indigo-50 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-30 outline-none transition-all hover:border-indigo-400"
          >
            <option value="">All Ratings</option>
            <option value="g">G (All Ages)</option>
            <option value="pg">PG (Parental Guidance)</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={handleApply}
          className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all shadow-sm hover:-translate-y-0.5 active:translate-y-0"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          disabled={!hasActiveFilters}
          className="flex-1 px-4 py-2.5 text-sm bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-150 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
