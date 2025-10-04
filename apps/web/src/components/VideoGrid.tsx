import VideoCard from './VideoCard';
import type { Video } from '../types';

const SKELETON_PLACEHOLDERS = [
  'skeleton-1',
  'skeleton-2',
  'skeleton-3',
  'skeleton-4',
  'skeleton-5',
  'skeleton-6',
];

interface VideoGridProps {
  videos: Video[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export default function VideoGrid({ videos, isLoading = false, error, onRetry }: VideoGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite" aria-busy="true">
        {SKELETON_PLACEHOLDERS.map((placeholderId) => (
          <div
            key={placeholderId}
            className="h-64 animate-pulse rounded-lg border border-dashed border-gray-300 bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex flex-col items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-6 text-center"
        role="alert"
        aria-live="assertive"
      >
        <p className="text-sm font-medium text-red-700">動画の取得に失敗しました。</p>
        <p className="text-xs text-red-600">{error}</p>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-500"
          >
            再試行する
          </button>
        ) : null}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div
        className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500"
        aria-live="polite"
      >
        条件に一致するハイライトがまだありません。検索条件を変更して再度お試しください。
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
