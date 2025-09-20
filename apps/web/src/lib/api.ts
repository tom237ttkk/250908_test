import type { Team, Video, VideoFilters } from '../types';
import { createVideoFilterSearchParams } from './video-utils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

const ROUTES = {
  videos: '/api/videos',
  videoById: (id: string) => `/api/videos/${id}`,
  teams: '/api/teams',
} as const;

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const endpoint = `${API_BASE_URL}${path}`;

  let response: Response;
  try {
    response = await fetch(endpoint, init);
  } catch (error) {
    throw new ApiError('Network request failed.', 0);
  }

  if (!response.ok) {
    const message = await extractErrorMessage(response);
    throw new ApiError(message, response.status);
  }

  return (await response.json()) as T;
}

async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { message?: string };
    if (typeof body?.message === 'string' && body.message.length > 0) {
      return body.message;
    }
  } catch (error) {
    // ignore JSON parse errors and fallback to status text
  }
  return response.statusText || 'Unexpected error occurred.';
}

export async function fetchVideos(filters?: VideoFilters): Promise<Video[]> {
  const params = createVideoFilterSearchParams(filters);
  const query = params.toString();
  const suffix = query.length > 0 ? `?${query}` : '';

  return request<Video[]>(`${ROUTES.videos}${suffix}`);
}

export async function fetchVideoById(id: string): Promise<Video> {
  return request<Video>(ROUTES.videoById(id));
}

export async function fetchTeams(): Promise<Team[]> {
  return request<Team[]>(ROUTES.teams);
}
