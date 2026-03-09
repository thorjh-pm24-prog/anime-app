import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAnimeStore } from '@/stores/animeStore';
import { ToastProvider } from '@/components/Toast';
import { HeartAnimation } from '@/components/HeartAnimation';
import { DeviceViewportWrapper } from '@/components/DeviceViewportWrapper';
import { AnimeListPage } from '@/pages/AnimeListPage';
import { AnimeDetailPage } from '@/pages/AnimeDetailPage';

function AppRouter() {
  const { loadFavorites } = useAnimeStore();

  useEffect(() => {
    // Load favorites from localStorage on app start
    loadFavorites();
  }, [loadFavorites]);

  return (
    <Routes>
      <Route path="/anime/list" element={<AnimeListPage />} />
      <Route path="/anime/detail/:id" element={<AnimeDetailPage />} />
      <Route path="/" element={<Navigate to="/anime/list" replace />} />
      <Route path="*" element={<Navigate to="/anime/list" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <HeartAnimation />
      <ToastProvider>
        <DeviceViewportWrapper>
          <AppRouter />
        </DeviceViewportWrapper>
      </ToastProvider>
    </Router>
  );
}
