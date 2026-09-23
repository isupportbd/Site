import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

const app = new Hono();

// Health check endpoint
app.get('/health', (c) => c.json({ status: 'ok' }));
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    service: 'iSupportBD Site V2 Backend',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Contact / Demo request endpoint
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json();
    return c.json({
      success: true,
      message: 'Demo inquiry received successfully',
      data: body
    });
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 400);
  }
});

// Serve frontend build static files
app.use('/*', serveStatic({ root: './dist' }));
app.get('*', serveStatic({ path: './dist/index.html' }));

const port = Number(process.env.PORT) || 3001;
console.log(`🚀 iSupportBD Site V2 running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch
};
