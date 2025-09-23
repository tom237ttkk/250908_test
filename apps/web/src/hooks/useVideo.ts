import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchVideoById } from '../lib/api';
import type { Video } from '../types';

interface UseVideoState {
  video: Video | null;
  loading: boolean;
  error: string | null;
}

export interface UseVideoResult extends UseVideoState {
  refetch: () => Promise<void>;
}

export function useVideo(id?: string): UseVideoResult {
  const [state, setState] = useState<UseVideoState>({
    video: null,
    loading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const loadVideo = useCallback(async () => {
    if (!id) {
      setState({ video: null, loading: false, error: null });
      return;
    }

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }));

    try {
      const video = await fetchVideoById(id, { signal: controller.signal });
      setState({ video, loading: false, error: null });
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }

      const message = error instanceof Error ? error.message : '動画の取得に失敗しました。';
      setState({ video: null, loading: false, error: message });
    }
  }, [id]);

  useEffect(() => {
    void loadVideo();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [loadVideo]);

  const refetch = useCallback(async () => {
    await loadVideo();
  }, [loadVideo]);

  return { ...state, refetch };
}
