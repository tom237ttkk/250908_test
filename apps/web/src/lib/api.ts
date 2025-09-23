import type { Team, Video, VideoFilters } from '../types';
import { createVideoFilterSearchParams } from './video-utils';

type CollectionResponse<T> = {
  items: T[];
  totalCount?: number;
};

type SingleResponse<T> = T | { item?: T | null } | { data?: T | null };

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
    response = await fetch(endpoint, {
      ...init,
    });
  } catch (error) {
    throw new ApiError('Network request failed.', 0);
  }

  if (!response.ok) {
    const message = await extractErrorMessage(response);
    throw new ApiError(message, response.status);
  }

  return (await response.json()) as T;
}

function toCollectionItems<T>(data: CollectionResponse<T> | T[]): T[] {
  if (Array.isArray(data)) {
    return data;
  }
  if (Array.isArray(data?.items)) {
    return data.items;
  }
  return [];
}

function toSingleItem<T>(data: SingleResponse<T>): T {
  if (data && typeof data === 'object') {
    const withItem = (data as { item?: T | null }).item;
    if (withItem) {
      return withItem;
    }

    const withData = (data as { data?: T | null }).data;
    if (withData) {
      return withData;
    }
  }

  return data as T;
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

export async function fetchVideos(
  filters?: VideoFilters,
  init?: RequestInit,
): Promise<Video[]> {
  const params = createVideoFilterSearchParams(filters);
  const query = params.toString();
  const suffix = query.length > 0 ? `?${query}` : '';

  const payload = await request<CollectionResponse<Video> | Video[]>(
    `${ROUTES.videos}${suffix}`,
    init,
  );
  return toCollectionItems(payload);
}

export async function fetchVideoById(id: string, init?: RequestInit): Promise<Video> {
  const payload = await request<SingleResponse<Video>>(ROUTES.videoById(id), init);
  return toSingleItem(payload);
}

export async function fetchTeams(init?: RequestInit): Promise<Team[]> {
  const payload = await request<CollectionResponse<Team> | Team[]>(ROUTES.teams, init);
  return toCollectionItems(payload);
}
