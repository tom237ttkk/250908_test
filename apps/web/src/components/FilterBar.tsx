import { useMemo, type ChangeEvent } from "react";
import type { Team, VideoFilters } from "../types";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select, { type SelectOption } from "./ui/Select";

interface FilterBarProps {
  filters: VideoFilters;
  teams: Team[];
  isLoading?: boolean;
  error?: string | null;
  onChange: (filters: VideoFilters) => void;
  onReset?: () => void;
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

  const handleFilterChange = <T extends HTMLInputElement | HTMLSelectElement>(
    key: keyof VideoFilters
  ) => {
    return (event: ChangeEvent<T>) => {
      const value = event.target.value;
      onChange({
        ...filters,
        [key]: value.length > 0 ? value : undefined,
      });
    };
  };

  return (
    <section className="rounded-md border bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">フィルター</h3>
          <p className="text-sm text-gray-600">
            チームと期間を指定してハイライトを絞り込みます。
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {isLoading
            ? "フィルターを更新中…"
            : "条件を変更すると自動で更新されます"}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="space-y-2 text-sm">
          <span className="font-medium text-gray-700">対象チーム</span>
          <Select
            value={filters.team ?? ""}
            onChange={handleFilterChange<HTMLSelectElement>("team")}
            disabled={isLoading}
            options={options}
            placeholder="すべてのチーム"
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-gray-700">開始日</span>
          <Input
            type="date"
            value={filters.dateFrom ?? ""}
            onChange={handleFilterChange<HTMLInputElement>("dateFrom")}
            disabled={isLoading}
            max={filters.dateTo}
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-gray-700">終了日</span>
          <Input
            type="date"
            value={filters.dateTo ?? ""}
            onChange={handleFilterChange<HTMLInputElement>("dateTo")}
            disabled={isLoading}
            min={filters.dateFrom}
          />
        </label>

        <div className="space-y-2 text-sm">
          <span className="font-medium text-gray-700">操作</span>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={onReset}
              disabled={isLoading}
              className="flex-1"
            >
              条件をクリア
            </Button>
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
