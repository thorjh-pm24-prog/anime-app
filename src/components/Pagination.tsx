import React, { useMemo } from 'react';
import { useSound } from '@/hooks/useSound';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { playClick } = useSound();
  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    playClick();
    onPageChange(page);
  };

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="text-gray-700 text-sm font-semibold">
        Page <span className="text-blue-600 font-bold text-base">{currentPage}</span> of <span className="font-bold text-base">{totalPages}</span>
      </div>

      <nav className="flex gap-2 flex-wrap justify-center" aria-label="Pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2.5 border border-sky-300 bg-sky-100 text-gray-700 rounded-lg font-semibold hover:bg-sky-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
          aria-label="Previous page"
        >
          ← Previous
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2.5 min-w-12 rounded-lg font-semibold transition-all shadow-sm ${
              currentPage === page
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                : 'border border-indigo-300 bg-indigo-100 text-gray-700 hover:bg-indigo-200 hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0'
            }`}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2.5 border border-sky-300 bg-sky-100 text-gray-700 rounded-lg font-semibold hover:bg-sky-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
          aria-label="Next page"
        >
          Next →
        </button>
      </nav>
    </div>
  );
};
