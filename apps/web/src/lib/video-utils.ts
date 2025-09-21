import type { Video, VideoFilters, VideoProvider } from '../types';

const YOUTUBE_ID_PATTERN =
  /(?:youtube\.com\/watch\?v=|youtu\.be\/)([0-9A-Za-z_-]{11})/;
const VIMEO_ID_PATTERN = /vimeo\.com\/(\d+)/;

export function extractVideoId(url: string, provider: VideoProvider): string | null {
  const trimmed = url.trim();

  if (provider === 'youtube') {
    const match = trimmed.match(YOUTUBE_ID_PATTERN);
    return match?.[1] ?? null;
  }

  if (provider === 'vimeo') {
    const match = trimmed.match(VIMEO_ID_PATTERN);
    return match?.[1] ?? null;
  }

  return trimmed.length > 0 ? trimmed : null;
}

export function createEmbedUrl(
  video: Pick<Video, 'videoUrl' | 'videoType'>,
  options: { autoplay?: boolean } = {},
): string {
  const { autoplay = false } = options;
  const videoId = extractVideoId(video.videoUrl, video.videoType);

  if (!videoId) {
    return video.videoUrl;
  }

  const autoplayParam = autoplay ? '?autoplay=1' : '';

  switch (video.videoType) {
    case 'youtube':
      return `https://www.youtube-nocookie.com/embed/${videoId}${autoplayParam}`;
    case 'vimeo':
      return `https://player.vimeo.com/video/${videoId}${autoplayParam}`;
    default:
      return videoId;
  }
}

export function formatMatchDate(matchDate: string): string {
  const date = new Date(matchDate);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function formatDuration(durationSeconds?: number): string {
  if (!durationSeconds || durationSeconds <= 0) {
    return '';
  }

  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);
  const seconds = Math.floor(durationSeconds % 60);

  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');

  if (hours > 0) {
    const paddedHours = hours.toString().padStart(2, '0');
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  }

  return `${paddedMinutes}:${paddedSeconds}`;
}

export function createVideoFilterSearchParams(filters: VideoFilters = {}): URLSearchParams {
  const sanitized = sanitizeVideoFilters(filters);
  const params = new URLSearchParams();

  if (sanitized.team) {
    params.set('team', sanitized.team);
  }
  if (sanitized.dateFrom) {
    params.set('dateFrom', sanitized.dateFrom);
  }
  if (sanitized.dateTo) {
    params.set('dateTo', sanitized.dateTo);
  }

  return params;
}

export function sanitizeVideoFilters(filters: VideoFilters = {}): VideoFilters {
  const sanitized: VideoFilters = {};

  if (filters.team?.trim()) {
    sanitized.team = filters.team.trim();
  }
  if (filters.dateFrom?.trim()) {
    sanitized.dateFrom = filters.dateFrom.trim();
  }
  if (filters.dateTo?.trim()) {
    sanitized.dateTo = filters.dateTo.trim();
  }

  return sanitized;
}

export function parseVideoFiltersFromSearchParams(params: URLSearchParams): VideoFilters {
  return sanitizeVideoFilters({
    team: params.get('team') ?? undefined,
    dateFrom: params.get('dateFrom') ?? undefined,
    dateTo: params.get('dateTo') ?? undefined,
  });
}

export function hasActiveVideoFilters(filters: VideoFilters = {}): boolean {
  const sanitized = sanitizeVideoFilters(filters);
  return Boolean(sanitized.team || sanitized.dateFrom || sanitized.dateTo);
}
