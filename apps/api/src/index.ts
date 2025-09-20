import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

app.get('/health', (c) => c.json({ ok: true }));
app.get('/', (c) => c.text('SFL API: up'));

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

