import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import VideoCard from '../VideoCard';
import type { Video } from '../../types';

const mockVideo: Video = {
  id: 'video-1',
  title: 'Arsenal vs City – Highlights',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  videoType: 'youtube',
  thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
  homeTeam: 'Arsenal FC',
  awayTeam: 'Manchester City',
  matchDate: '2024-09-15T15:30:00Z',
  duration: 780,
};

describe('VideoCard', () => {
  it('renders title, matchup, and metadata', () => {
    render(
      <MemoryRouter>
        <VideoCard video={mockVideo} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /Arsenal vs City/i })).toBeInTheDocument();
    expect(screen.getByText(/Arsenal FC vs Manchester City/)).toBeInTheDocument();
    expect(screen.getByText(/YouTube/i)).toBeInTheDocument();
    expect(screen.getByText(/ハイライトを見る/)).toBeInTheDocument();
  });

  it('falls back to placeholder names when team information is missing', () => {
    render(
      <MemoryRouter>
        <VideoCard
          video={{
            ...mockVideo,
            homeTeam: '',
            awayTeam: '',
          }}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText(/ホームチーム未定 vs アウェイチーム未定/)).toBeInTheDocument();
  });
});
