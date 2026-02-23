import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Anime } from '@/types';
import { useAnimeDetail, useSound } from '@/hooks';
import { useAnimeStore } from '@/stores/animeStore';
import { LoadingSpinner, ErrorMessage } from '@/components/common';
import { Header } from '@/components/Header';

interface LocationState {
  anime?: Anime;
}

export const AnimeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { anime: detailAnime, loading, error, fetchDetail } = useAnimeDetail();
  const { isFavorite, addFavorite, removeFavorite } = useAnimeStore();
  const { playPopSound } = useSound();

  const state = location.state as LocationState | null;
  const anime = detailAnime || state?.anime;
  const favorite = anime ? isFavorite(anime.mal_id) : false;

  useEffect(() => {
    if (!anime && id) {
      fetchDetail(parseInt(id));
    }
  }, [id, fetchDetail, anime]);

  const handleFavoriteClick = () => {
    playPopSound(); // Play cute sound when adding/removing favorites
    if (!anime) return;
    if (favorite) {
      removeFavorite(anime.mal_id);
    } else {
      addFavorite(anime);
    }
  };

  if (!anime && loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <LoadingSpinner message="Loading details..." />
        </div>
      </div>
    );
  }

  if (error && !anime) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <button
            onClick={() => navigate('/anime/list')}
            className="mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            ← Back to Search
          </button>
          <ErrorMessage message={error} onRetry={() => id && fetchDetail(parseInt(id))} />
        </div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <button
            onClick={() => navigate('/anime/list')}
            className="mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            ← Back to Search
          </button>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Anime not found</h2>
            <p className="text-gray-600">The anime you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with Back and Favorite Buttons */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate('/anime/list')}
            className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-300 flex items-center gap-2"
          >
            ← Back
          </button>
          <button
            onClick={handleFavoriteClick}
            className="px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-300 flex items-center gap-2"
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            title={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <span className="text-2xl">{favorite ? '❤️' : '🤍'}</span>
            <span>{favorite ? 'Favorited' : 'Add to Favorites'}</span>
          </button>
        </div>

        {/* Container 1: Images & Trailer */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Poster Image */}
            <div className="rounded-xl overflow-hidden shadow-md">
              <img
                src={anime.images?.jpg?.large_image_url}
                alt={anime.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Video Trailer */}
            <div className="flex flex-col justify-center">
              {anime.trailer?.embed_url ? (
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl overflow-hidden shadow-lg p-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-3xl">🎬</span>
                    <h3 className="text-white font-bold text-lg">Watch Trailer</h3>
                  </div>
                  <div className="bg-black rounded-lg overflow-hidden w-full aspect-video">
                    <iframe
                      src={anime.trailer.embed_url}
                      title={`${anime.title} Trailer`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-none"
                    />
                  </div>
                  <p className="text-white text-sm mt-4 text-center opacity-90">
                    Click play to watch the official trailer
                  </p>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-xl p-8 text-center h-full flex flex-col items-center justify-center">
                  <div className="text-5xl mb-4">🎥</div>
                  <p className="text-gray-600 font-semibold text-lg">No Trailer</p>
                  <p className="text-gray-500 text-sm mt-2">Trailer not found for this anime</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Container 2: Information & Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">{anime.title}</h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <p className="text-xl text-gray-600 mb-2">{anime.title_english}</p>
            )}
            {anime.title_japanese && (
              <p className="text-lg text-gray-500">{anime.title_japanese}</p>
            )}
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 pb-8 border-b border-gray-200">
            {anime.type && (
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Type</div>
                <div className="text-lg font-semibold text-gray-900">{anime.type}</div>
              </div>
            )}
            {anime.episodes && (
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Episodes</div>
                <div className="text-lg font-semibold text-gray-900">{anime.episodes}</div>
              </div>
            )}
            {anime.status && (
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Status</div>
                <div className="text-lg font-semibold text-gray-900">{anime.status}</div>
              </div>
            )}
            {anime.aired?.string && (
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Aired</div>
                <div className="text-lg font-semibold text-gray-900">{anime.aired.string}</div>
              </div>
            )}
            {anime.score && (
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Rating</div>
                <div className="text-lg font-semibold text-yellow-500">★ {anime.score.toFixed(1)}</div>
              </div>
            )}
            {anime.popularity && (
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Popularity</div>
                <div className="text-lg font-semibold text-gray-900">#{anime.popularity}</div>
              </div>
            )}
            {anime.members && (
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Members</div>
                <div className="text-lg font-semibold text-gray-900">{(anime.members / 1000000).toFixed(1)}M</div>
              </div>
            )}
            {anime.score && (
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Score</div>
                <div className="text-lg font-semibold text-gray-900">{anime.score.toFixed(1)}/10</div>
              </div>
            )}
          </div>

          {/* Synopsis */}
          {anime.synopsis && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Synopsis</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{anime.synopsis}</p>
            </div>
          )}

          {/* Background */}
          {anime.background && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Background</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{anime.background}</p>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
          Powered by Jikan API • Data from MyAnimeList
        </div>
      </footer>
    </div>
  );
};

