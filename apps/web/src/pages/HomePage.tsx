import { Link } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import VideoGrid from "../components/VideoGrid";
import { useVideos } from "../hooks/useVideos";
import { useVideoFiltersState } from "../hooks/useVideoFilters";
import { useTeams } from "../hooks/useTeams";
import {
  useFilterSummary,
  DEFAULT_TEAM_LABEL,
  NO_DATE_LABEL,
} from "../hooks/useFilterSummary";

export default function HomePage() {
  const { filters, setFilters, resetFilters } = useVideoFiltersState();
  const {
    videos,
    loading: videosLoading,
    error: videosError,
    refetch,
  } = useVideos(filters);
  const { teams, loading: teamsLoading, error: teamsError } = useTeams();

  const { selectedTeamLabel, summaryText } = useFilterSummary(filters, teams);

  const isFilterBusy = teamsLoading || videosLoading;
  const totalCountLabel = videosLoading
    ? "読み込み中…"
    : `${videos.length.toString()} 件`;

  return (
    <div className="space-y-6">
      <section className="rounded-md border bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              最新ハイライト
            </h2>
            <p className="text-sm text-gray-600">
              フィルターで絞り込みながら、ネタバレなしの振り返りを楽しみましょう。
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
            <dd>{selectedTeamLabel}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-700">開始日</dt>
            <dd>{filters.dateFrom ?? NO_DATE_LABEL}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-700">終了日</dt>
            <dd>{filters.dateTo ?? NO_DATE_LABEL}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-700">取得件数</dt>
            <dd>{totalCountLabel}</dd>
          </div>
        </dl>

        <p className="mt-4 text-xs text-gray-500">{summaryText}</p>
      </section>

      <FilterBar
        filters={filters}
        teams={teams}
        isLoading={isFilterBusy}
        error={teamsError}
        onChange={setFilters}
        onReset={resetFilters}
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            ハイライト一覧
          </h3>
          <div className="text-xs text-gray-500">
            {videosLoading
              ? "最新の動画を読み込み中…"
              : `表示中: ${videos.length.toString()} 件`}
          </div>
        </div>
        <VideoGrid
          videos={videos}
          isLoading={videosLoading}
          error={videosError}
          onRetry={refetch}
        />
      </section>
    </div>
  );
}
