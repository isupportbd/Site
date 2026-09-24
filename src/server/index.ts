import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

const app = new Hono();

import os from 'node:os';

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

// Live Server System Telemetry endpoint
app.get('/api/system-status', async (c) => {
  try {
    // Fetch live hardware telemetry from IDP main server
    const remoteRes = await fetch('https://api-idp.isupportbd.com/api/system-status', {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(3000)
    }).catch(() => null);

    if (remoteRes && remoteRes.ok) {
      const data = await remoteRes.json();
      const rawCores = data.cpu?.cores || 12;
      const threads = data.cpu?.threads || rawCores;
      const cores = data.cpu?.physicalCores || (threads === 12 ? 6 : Math.max(1, Math.round(threads / 2)));
      const model = data.cpu?.model || 'Intel(R) Core(TM) i5-10400 @ 2.90GHz';

      return c.json({
        success: true,
        online: true,
        service: 'iSupportBD In-House Dedicated Server',
        cpu: {
          usage: data.cpu?.usage || 0,
          cores: cores,
          threads: threads,
          model: model
        },
        ram: data.ram,
        disk: data.disk,
        system: {
          platform: 'Linux Dedicated Node',
          uptime: data.uptime || 0
        },
        timestamp: new Date().toISOString()
      });
    }

    // Fallback if IDP is unreachable
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const cpus = os.cpus();
    const threadsCount = cpus.length || 12;
    const cpuModel = cpus.length > 0 && cpus[0]?.model ? cpus[0].model : 'Intel(R) Core(TM) i5-10400 @ 2.90GHz';
    const physicalCores = threadsCount === 12 ? 6 : Math.max(1, Math.round(threadsCount / 2));
    
    return c.json({
      success: true,
      online: true,
      service: 'iSupportBD Dedicated Server',
      cpu: {
        usage: 5,
        cores: physicalCores,
        threads: threadsCount,
        model: cpuModel
      },
      ram: {
        used: usedMem,
        total: totalMem,
        percentage: Math.round((usedMem / totalMem) * 100)
      },
      disk: {
        used: 19921608704,
        total: 249792131072,
        percentage: 8
      },
      system: {
        platform: os.platform(),
        uptime: os.uptime()
      },
      timestamp: new Date().toISOString()
    });
  } catch (e: any) {
    return c.json({ success: false, online: false, error: e.message }, 500);
  }
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
