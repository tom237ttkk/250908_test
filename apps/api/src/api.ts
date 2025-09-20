import { Hono } from 'hono';
import type { PrismaClient } from '@prisma/client';

export function createApi(prisma: PrismaClient) {
  const api = new Hono();

  api.get('/videos', async (c) => {
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: 'desc' },
      include: { team: true },
    });
    return c.json({ items: videos });
  });

  api.get('/videos/:id', async (c) => {
    const id = c.req.param('id');
    const video = await prisma.video.findUnique({ where: { id }, include: { team: true } });
    if (!video) return c.json({ message: 'Not Found' }, 404);
    return c.json(video);
  });

  api.get('/teams', async (c) => {
    const teams = await prisma.team.findMany({ orderBy: { name: 'asc' } });
    return c.json({ items: teams });
  });

  return api;
}

