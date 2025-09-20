import { useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatMatchDate, formatDuration } from '../lib/video-utils';

const SAMPLE_MATCH_DATE = '2024-05-12T18:30:00Z';
const SAMPLE_DURATION_SECONDS = 780;

export default function VideoPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

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
            API 連携後にタイトルや対戦カード、サムネイルが動的に反映されます。
          </p>
        </header>

        <div className="mt-6 space-y-4">
          <div className="aspect-video w-full rounded-md border border-dashed border-gray-300 bg-gray-100" />
          <p className="text-xs text-gray-500">
            VideoPlayer / YouTubePlayer コンポーネントがここに差し込まれ、埋め込み URL と自動再生の制御を担います。
          </p>
        </div>

        <dl className="mt-6 grid gap-4 text-sm text-gray-700 sm:grid-cols-3">
          <div>
            <dt className="font-medium text-gray-600">試合日</dt>
            <dd>{formatMatchDate(SAMPLE_MATCH_DATE) || '未設定'}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-600">動画尺</dt>
            <dd>{formatDuration(SAMPLE_DURATION_SECONDS) || '未設定'}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-600">視聴モード</dt>
            <dd>ネタバレなしハイライト</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-md border border-dashed border-gray-300 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">関連情報プレースホルダー</h2>
        <p className="mt-2 text-sm text-gray-600">
          チーム情報や追加の試合データ、参考リンクなどをこのセクションに配置します。
        </p>
      </section>
    </div>
  );
}
