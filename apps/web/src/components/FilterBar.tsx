import { useMemo, type ChangeEvent } from 'react';
import type { Team, VideoFilters } from '../types';

interface FilterBarProps {
  filters: VideoFilters;
  teams: Team[];
  isLoading?: boolean;
  error?: string | null;
  onChange: (filters: VideoFilters) => void;
  onReset?: () => void;
}

interface SelectOption {
  value: string;
  label: string;
}

function mapTeamsToOptions(teams: Team[]): SelectOption[] {
  return teams.map((team) => ({
    value: team.id,
    label: team.name,
  }));
}

export default function FilterBar({
  filters,
  teams,
  isLoading = false,
  error,
  onChange,
  onReset,
}: FilterBarProps) {
  const options = useMemo(() => mapTeamsToOptions(teams), [teams]);

  const handleTeamChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onChange({
      ...filters,
      team: value.length > 0 ? value : undefined,
    });
  };

  const handleDateFromChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange({
      ...filters,
      dateFrom: value.length > 0 ? value : undefined,
    });
  };

  const handleDateToChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange({
      ...filters,
      dateTo: value.length > 0 ? value : undefined,
    });
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  return (
    <section className="rounded-md border bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">フィルター</h3>
          <p className="text-sm text-gray-600">チームと期間を指定してハイライトを絞り込みます。</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {isLoading ? 'フィルターを更新中…' : '条件を変更すると自動で更新されます'}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="space-y-2 text-sm">
          <span className="font-medium text-gray-700">対象チーム</span>
          <select
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={filters.team ?? ''}
            onChange={handleTeamChange}
            disabled={isLoading}
          >
            <option value="">すべてのチーム</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-gray-700">開始日</span>
          <input
            type="date"
            value={filters.dateFrom ?? ''}
            onChange={handleDateFromChange}
            disabled={isLoading}
            max={filters.dateTo}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-gray-700">終了日</span>
          <input
            type="date"
            value={filters.dateTo ?? ''}
            onChange={handleDateToChange}
            disabled={isLoading}
            min={filters.dateFrom}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </label>

        <div className="space-y-2 text-sm">
          <span className="font-medium text-gray-700">操作</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className="inline-flex flex-1 items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              条件をクリア
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <p className="mt-4 rounded-md border border-yellow-300 bg-yellow-50 px-3 py-2 text-xs text-yellow-800">
          チームリストの取得に失敗しました: {error}
        </p>
      ) : null}
    </section>
  );
}
