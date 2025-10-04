import { describe, expect, it, vi } from 'vitest';
import { Hono } from 'hono';
import type { PrismaClient } from '@prisma/client';
import { createApi } from '../src/api';

function createPrismaMock(overrides: Partial<PrismaClient> = {}) {
  const base = {
    video: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
    team: {
      findMany: vi.fn(),
    },
  } satisfies Partial<PrismaClient>;

  return Object.assign(base, overrides) as unknown as PrismaClient;
}

describe('createApi routes', () => {
  it('returns serialized video collections', async () => {
    const prisma = createPrismaMock();

    prisma.video.findMany = vi.fn().mockResolvedValue([
      {
        id: 'video-1',
        title: 'Sample',
        videoUrl: 'https://example.com',
        videoType: 'youtube',
        thumbnailUrl: 'https://example.com/thumb.jpg',
        matchDate: new Date('2024-09-15T15:30:00Z'),
        duration: 720,
        homeTeam: { name: 'Arsenal FC' },
        awayTeam: { name: 'Manchester City' },
      },
    ]);

    const app = new Hono();
    app.route('/api', createApi(prisma));

    const response = await app.request('/api/videos');
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.items).toHaveLength(1);
    expect(payload.items[0]).toMatchObject({
      id: 'video-1',
      homeTeam: 'Arsenal FC',
      awayTeam: 'Manchester City',
      matchDate: '2024-09-15T15:30:00.000Z',
    });
  });

  it('returns single video when found and 404 otherwise', async () => {
    const prisma = createPrismaMock();

    prisma.video.findUnique = vi.fn().mockResolvedValueOnce({
      id: 'video-2',
      title: 'Detail',
      videoUrl: 'https://example.com',
      videoType: 'youtube',
      thumbnailUrl: null,
      matchDate: new Date('2024-09-21T12:00:00Z'),
      duration: null,
      homeTeam: { name: 'Liverpool FC' },
      awayTeam: { name: 'Manchester United' },
    });

    const app = new Hono();
    app.route('/api', createApi(prisma));

    const successResponse = await app.request('/api/videos/video-2');
    expect(successResponse.status).toBe(200);
    const successPayload = await successResponse.json();
    expect(successPayload.item.id).toBe('video-2');

    prisma.video.findUnique = vi.fn().mockResolvedValueOnce(null);
    const notFoundResponse = await app.request('/api/videos/missing');
    expect(notFoundResponse.status).toBe(404);
  });

  it('returns team collections', async () => {
    const prisma = createPrismaMock();
    prisma.team.findMany = vi.fn().mockResolvedValue([
      { id: 'team-1', name: 'Arsenal FC', shortName: 'ARS', logoUrl: null },
    ]);

    const app = new Hono();
    app.route('/api', createApi(prisma));

    const response = await app.request('/api/teams');
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.items[0]).toMatchObject({
      id: 'team-1',
      shortName: 'ARS',
    });
  });
});
