import { Outlet, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';

function Layout() {
  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <h1 className="text-lg font-semibold">Spoiler-Free Highlights</h1>
          <p className="text-sm text-gray-500">
            Stay up to date without revealing final scores.
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="rounded-md border bg-white p-6 text-center shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Page not found</h2>
      <p className="mt-2 text-sm text-gray-600">
        The route you are trying to reach does not exist yet.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="videos/:id" element={<VideoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
