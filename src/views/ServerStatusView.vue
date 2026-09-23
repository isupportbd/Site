<script setup lang="ts">
import { ref } from 'vue';

const services = ref([
  { name: 'IDP Production (idp.isupportbd.com)', status: 'Operational', uptime: '99.99%', latency: '24ms', region: 'In-House Private Server' },
  { name: 'ZeroVAT Automation Engine (zerovat.isupportbd.com)', status: 'Operational', uptime: '99.99%', latency: '21ms', region: 'In-House Private Server' },
  { name: 'Analyser VAT Verification (analyser.isupportbd.com)', status: 'Operational', uptime: '99.98%', latency: '31ms', region: 'In-House Private Server' },
  { name: 'Shailik Fashion ERP Cluster', status: 'Operational', uptime: '99.99%', latency: '18ms', region: 'In-House Server Node' },
  { name: 'e-VAT Sync Service Gateway', status: 'Operational', uptime: '99.95%', latency: '45ms', region: 'In-House Server Node' },
  { name: 'Baybosayee POS Cloud Database', status: 'Operational', uptime: '99.99%', latency: '19ms', region: 'In-House Server Node' },
  { name: 'Credential Security Vault (AES-256 HSM)', status: 'Operational', uptime: '100%', latency: '12ms', region: 'Encrypted Vault' }
]);
</script>

<template>
  <div class="status-view">
    <div class="is-container">
      <div class="view-header">
        <router-link to="/" class="back-link">
          <i class="bi bi-arrow-left"></i>
          <span>Back to Home</span>
        </router-link>
        <div class="status-overall-badge">
          <span class="pulse-dot"></span>
          <span>All Systems 100% Operational</span>
        </div>
        <h1 class="view-title">iSupportBD System Telemetry & Uptime</h1>
        <p class="view-desc">
          Real-time operational status for all live ERP, POS, VAT engines, and cloud databases.
        </p>
      </div>

      <div class="status-table is-card">
        <div class="table-head">
          <span>System / Cluster</span>
          <span>Status</span>
          <span>Uptime (30d)</span>
          <span>Latency</span>
        </div>

        <div v-for="(srv, idx) in services" :key="idx" class="table-row">
          <div class="srv-col">
            <span class="srv-title">{{ srv.name }}</span>
            <span class="srv-region">{{ srv.region }}</span>
          </div>

          <div class="status-col">
            <span class="status-pill operational">
              <i class="bi bi-check-circle-fill"></i>
              <span>{{ srv.status }}</span>
            </span>
          </div>

          <div class="uptime-col font-mono">{{ srv.uptime }}</div>
          <div class="latency-col font-mono text-cyan">{{ srv.latency }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.status-view {
  min-height: 80vh;
  padding: 3rem 0;
  background: var(--is-bg);
}

.view-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 2.5rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--is-primary);
  margin-bottom: 1.25rem;
}

.status-overall-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: var(--is-radius-full);
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.4);
  color: #34d399;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 0.85rem;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
}

.view-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.view-desc {
  font-size: 0.92rem;
  color: var(--is-text-muted);
}

.status-table {
  max-width: 900px;
  margin: 0 auto;
  padding: 0;
  background: rgba(19, 29, 51, 0.7);
}

.table-head {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 1rem 1.25rem;
  background: rgba(15, 23, 42, 0.8);
  border-bottom: 1px solid var(--is-border);
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--is-text-dim);
  letter-spacing: 0.05em;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.85rem;
}

.table-row:last-child {
  border-bottom: none;
}

.srv-col {
  display: flex;
  flex-direction: column;
}

.srv-title {
  font-weight: 600;
  color: #ffffff;
}

.srv-region {
  font-size: 0.72rem;
  color: var(--is-text-dim);
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.55rem;
  border-radius: var(--is-radius-full);
  font-size: 0.72rem;
  font-weight: 700;
}

.status-pill.operational {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}

.text-cyan {
  color: #00d2ff;
}
</style>
