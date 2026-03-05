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
  const { playClick } = useSound();

  const state = location.state as LocationState | null;
  const anime = detailAnime || state?.anime;
  const favorite = anime ? isFavorite(anime.mal_id) : false;

  useEffect(() => {
    if (!anime && id) {
      fetchDetail(parseInt(id));
    }
  }, [id, fetchDetail, anime]);

  const handleFavoriteClick = () => {
    playClick();
    if (!anime) return;
    if (favorite) {
      removeFavorite(anime.mal_id);
    } else {
      addFavorite(anime);
    }
  };

  if (!anime && loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <LoadingSpinner message="Loading anime details..." />
        </div>
      </div>
    );
  }

  if (error && !anime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Anime Not Found</h2>
            <p className="text-gray-600 text-lg">The anime you're looking for is not available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      {/* Device View Selector - Fixed Top Right Corner */}
      <div className="fixed top-4 right-4 sm:top-5 sm:right-6 z-50 bg-white rounded-lg border border-gray-200 border-opacity-70 shadow-lg p-2.5 sm:p-3">
        <DevicePreview
          currentDevice={deviceMode as DeviceType}
          onDeviceChange={(device) => setDeviceMode(device as any)}
        />
      </div>
      
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-2.5 sm:px-3 md:px-4 lg:px-6 py-4 sm:py-6 md:py-8 lg:py-10">
        {/* Header with Back and Favorite Buttons */}
        <div className="mb-4 sm:mb-6 lg:mb-8 flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
          <button
            onClick={() => navigate('/anime/list')}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-700 rounded-lg hover:shadow-md transition-all font-semibold border border-gray-300 hover:bg-gray-50 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Back</span>
            <span className="sm:hidden">Back</span>
          </button>
          <button
            onClick={handleFavoriteClick}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 text-sm sm:text-base ${
              favorite
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            title={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill={favorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {favorite ? 'Saved' : 'Save'}
          </button>
        </div>

        {/* Container 1: Images & Trailer */}
        <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 border-opacity-60 shadow-sm hover:shadow-md transition-shadow mb-4 sm:mb-6 lg:mb-8 overflow-hidden">
          {/* PHONE: Poster & Trailer Stacked */}
          <div className="lg:hidden">
            {/* Poster Image - Phone */}
            <div className="overflow-hidden border-b border-gray-200 border-opacity-60 h-[300px] sm:h-[340px]">
              <img
                src={anime.images?.jpg?.large_image_url}
                alt={anime.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Trailer - Phone */}
            <div className="bg-black overflow-hidden h-[300px] sm:h-[340px]">
              {anime.trailer?.embed_url ? (
                <iframe
                  src={anime.trailer.embed_url}
                  title={`${anime.title} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-none"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-2 sm:mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-300 font-semibold text-sm">No Trailer Available</p>
                </div>
              )}
            </div>
          </div>

          {/* TABLET & DESKTOP: Poster & Trailer Side-by-Side */}
          <div className="hidden lg:grid grid-cols-4 gap-0 items-stretch">
            {/* Poster Image */}
            <div className="col-span-1 overflow-hidden border-r border-gray-200 border-opacity-60 min-h-[400px] lg:min-h-[450px]">
              <img
                src={anime.images?.jpg?.large_image_url}
                alt={anime.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Video Trailer - Full Screen */}
            <div className="col-span-3 bg-black overflow-hidden min-h-[400px] lg:min-h-[450px]">
              {anime.trailer?.embed_url ? (
                <iframe
                  src={anime.trailer.embed_url}
                  title={`${anime.title} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-none"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-300 font-semibold text-base sm:text-lg">No Trailer Available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Container 2: Information & Details */}
        <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 border-opacity-60 shadow-sm hover:shadow-md transition-shadow p-3 sm:p-4 md:p-5 lg:p-8">
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
                <div className="text-sm sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 line-clamp-1">{anime.type}</div>
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
                <div className="text-sm sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 line-clamp-1">{anime.status}</div>
              </div>
            )}
            {anime.aired?.string && (
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-2.5 sm:p-2.5 md:p-3 lg:p-4 rounded-lg border border-orange-200 border-opacity-50">
                <div className="text-xs font-semibold text-orange-600 uppercase mb-0.5 sm:mb-1">Aired</div>
                <div className="text-sm sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 line-clamp-1">{anime.aired.string}</div>
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

