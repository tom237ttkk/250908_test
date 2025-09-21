import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchTeams } from '../lib/api';
import type { Team } from '../types';

interface UseTeamsState {
  teams: Team[];
  loading: boolean;
  error: string | null;
}

export interface UseTeamsResult extends UseTeamsState {
  refetch: () => Promise<void>;
}

export function useTeams(): UseTeamsResult {
  const [state, setState] = useState<UseTeamsState>({
    teams: [],
    loading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }));

    try {
      const teams = await fetchTeams({ signal: controller.signal });
      setState({ teams, loading: false, error: null });
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }

      const message = error instanceof Error ? error.message : 'チーム情報の取得に失敗しました。';
      setState({ teams: [], loading: false, error: message });
    }
  }, []);

  useEffect(() => {
    void execute();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [execute]);

  const refetch = useCallback(async () => {
    await execute();
  }, [execute]);

  return { ...state, refetch };
}
