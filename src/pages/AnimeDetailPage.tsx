import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Anime } from '@/types';
import { useAnimeDetail, useSound } from '@/hooks';
import { useAnimeStore } from '@/stores/animeStore';
import { LoadingSpinner, ErrorMessage } from '@/components/common';
import { Header } from '@/components/Header';
import { DevicePreview, type DeviceType } from '@/components/DevicePreview';

interface LocationState {
  anime?: Anime;
}

export const AnimeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { anime: detailAnime, loading, error, fetchDetail } = useAnimeDetail();
  const { isFavorite, addFavorite, removeFavorite, deviceMode, setDeviceMode } = useAnimeStore();
  const { playClick, playLove } = useSound();

  const state = location.state as LocationState | null;
  const anime = detailAnime || state?.anime;
  const favorite = anime ? isFavorite(anime.mal_id) : false;

  useEffect(() => {
    if (!anime && id) {
      fetchDetail(parseInt(id));
    }
  }, [id, fetchDetail, anime]);

  const handleFavoriteClick = () => {
    playLove();
    if (!anime) return;
    if (favorite) {
      removeFavorite(anime.mal_id);
    } else {
      addFavorite(anime);
      // Trigger heart animation
      window.dispatchEvent(new Event('heart-click'));
    }
  };

  if (!anime && loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <LoadingSpinner message="Loading anime details..." />
        </div>
      </div>
    );
  }

  if (error && !anime) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <button
            onClick={() => navigate('/anime/list')}
            className="mb-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all shadow-md font-semibold hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Search
          </button>
          <ErrorMessage message={error} onRetry={() => id && fetchDetail(parseInt(id))} />
        </div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <button
            onClick={() => navigate('/anime/list')}
            className="mb-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all shadow-md font-semibold hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Search
          </button>
          <div className="text-center py-24">
            <div className="w-20 h-20 mx-auto bg-purple-900 bg-opacity-50 rounded-full flex items-center justify-center mb-6 border border-purple-700">
              <svg className="w-10 h-10 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Anime Not Found</h2>
            <p className="text-gray-300 text-lg">The anime you're looking for is not available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Device View Selector - Fixed Top Right Corner */}
      <div className="fixed top-4 right-4 sm:top-5 sm:right-6 z-50 bg-indigo-100 rounded-lg border border-indigo-200 shadow-lg p-2.5 sm:p-3">
        <DevicePreview
          currentDevice={deviceMode as DeviceType}
          onDeviceChange={(device) => setDeviceMode(device as any)}
        />
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2.5 sm:px-3 md:px-4 lg:px-6 py-4 sm:py-6 md:py-8 lg:py-10">
        {/* Header with Back and Favorite Buttons */}
        <div className="mb-4 sm:mb-6 lg:mb-8 flex items-center justify-between gap-3 sm:gap-4 flex-wrap animate-fade-in">
          <button
            onClick={() => {
              playClick();
              navigate('/anime/list');
            }}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-100 to-indigo-50 text-gray-700 rounded-lg hover:shadow-md transition-all duration-300 font-semibold border border-indigo-300 hover:border-indigo-400 hover:bg-gradient-to-r hover:from-indigo-200 hover:to-indigo-100 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 text-sm sm:text-base group"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Back</span>
            <span className="sm:hidden">Back</span>
          </button>
          <button
            onClick={handleFavoriteClick}
            className={`p-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 ${
              favorite
                ? 'bg-gradient-to-br from-red-500 to-pink-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            title={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className={`w-6 h-6 ${favorite ? 'drop-shadow-md' : ''}`} fill={favorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Container 1: Images & Trailer */}
        <div className="bg-indigo-100 rounded-lg sm:rounded-xl border border-indigo-200 shadow-sm hover:shadow-md transition-shadow mb-4 sm:mb-6 lg:mb-8 overflow-hidden">
          {/* PHONE & TABLET: Poster & Trailer Stacked */}
          <div className="lg:hidden">
            {/* Poster Image - Phone */}
            <div className="overflow-hidden border-b border-indigo-200 w-full aspect-[2/3]">
              <img
                src={anime.images?.jpg?.large_image_url}
                alt={anime.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Trailer Section - Phone & Tablet */}
            <div className="p-3 sm:p-4 bg-white border-b border-indigo-200">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Trailer</h2>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <div className="absolute inset-0 bg-black rounded-lg overflow-hidden">
                  {anime.trailer?.embed_url ? (
                    <iframe
                      src={anime.trailer.embed_url}
                      title={`${anime.title} Trailer`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full border-none"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                      <div className="relative mb-3">
                        <div className="absolute inset-0 bg-red-600 opacity-20 rounded-full blur-xl"></div>
                        <svg className="relative w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-300 font-semibold text-sm sm:text-base">No Trailer Available</p>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">Check back later</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP: Poster & Trailer Side-by-Side */}
          <div className="hidden lg:grid grid-cols-5 gap-0 items-stretch">
            {/* Poster Image */}
            <div className="col-span-2 overflow-hidden border-r border-indigo-200 bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="relative w-full h-full">
                <img
                  src={anime.images?.jpg?.large_image_url}
                  alt={anime.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Video Trailer Section */}
            <div className="col-span-3 bg-white p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">Official Trailer</h2>
              </div>
              <div className="relative w-full flex-1" style={{ minHeight: '400px' }}>
                <div className="absolute inset-0 bg-black rounded-lg overflow-hidden shadow-inner">
                  {anime.trailer?.embed_url ? (
                    <iframe
                      src={anime.trailer.embed_url}
                      title={`${anime.title} Trailer`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full border-none"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-red-600 opacity-20 rounded-full blur-2xl"></div>
                        <svg className="relative w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-300 font-semibold text-lg">No Trailer Available</p>
                      <p className="text-gray-500 text-sm mt-2">This anime doesn't have a trailer yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Container 2: Information & Details */}
        <div className="bg-indigo-100 rounded-lg sm:rounded-xl border border-indigo-200 shadow-sm hover:shadow-md transition-shadow p-3 sm:p-4 md:p-5 lg:p-8">
          {/* Title */}
          <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1 sm:mb-1.5 md:mb-2">
              {anime.title}
            </h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <p className="text-sm sm:text-sm md:text-base lg:text-lg text-gray-600 mb-1 sm:mb-1.5 md:mb-2">{anime.title_english}</p>
            )}
            {anime.title_japanese && (
              <p className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-500">{anime.title_japanese}</p>
            )}
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2 md:gap-2.5 lg:gap-4 mb-4 sm:mb-4 md:mb-6 lg:mb-8 pb-4 sm:pb-4 md:pb-6 lg:pb-8 border-b border-gray-200">
            {anime.type && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-2.5 sm:p-2.5 md:p-3 lg:p-4 rounded-lg border border-blue-200 border-opacity-50">
                <div className="text-xs font-semibold text-blue-600 uppercase mb-0.5 sm:mb-1">Type</div>
                <div className="text-sm sm:text-sm md:text-base lg:text-lg font-bold text-gray-900">{anime.type}</div>
              </div>
            )}
            {anime.episodes && (
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-2.5 sm:p-2.5 md:p-3 lg:p-4 rounded-lg border border-purple-200 border-opacity-50">
                <div className="text-xs font-semibold text-purple-600 uppercase mb-0.5 sm:mb-1">Episodes</div>
                <div className="text-sm sm:text-sm md:text-base lg:text-lg font-bold text-gray-900">{anime.episodes}</div>
              </div>
            )}
            {anime.status && (
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-2.5 sm:p-2.5 md:p-3 lg:p-4 rounded-lg border border-green-200 border-opacity-50">
                <div className="text-xs font-semibold text-green-600 uppercase mb-0.5 sm:mb-1">Status</div>
                <div className="text-sm sm:text-sm md:text-base lg:text-lg font-bold text-gray-900">{anime.status}</div>
              </div>
            )}
            {anime.aired?.string && (
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-2.5 sm:p-2.5 md:p-3 lg:p-4 rounded-lg border border-orange-200 border-opacity-50">
                <div className="text-xs font-semibold text-orange-600 uppercase mb-0.5 sm:mb-1">Aired</div>
                <div className="text-sm sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 break-words">{anime.aired.string}</div>
              </div>
            )}
            {anime.score && (
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-2.5 sm:p-2.5 md:p-3 lg:p-4 rounded-lg border border-yellow-200 border-opacity-50">
                <div className="text-xs font-semibold text-yellow-600 uppercase mb-0.5 sm:mb-1">Score</div>
                <div className="text-sm sm:text-sm md:text-base lg:text-lg font-bold text-gray-900">
                  {anime.score.toFixed(1)}/10
                </div>
              </div>
            )}
            {anime.popularity && (
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-2.5 sm:p-2.5 md:p-3 lg:p-4 rounded-lg border border-red-200 border-opacity-50">
                <div className="text-xs font-semibold text-red-600 uppercase mb-0.5 sm:mb-1">Popularity</div>
                <div className="text-sm sm:text-sm md:text-base lg:text-lg font-bold text-gray-900">#{anime.popularity}</div>
              </div>
            )}
            {anime.members && (
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-2.5 sm:p-2.5 md:p-3 lg:p-4 rounded-lg border border-indigo-200 border-opacity-50">
                <div className="text-xs font-semibold text-indigo-600 uppercase mb-0.5 sm:mb-1">Members</div>
                <div className="text-sm sm:text-sm md:text-base lg:text-lg font-bold text-gray-900">{(anime.members / 1000000).toFixed(1)}M</div>
              </div>
            )}
            {anime.year && (
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-2.5 sm:p-2.5 md:p-3 lg:p-4 rounded-lg border border-cyan-200 border-opacity-50">
                <div className="text-xs font-semibold text-cyan-600 uppercase mb-0.5 sm:mb-1">Year</div>
                <div className="text-sm sm:text-sm md:text-base lg:text-lg font-bold text-gray-900">{anime.year}</div>
              </div>
            )}
          </div>

          {/* Synopsis */}
          {anime.synopsis && (
            <div className="mb-4 sm:mb-4 md:mb-6 lg:mb-8">
              <h2 className="text-lg sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-2 md:mb-3 lg:mb-4">Synopsis</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-sm md:text-sm lg:text-base">{anime.synopsis}</p>
            </div>
          )}

          {/* Background */}
          {anime.background && (
            <div>
              <h2 className="text-lg sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-2 md:mb-3 lg:mb-4">Background</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-sm md:text-sm lg:text-base">{anime.background}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

