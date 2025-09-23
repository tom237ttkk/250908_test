import { Hono } from 'hono';
import type { Prisma, PrismaClient, Team } from '@prisma/client';

type VideoWithTeams = Prisma.VideoGetPayload<{
  include: {
    homeTeam: true;
    awayTeam: true;
  };
}>;

function serializeVideo(video: VideoWithTeams) {
  return {
    id: video.id,
    title: video.title,
    videoUrl: video.videoUrl,
    videoType: video.videoType,
    thumbnailUrl: video.thumbnailUrl,
    matchDate: video.matchDate.toISOString(),
    duration: video.duration ?? undefined,
    homeTeam: video.homeTeam?.name ?? '',
    awayTeam: video.awayTeam?.name ?? '',
  };
}

function serializeTeam(team: Team) {
  return {
    id: team.id,
    name: team.name,
    shortName: team.shortName,
    logoUrl: team.logoUrl ?? undefined,
  };
}

export function createApi(prisma: PrismaClient) {
  const api = new Hono();

  api.get('/videos', async (c) => {
    const videos = await prisma.video.findMany({
      orderBy: { matchDate: 'desc' },
      include: {
        homeTeam: true,
        awayTeam: true,
      },
    });

    return c.json({ items: videos.map(serializeVideo) });
  });

  api.get('/videos/:id', async (c) => {
    const id = c.req.param('id');
    const video = await prisma.video.findUnique({
      where: { id },
      include: { homeTeam: true, awayTeam: true },
    });

    if (!video) {
      return c.json({ message: 'Not Found' }, 404);
    }

    return c.json({ item: serializeVideo(video) });
  });

  api.get('/teams', async (c) => {
    const teams = await prisma.team.findMany({ orderBy: { name: 'asc' } });
    return c.json({ items: teams.map(serializeTeam) });
  });

  return api;
}
