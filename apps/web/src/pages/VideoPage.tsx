import { useCallback, useMemo } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { formatDuration, formatMatchDate } from '../lib/video-utils';
import { useVideo } from '../hooks/useVideo';

const PROVIDER_LABEL: Record<string, string> = {
  youtube: 'YouTube',
  vimeo: 'Vimeo',
  direct: 'Direct 再生',
};

export default function VideoPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const { video, loading, error, refetch } = useVideo(id);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const safeHomeTeam = video?.homeTeam?.trim() || 'ホームチーム未定';
  const safeAwayTeam = video?.awayTeam?.trim() || 'アウェイチーム未定';
  const matchDateLabel = video?.matchDate ? formatMatchDate(video.matchDate) : '未設定';
  const durationLabel = video?.duration ? formatDuration(video.duration) : '未設定';
  const providerLabel = video ? PROVIDER_LABEL[video.videoType] ?? '未設定' : '未設定';
  const headline = video ? `${safeHomeTeam} vs ${safeAwayTeam}` : '対戦カード情報は未設定です。';

  const statusMessage = useMemo(() => {
    if (loading) {
      return '動画を読み込み中です…';
    }
    if (error) {
      return error;
    }
    return undefined;
  }, [loading, error]);

  const isEmptyState = !loading && !error && !video;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-sm text-blue-600">
        <button type="button" onClick={handleBack} className="hover:underline">
          戻る
        </button>
        <span aria-hidden>·</span>
        <Link to="/" className="hover:underline">
          一覧へ
        </Link>
      </div>

      <section className="rounded-md border bg-white p-6 shadow-sm">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-gray-500">動画 ID</p>
          <h1 className="text-2xl font-semibold text-gray-900">{id}</h1>
          <p className="text-sm text-gray-600">
            {video?.title ?? 'ハイライトの詳細を読み込み中です。'}
          </p>
        </header>

        <div className="mt-6 space-y-4">
          {video ? (
            <VideoPlayer video={video} autoplay className="max-h-[70vh]" />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-100 text-sm text-gray-500">
              {statusMessage ?? '動画を表示する準備ができていません。'}
            </div>
          )}

          {error ? (
            <div className="flex items-center justify-between rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              <span>{error}</span>
              <button
                type="button"
                onClick={() => {
                  void refetch();
                }}
                className="rounded border border-red-300 px-2 py-1 font-medium hover:bg-red-100"
              >
                再読み込み
              </button>
            </div>
          ) : null}

          {isEmptyState ? (
            <div className="flex items-center justify-between rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-700">
              <span>該当するハイライトが見つかりませんでした。</span>
              <Link to="/" className="font-medium underline">
                ホームに戻る
              </Link>
            </div>
          ) : null}
        </div>

        <dl className="mt-6 grid gap-4 text-sm text-gray-700 sm:grid-cols-3">
          <div>
            <dt className="font-medium text-gray-600">試合日</dt>
            <dd>{matchDateLabel}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-600">動画尺</dt>
            <dd>{durationLabel}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-600">プレーヤー</dt>
            <dd>{providerLabel}</dd>
          </div>
        </dl>

        <p className="mt-6 text-sm text-gray-600">{headline}</p>
      </section>

      <section className="rounded-md border border-dashed border-gray-300 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">関連情報</h2>
        <p className="mt-2 text-sm text-gray-600">
          チーム情報や追加の試合データが整い次第、このセクションで詳しく紹介します。
        </p>
        <div className="mt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            ホームに戻って他のハイライトを見る
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
