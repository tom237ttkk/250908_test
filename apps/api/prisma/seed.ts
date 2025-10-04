import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TEAMS = [
  {
    name: 'Arsenal FC',
    slug: 'arsenal',
    shortName: 'ARS',
    logoUrl: 'https://assets.example.com/badges/ars.png',
  },
  {
    name: 'Manchester City',
    slug: 'manchester-city',
    shortName: 'MCI',
    logoUrl: 'https://assets.example.com/badges/mci.png',
  },
  {
    name: 'Liverpool FC',
    slug: 'liverpool',
    shortName: 'LIV',
    logoUrl: 'https://assets.example.com/badges/liv.png',
  },
  {
    name: 'Manchester United',
    slug: 'manchester-united',
    shortName: 'MUN',
    logoUrl: 'https://assets.example.com/badges/mun.png',
  },
  {
    name: 'Tottenham Hotspur',
    slug: 'tottenham',
    shortName: 'TOT',
    logoUrl: 'https://assets.example.com/badges/tot.png',
  },
  {
    name: 'Chelsea FC',
    slug: 'chelsea',
    shortName: 'CHE',
    logoUrl: 'https://assets.example.com/badges/che.png',
  },
  {
    name: 'Newcastle United',
    slug: 'newcastle',
    shortName: 'NEW',
    logoUrl: 'https://assets.example.com/badges/new.png',
  },
  {
    name: 'Brighton & Hove Albion',
    slug: 'brighton',
    shortName: 'BHA',
    logoUrl: 'https://assets.example.com/badges/bha.png',
  },
];

type VideoSeed = {
  title: string;
  youtubeId: string;
  matchDate: string;
  duration: number;
  homeSlug: string;
  awaySlug: string;
  thumbnailUrl?: string;
};

const VIDEOS: VideoSeed[] = [
  {
    title: 'Arsenal vs Manchester City - Highlights',
    youtubeId: 'dQw4w9WgXcQ',
    matchDate: '2024-09-15T15:30:00Z',
    duration: 780,
    homeSlug: 'arsenal',
    awaySlug: 'manchester-city',
  },
  {
    title: 'Liverpool vs Manchester United - Highlights',
    youtubeId: 'M7lc1UVf-VE',
    matchDate: '2024-09-21T17:45:00Z',
    duration: 820,
    homeSlug: 'liverpool',
    awaySlug: 'manchester-united',
  },
  {
    title: 'Tottenham vs Chelsea - Highlights',
    youtubeId: 'xvFZjo5PgG0',
    matchDate: '2024-09-29T19:15:00Z',
    duration: 740,
    homeSlug: 'tottenham',
    awaySlug: 'chelsea',
  },
  {
    title: 'Newcastle vs Brighton - Highlights',
    youtubeId: 'E7wJTI-1dvQ',
    matchDate: '2024-09-08T13:00:00Z',
    duration: 705,
    homeSlug: 'newcastle',
    awaySlug: 'brighton',
  },
];

function thumbnailFromId(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

async function main() {
  await prisma.video.deleteMany();
  await prisma.team.deleteMany();

  const teamIdBySlug = new Map<string, string>();

  for (const team of TEAMS) {
    const record = await prisma.team.create({
      data: {
        name: team.name,
        slug: team.slug,
        shortName: team.shortName,
        logoUrl: team.logoUrl,
      },
    });

    teamIdBySlug.set(team.slug, record.id);
  }

  for (const video of VIDEOS) {
    const homeTeamId = teamIdBySlug.get(video.homeSlug);
    const awayTeamId = teamIdBySlug.get(video.awaySlug);

    if (!homeTeamId || !awayTeamId) {
      console.warn(`Skipping video seed because team is missing: ${video.title}`);
      continue;
    }

    await prisma.video.create({
      data: {
        title: video.title,
        videoUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
        videoType: 'youtube',
        thumbnailUrl: video.thumbnailUrl ?? thumbnailFromId(video.youtubeId),
        matchDate: new Date(video.matchDate),
        duration: video.duration,
        homeTeamId,
        awayTeamId,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
