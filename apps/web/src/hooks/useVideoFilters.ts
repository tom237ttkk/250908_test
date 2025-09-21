import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { VideoFilters } from '../types';
import {
  createVideoFilterSearchParams,
  hasActiveVideoFilters,
  parseVideoFiltersFromSearchParams,
  sanitizeVideoFilters,
} from '../lib/video-utils';

export interface UseVideoFiltersState {
  filters: VideoFilters;
  hasActiveFilters: boolean;
  setFilters: (filters: VideoFilters) => void;
  resetFilters: () => void;
}

export function useVideoFiltersState(): UseVideoFiltersState {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = parseVideoFiltersFromSearchParams(searchParams);

  const setFilters = useCallback(
    (nextFilters: VideoFilters) => {
      const sanitized = sanitizeVideoFilters(nextFilters);
      const params = createVideoFilterSearchParams(sanitized);
      setSearchParams(params);
    },
    [setSearchParams],
  );

  const resetFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const hasActive = useMemo(() => hasActiveVideoFilters(filters), [filters]);

  return {
    filters,
    hasActiveFilters: hasActive,
    setFilters,
    resetFilters,
  };
}
