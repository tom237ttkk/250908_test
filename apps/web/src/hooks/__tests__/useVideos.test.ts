import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useVideos } from '../useVideos';
import type { Video } from '../../types';

const sampleVideos: Video[] = [
  {
    id: 'sample-id',
    title: 'Sample Highlight',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoType: 'youtube',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    homeTeam: 'Arsenal FC',
    awayTeam: 'Manchester City',
    matchDate: '2024-09-15T15:30:00Z',
    duration: 720,
  },
];

describe('useVideos', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetches videos on mount and updates state', async () => {
    const mockResponse = {
      ok: true,
      json: async () => sampleVideos,
    } as Response;

    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useVideos());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.videos).toHaveLength(1);
    expect(fetch).toHaveBeenCalledWith('/api/videos', expect.any(Object));
  });

  it('handles fetch errors gracefully', async () => {
    const error = new Error('network');
    (fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useVideos());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('動画の取得に失敗しました。');
    expect(result.current.videos).toHaveLength(0);
  });
});
