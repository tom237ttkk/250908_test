export type VideoProvider = 'youtube' | 'vimeo' | 'direct';

export interface Video {
  id: string;
  title: string;
  videoUrl: string;
  videoType: VideoProvider;
  thumbnailUrl?: string;
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  duration?: number;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logoUrl?: string;
}

export interface VideoFilters {
  team?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface VideoPlayerProps {
  video: Video;
  autoplay?: boolean;
}
