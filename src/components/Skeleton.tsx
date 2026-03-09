import React from 'react';

export const AnimeCardSkeleton: React.FC = () => {
  return (
    <div className="bg-indigo-100 rounded-lg overflow-hidden shadow-sm h-full flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[2/3] bg-gray-200"></div>

      {/* Content Skeleton */}
      <div className="p-4 flex-1 flex flex-col space-y-3">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>

        {/* Genres */}
        <div className="flex gap-2">
          <div className="h-6 bg-gray-300 rounded-full w-16"></div>
          <div className="h-6 bg-gray-300 rounded-full w-20"></div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex justify-between">
          <div className="h-4 bg-gray-300 rounded w-12"></div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export const AnimeGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <AnimeCardSkeleton key={index} />
      ))}
    </div>
  );
};

export const DetailSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
      {/* Left Column */}
      <div className="lg:col-span-1">
        <div className="aspect-[2/3] bg-gray-200 rounded-lg mb-6"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-200 rounded-lg h-24"></div>
          <div className="bg-gray-200 rounded-lg h-24"></div>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-2 space-y-6">
        <div className="space-y-3">
          <div className="h-10 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>

        <div className="bg-indigo-100 rounded-lg p-6 space-y-4">
          <div className="h-6 bg-gray-300 rounded w-32"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>

        <div className="bg-indigo-100 rounded-lg p-6 space-y-4">
          <div className="h-6 bg-gray-300 rounded w-32"></div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded-full w-20"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
