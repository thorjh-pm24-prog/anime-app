import React from 'react';
import { SortOption, SortOrder } from '@/types';
import { useSound } from '@/hooks/useSound';

interface SortBarProps {
  sortBy: SortOption;
  sortOrder: SortOrder;
  onSortChange: (sortBy: SortOption, sortOrder: SortOrder) => void;
}

export const SortBar: React.FC<SortBarProps> = ({ sortBy, sortOrder, onSortChange }) => {
  const { playClick } = useSound();

  const handleSortChange = (nextSortBy: SortOption, nextSortOrder: SortOrder) => {
    playClick();
    onSortChange(nextSortBy, nextSortOrder);
  };

  return (
    <div className="flex items-center gap-3 bg-indigo-100 rounded-lg border border-indigo-200 shadow-sm p-4 mb-6 hover:shadow-md transition-shadow">
      <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">Sort:</label>
      
      <select
        value={sortBy}
        onChange={(e) => handleSortChange(e.target.value as SortOption, sortOrder)}
        className="px-3 py-2.5 text-sm border border-indigo-300 rounded-lg bg-indigo-50 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-30 outline-none transition-all hover:border-indigo-400 font-medium"
      >
        <option value="title">Title</option>
        <option value="score">Score</option>
        <option value="popularity">Popularity</option>
        <option value="year">Year</option>
      </select>

      <button
        onClick={() =>
          handleSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')
        }
        className={`px-4 py-2.5 text-sm rounded-lg font-semibold transition-all shadow-sm ${
          sortOrder === 'asc'
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:-translate-y-0.5'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
      </button>
    </div>
  );
};
