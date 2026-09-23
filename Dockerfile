# ── Stage 1: Build Frontend & Install Dependencies ──────────
FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json bun.lock* ./

# Fast install dependencies
RUN bun install --frozen-lockfile || bun install

COPY . .

# Vue/Vite frontend build -> creates /app/dist
RUN bun run build

# ── Stage 2: Production Runner ──────────────────────────────
FROM oven/bun:latest AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Copy dependencies and source code
COPY --from=builder /app/node_modules ./node_modules
COPY package.json bun.lock* ./
COPY src ./src
COPY tsconfig.json ./

# Copy built Vue 3 frontend
COPY --from=builder /app/dist ./dist

EXPOSE 3001

# Health check for Coolify zero-downtime deployment
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD bun -e "fetch('http://localhost:' + (process.env.PORT || 3001) + '/api/health').then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

CMD ["bun", "src/server/index.ts"]
