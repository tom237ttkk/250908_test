import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const teams = [
    { name: 'Golden State Warriors', slug: 'warriors' },
    { name: 'Los Angeles Lakers', slug: 'lakers' },
  ];

  for (const t of teams) {
    await prisma.team.upsert({
      where: { slug: t.slug },
      update: {},
      create: t,
    });
  }

  const war = await prisma.team.findUnique({ where: { slug: 'warriors' } });
  const lak = await prisma.team.findUnique({ where: { slug: 'lakers' } });

  const videos = [
    {
      title: 'Warriors Highlights 1',
      youtubeId: 'vid_war_1',
      url: 'https://www.youtube.com/watch?v=vid_war_1',
      teamId: war?.id,
    },
    {
      title: 'Lakers Highlights 1',
      youtubeId: 'vid_lak_1',
      url: 'https://www.youtube.com/watch?v=vid_lak_1',
      teamId: lak?.id,
    },
  ];

  for (const v of videos) {
    await prisma.video.upsert({
      where: { youtubeId: v.youtubeId },
      update: {},
      create: v,
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

