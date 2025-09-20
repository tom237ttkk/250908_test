import 'dotenv/config';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { PrismaClient } from '@prisma/client';

const app = new Hono();
const prisma = new PrismaClient();

app.get('/health', (c) => c.json({ ok: true }));
app.get('/', (c) => c.text('SFL API: up'));
app.get('/health/db', async (c) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return c.json({ db: 'up' });
  } catch (e) {
    return c.json({ db: 'down', error: String(e) }, 500);
  }
});

const port = Number(process.env.PORT || 8787);

if ((globalThis as any).Bun) {
  // Bun runtime
  (globalThis as any).Bun.serve({
    port,
    fetch: app.fetch,
  });
  console.log(`[bun] listening on http://localhost:${port}`);
} else {
  // Node runtime
  serve({ fetch: app.fetch, port });
  console.log(`[node] listening on http://localhost:${port}`);
}
