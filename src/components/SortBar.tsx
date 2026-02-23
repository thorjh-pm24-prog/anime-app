import React from 'react';
import { SortOption, SortOrder } from '@/types';

interface SortBarProps {
  sortBy: SortOption;
  sortOrder: SortOrder;
  onSortChange: (sortBy: SortOption, sortOrder: SortOrder) => void;
}

export const SortBar: React.FC<SortBarProps> = ({ sortBy, sortOrder, onSortChange }) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4 mb-6">
      <label className="text-sm font-medium text-gray-700">Sort by:</label>
      
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption, sortOrder)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="title">Title</option>
        <option value="score">Score</option>
        <option value="popularity">Popularity</option>
        <option value="year">Year</option>
      </select>

      <button
        onClick={() =>
          onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')
        }
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          sortOrder === 'asc'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
      </button>
    </div>
  );
};
