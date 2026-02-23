import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search anime by name...',
  initialValue = '',
}) => {
  const [query, setQuery] = useState(initialValue);

  // Sync with initialValue when it changes (e.g., from URL params)
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form className="w-full" onSubmit={(e) => e.preventDefault()}>
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-3 text-lg border-2 border-blue-200 rounded-xl bg-white text-gray-900 outline-none focus:border-blue-500 focus:shadow-lg transition-all"
          aria-label="Search anime"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </form>
  );
};
