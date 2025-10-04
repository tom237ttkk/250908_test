import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchVideos } from "../lib/api";
import { createVideoFilterSearchParams } from "../lib/video-utils";
import type { Video, VideoFilters } from "../types";

interface UseVideosState {
  videos: Video[];
  loading: boolean;
  error: string | null;
}

export interface UseVideosResult extends UseVideosState {
  refetch: () => Promise<void>;
}

interface UseVideosOptions {
  useCache?: boolean;
}

const CACHE_TTL_MS = 1000 * 60 * 5;

type CacheEntry = {
  videos: Video[];
  timestamp: number;
};

const videoCache = new Map<string, CacheEntry>();

function createCacheKey(filters?: VideoFilters): string {
  const params = createVideoFilterSearchParams(filters ?? {});
  return params.toString();
}

function readCache(key: string): CacheEntry | undefined {
  const entry = videoCache.get(key);
  if (!entry) {
    return undefined;
  }
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    videoCache.delete(key);
    return undefined;
  }
  return entry;
}

export function useVideos(
  filters?: VideoFilters,
  options: UseVideosOptions = {}
): UseVideosResult {
  const [state, setState] = useState<UseVideosState>({
    videos: [],
    loading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const useCache = options.useCache ?? true;
  const cacheKey = useMemo(() => createCacheKey(filters), [filters]);

  const applyCache = useCallback(() => {
    if (!useCache) {
      return false;
    }
    const cached = readCache(cacheKey);
    if (cached) {
      setState({ videos: cached.videos, loading: false, error: null });
      return true;
    }
    return false;
  }, [cacheKey, useCache]);

  const executeFetch = useCallback(
    async (force = false) => {
      if (!force && applyCache()) {
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
        const videos = await fetchVideos(filters, {
          signal: controller.signal,
        });
        if (useCache) {
          const entry: CacheEntry = { videos, timestamp: Date.now() };
          videoCache.set(cacheKey, entry);
        }
        setState({ videos, loading: false, error: null });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        const fallback = "動画の取得に失敗しました。";
        const message = error instanceof Error ? error.message : fallback;
        const localizedMessage =
          message === "Network request failed." ? fallback : message;

        setState({ videos: [], loading: false, error: localizedMessage });
      }
    },
    [applyCache, cacheKey, filters, useCache]
  );

  useEffect(() => {
    void executeFetch();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [executeFetch]);

  const refetch = useCallback(async () => {
    await executeFetch(true);
  }, [executeFetch]);

  return { ...state, refetch };
}
