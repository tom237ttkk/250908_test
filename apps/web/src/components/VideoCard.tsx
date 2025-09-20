import { Link } from 'react-router-dom';
import { formatDuration, formatMatchDate } from '../lib/video-utils';
import type { Video } from '../types';

const PROVIDER_LABEL: Record<Video['videoType'], string> = {
  youtube: 'YouTube',
  vimeo: 'Vimeo',
  direct: 'Direct',
};

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const matchDate = formatMatchDate(video.matchDate) || '日付未定';
  const duration = formatDuration(video.duration) || '時間未定';
  const headline = `${video.homeTeam} vs ${video.awayTeam}`;
  const provider = PROVIDER_LABEL[video.videoType] ?? 'Video';

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/videos/${video.id}`} className="group relative block aspect-video bg-gray-200">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={`${headline} のハイライト`}
            className="h-full w-full object-cover transition group-hover:opacity-90"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-sm text-gray-500">
            プレビュー準備中
          </div>
        )}
        <span className="absolute left-2 top-2 inline-flex items-center rounded bg-black/70 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-white">
          {provider}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 px-4 py-3">
        <header className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {matchDate} · {duration}
          </p>
          <h3 className="line-clamp-2 text-base font-semibold text-gray-900">{video.title}</h3>
          <p className="text-sm text-gray-600">{headline}</p>
        </header>

        <div className="mt-auto">
          <Link
            to={`/videos/${video.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-500"
          >
            ハイライトを見る
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
