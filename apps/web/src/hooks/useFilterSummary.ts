import { useMemo } from "react";
import type { Team, VideoFilters } from "../types";

export const DEFAULT_TEAM_LABEL = "すべてのチーム";
export const NO_DATE_LABEL = "指定なし";

interface UseFilterSummaryResult {
  selectedTeamLabel: string;
  summaryText: string;
  hasActiveFilters: boolean;
}

export function useFilterSummary(
  filters: VideoFilters,
  teams: Team[]
): UseFilterSummaryResult {
  const hasActiveFilters = Boolean(
    filters.team || filters.dateFrom || filters.dateTo
  );

  const selectedTeamLabel = useMemo(() => {
    if (!filters.team) {
      return DEFAULT_TEAM_LABEL;
    }
    const team = teams.find((candidate) => candidate.id === filters.team);
    return team?.name ?? DEFAULT_TEAM_LABEL;
  }, [filters.team, teams]);

  const summaryText = useMemo(() => {
    if (!hasActiveFilters) {
      return "すべての条件でハイライトを表示しています。";
    }

    const parts: string[] = [];
    if (filters.team) {
      parts.push(`チーム: ${selectedTeamLabel}`);
    }
    if (filters.dateFrom) {
      parts.push(`開始日: ${filters.dateFrom}`);
    }
    if (filters.dateTo) {
      parts.push(`終了日: ${filters.dateTo}`);
    }
    return parts.join(" / ");
  }, [
    filters.team,
    filters.dateFrom,
    filters.dateTo,
    hasActiveFilters,
    selectedTeamLabel,
  ]);

  return {
    selectedTeamLabel,
    summaryText,
    hasActiveFilters,
  };
}
