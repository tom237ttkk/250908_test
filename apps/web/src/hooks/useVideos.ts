import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchVideos } from '../lib/api';
import type { Video, VideoFilters } from '../types';

interface UseVideosState {
  videos: Video[];
  loading: boolean;
  error: string | null;
}

export interface UseVideosResult extends UseVideosState {
  refetch: () => Promise<void>;
}

export function useVideos(filters?: VideoFilters): UseVideosResult {
  const [state, setState] = useState<UseVideosState>({
    videos: [],
    loading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const executeFetch = useCallback(async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }));

    try {
      const videos = await fetchVideos(filters, { signal: controller.signal });
      setState({ videos, loading: false, error: null });
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }

      const fallback = '動画の取得に失敗しました。';
      const message = error instanceof Error ? error.message : fallback;
      const localizedMessage = message === 'Network request failed.' ? fallback : message;

      setState({ videos: [], loading: false, error: localizedMessage });
    }
  }, [filters]);

  useEffect(() => {
    void executeFetch();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [executeFetch]);

  const refetch = useCallback(async () => {
    await executeFetch();
  }, [executeFetch]);

  return { ...state, refetch };
}
