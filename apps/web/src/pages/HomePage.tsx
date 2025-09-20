import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import VideoGrid from '../components/VideoGrid';
import { useVideos } from '../hooks/useVideos';
import type { VideoFilters } from '../types';

function parseFilters(params: URLSearchParams): VideoFilters {
  const team = params.get('team') ?? undefined;
  const dateFrom = params.get('dateFrom') ?? undefined;
  const dateTo = params.get('dateTo') ?? undefined;

  return {
    team,
    dateFrom,
    dateTo,
  };
}

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);
  const { videos, loading, error, refetch } = useVideos(filters);

  return (
    <div className="space-y-6">
      <section className="rounded-md border bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">最新ハイライト</h2>
            <p className="text-sm text-gray-600">
              フィルターでチームや日付を選び、ネタバレなしの振り返りをチェックしましょう。
            </p>
          </div>
          <Link
            to="/videos/sample"
            className="inline-flex items-center gap-1 rounded-md border border-blue-200 px-3 py-1 text-sm font-medium text-blue-600 hover:border-blue-300 hover:text-blue-500"
          >
            デモ動画を見る
            <span aria-hidden>→</span>
          </Link>
        </header>

        <dl className="mt-6 grid gap-4 text-sm text-gray-600 sm:grid-cols-4">
          <div>
            <dt className="font-medium text-gray-700">対象チーム</dt>
            <dd>{filters.team ?? 'すべてのチーム'}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-700">開始日</dt>
            <dd>{filters.dateFrom ?? '指定なし'}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-700">終了日</dt>
            <dd>{filters.dateTo ?? '指定なし'}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-700">取得件数</dt>
            <dd>
              {loading ? '読込中…' : `${videos.length.toString()} 件`}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-md border border-dashed border-gray-300 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">FilterBar プレースホルダー</h3>
        <p className="mt-2 text-sm text-gray-600">
          ここにチーム選択や日付範囲を切り替えるフィルター UI を設置します。URL パラメーターとの同期仕様に対応予定です。
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">ハイライト一覧</h3>
          <div className="text-xs text-gray-500">
            {loading ? '最新の動画を読み込み中…' : `表示中: ${videos.length.toString()} 件`}
          </div>
        </div>
        <VideoGrid videos={videos} isLoading={loading} error={error} onRetry={refetch} />
      </section>
    </div>
  );
}
