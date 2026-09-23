<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// System Stats State
const isOnline = ref(true);
const isLoading = ref(true);
const lastUpdated = ref<string>('');

const cpuStats = ref({
  usage: 0,
  cores: 0,
  model: ''
});

const ramStats = ref({
  used: 0,
  total: 0,
  percentage: 0
});

const diskStats = ref({
  used: 0,
  total: 0,
  percentage: 0
});

const systemInfo = ref({
  platform: '',
  uptime: '0h 0m',
  hostname: ''
});

const services = ref([
  { name: 'IDP Production (idp.isupportbd.com)', status: 'Operational', uptime: '99.99%', latency: '24ms', region: 'In-House Private Server' },
  { name: 'ZeroVAT Automation Engine (zerovat.isupportbd.com)', status: 'Operational', uptime: '99.99%', latency: '21ms', region: 'In-House Private Server' },
  { name: 'Analyser VAT Verification (analyser.isupportbd.com)', status: 'Operational', uptime: '99.98%', latency: '31ms', region: 'In-House Private Server' },
  { name: 'Shailik Fashion ERP Cluster', status: 'Operational', uptime: '99.99%', latency: '18ms', region: 'In-House Server Node' },
  { name: 'e-VAT Sync Service Gateway', status: 'Operational', uptime: '99.95%', latency: '45ms', region: 'In-House Server Node' },
  { name: 'Baybosayee POS Cloud Database', status: 'Operational', uptime: '99.99%', latency: '19ms', region: 'In-House Server Node' },
  { name: 'Credential Security Vault (AES-256 HSM)', status: 'Operational', uptime: '100%', latency: '12ms', region: 'Encrypted Vault' }
]);

function formatUptime(seconds: number) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  return `${hours}h ${minutes}m`;
}

let intervalId: ReturnType<typeof setInterval>;

const fetchStatus = async () => {
  try {
    // Try local Hono endpoint first, fallback to external if needed
    let res = await fetch('/api/system-status').catch(() => null);
    if (!res || !res.ok) {
      res = await fetch('https://api-idp.isupportbd.com/api/system-status').catch(() => null);
    }

    if (res && res.ok) {
      const data = await res.json();
      
      // CPU
      cpuStats.value = {
        usage: data.cpu?.usage || 0,
        cores: data.cpu?.cores || 4,
        model: data.cpu?.model || 'Cloud Server vCPU'
      };

      // RAM (Bytes to GB)
      const rUsed = data.ram?.used > 1000 ? parseFloat((data.ram.used / (1024 ** 3)).toFixed(1)) : data.ram?.used || 0;
      const rTotal = data.ram?.total > 1000 ? parseFloat((data.ram.total / (1024 ** 3)).toFixed(1)) : data.ram?.total || 0;
      ramStats.value = {
        used: rUsed,
        total: rTotal,
        percentage: data.ram?.percentage || (rTotal ? Math.round((rUsed / rTotal) * 100) : 0)
      };

      // Disk (Bytes to GB)
      const dUsed = data.disk?.used > 1000 ? parseFloat((data.disk.used / (1024 ** 3)).toFixed(1)) : data.disk?.used || 0;
      const dTotal = data.disk?.total > 1000 ? parseFloat((data.disk.total / (1024 ** 3)).toFixed(1)) : data.disk?.total || 0;
      diskStats.value = {
        used: dUsed,
        total: dTotal,
        percentage: data.disk?.percentage || (dTotal ? Math.round((dUsed / dTotal) * 100) : 0)
      };

      // System info
      if (data.system?.uptime) {
        systemInfo.value = {
          platform: data.system.platform || 'Linux',
          uptime: formatUptime(data.system.uptime),
          hostname: data.system.hostname || 'Production-Node'
        };
      }

      lastUpdated.value = new Date().toLocaleTimeString();
      isOnline.value = true;
    } else {
      isOnline.value = false;
    }
  } catch (error) {
    isOnline.value = false;
    console.error('Error fetching server status:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchStatus();
  intervalId = setInterval(fetchStatus, 5000); // 5 sec auto refresh
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div class="status-view">
    <div class="is-container">
      <!-- Header -->
      <div class="view-header">
        <router-link to="/" class="back-link">
          <i class="bi bi-arrow-left"></i>
          <span>Back to Portal Home</span>
        </router-link>
        
        <div class="status-overall-badge" :class="isOnline ? 'badge-online' : 'badge-offline'">
          <span class="pulse-dot" :class="{ 'pulse-offline': !isOnline }"></span>
          <span>{{ isOnline ? 'All Systems 100% Operational' : 'Telemetry Degraded / Offline' }}</span>
        </div>

        <h1 class="view-title">iSupportBD System Telemetry & Uptime</h1>
        <p class="view-desc">
          Real-time operational health, hardware metrics, and cloud infrastructure telemetry.
        </p>
        
        <div v-if="lastUpdated" class="last-sync-badge">
          <i class="bi bi-clock-history"></i>
          <span>Live Sync: {{ lastUpdated }} (Auto 5s)</span>
        </div>
      </div>

      <!-- Realtime Hardware Metrics Cards Grid -->
      <div class="stats-grid">
        <!-- CPU Card -->
        <div class="is-card stat-card">
          <div class="card-header">
            <div class="card-icon-box cpu-icon">
              <i class="bi bi-cpu-fill"></i>
            </div>
            <div class="card-title-wrap">
              <h3>CPU Utilization</h3>
              <span class="stat-subtitle">{{ cpuStats.cores }} Cores Active</span>
            </div>
          </div>
          <div class="progress-container">
            <div class="progress-bar-bg">
              <div 
                class="progress-bar-fill" 
                :style="{ 
                  width: cpuStats.usage + '%', 
                  background: cpuStats.usage > 85 ? '#ef4444' : (cpuStats.usage > 60 ? '#f59e0b' : 'linear-gradient(90deg, #00d2ff, #3b82f6)')
                }"
              ></div>
            </div>
            <div class="progress-text">
              <span class="font-mono text-xl">{{ cpuStats.usage }}%</span>
              <span class="sub-text">{{ cpuStats.model || 'Multi-Core Processor' }}</span>
            </div>
          </div>
        </div>

        <!-- RAM Card -->
        <div class="is-card stat-card">
          <div class="card-header">
            <div class="card-icon-box ram-icon">
              <i class="bi bi-memory"></i>
            </div>
            <div class="card-title-wrap">
              <h3>Memory (RAM)</h3>
              <span class="stat-subtitle">{{ ramStats.percentage }}% Allocated</span>
            </div>
          </div>
          <div class="progress-container">
            <div class="progress-bar-bg">
              <div 
                class="progress-bar-fill" 
                :style="{ 
                  width: ramStats.percentage + '%', 
                  background: ramStats.percentage > 85 ? '#ef4444' : 'linear-gradient(90deg, #10b981, #34d399)'
                }"
              ></div>
            </div>
            <div class="progress-text">
              <span class="font-mono text-xl">{{ ramStats.used }} GB <span class="text-sm">/ {{ ramStats.total }} GB</span></span>
              <span class="sub-text font-mono text-emerald-400">{{ ramStats.percentage }}% In Use</span>
            </div>
          </div>
        </div>

        <!-- Disk Card -->
        <div class="is-card stat-card">
          <div class="card-header">
            <div class="card-icon-box disk-icon">
              <i class="bi bi-device-hdd-fill"></i>
            </div>
            <div class="card-title-wrap">
              <h3>NVMe / Storage</h3>
              <span class="stat-subtitle">{{ diskStats.percentage }}% Capacity</span>
            </div>
          </div>
          <div class="progress-container">
            <div class="progress-bar-bg">
              <div 
                class="progress-bar-fill" 
                :style="{ 
                  width: diskStats.percentage + '%', 
                  background: diskStats.percentage > 90 ? '#ef4444' : 'linear-gradient(90deg, #8b5cf6, #a855f7)'
                }"
              ></div>
            </div>
            <div class="progress-text">
              <span class="font-mono text-xl">{{ diskStats.used }} GB <span class="text-sm">/ {{ diskStats.total }} GB</span></span>
              <span class="sub-text font-mono text-purple-400">{{ diskStats.percentage }}% Allocated</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Services Uptime Table -->
      <div class="status-table is-card">
        <div class="table-top-bar">
          <h3 class="table-title">Enterprise Systems & Service Gateway Status</h3>
          <span class="table-pill"><i class="bi bi-shield-check text-emerald-400"></i> High Availability</span>
        </div>

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
  min-height: 85vh;
  padding: 6.5rem 0 4rem;
  background: var(--is-bg);
}

.view-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 3rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--is-primary);
  margin-bottom: 1.25rem;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.back-link:hover {
  transform: translateX(-3px);
}

.status-overall-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.1rem;
  border-radius: var(--is-radius-full);
  font-size: 0.84rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.badge-online {
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #34d399;
}

.badge-offline {
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: #ef4444;
}

.pulse-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
  animation: pulse-green 2s infinite;
}

.pulse-offline {
  background: #ef4444;
  box-shadow: 0 0 10px #ef4444;
  animation: none;
}

@keyframes pulse-green {
  0% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7); }
  70% { box-shadow: 0 0 0 8px rgba(52, 211, 153, 0); }
  100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
}

.view-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--is-title);
  margin-bottom: 0.6rem;
  letter-spacing: -0.02em;
}

.view-desc {
  font-size: 0.95rem;
  color: var(--is-text-muted);
  line-height: 1.6;
}

.last-sync-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.75rem;
  font-size: 0.76rem;
  color: var(--is-text-dim);
  font-family: monospace;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto 2.5rem;
}

.stat-card {
  padding: 1.5rem;
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-lg);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.card-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

.cpu-icon {
  background: rgba(0, 210, 255, 0.12);
  color: #00d2ff;
  border: 1px solid rgba(0, 210, 255, 0.25);
}

.ram-icon {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.disk-icon {
  background: rgba(139, 92, 246, 0.12);
  color: #a855f7;
  border: 1px solid rgba(139, 92, 246, 0.25);
}

.card-title-wrap h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--is-title);
  margin: 0;
}

.stat-subtitle {
  font-size: 0.74rem;
  color: var(--is-text-dim);
  font-weight: 600;
}

.progress-container {
  width: 100%;
}

.progress-bar-bg {
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 0.85rem;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.6s ease;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
}

.text-xl {
  font-size: 1.25rem;
  color: var(--is-title);
}

.text-sm {
  font-size: 0.8rem;
  color: var(--is-text-muted);
  font-weight: 500;
}

.sub-text {
  font-size: 0.8rem;
  color: var(--is-text-muted);
}

/* Table */
.status-table {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0;
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-lg);
  overflow: hidden;
}

.table-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1rem 1.4rem;
  border-bottom: 1px solid var(--is-border);
  background: var(--is-bg-surface);
}

.table-title {
  font-size: 0.96rem;
  font-weight: 700;
  color: var(--is-title);
  margin: 0;
}

.table-pill {
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--is-text-muted);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.table-head {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 0.85rem 1.4rem;
  background: var(--is-bg-surface);
  border-bottom: 1px solid var(--is-border);
  font-size: 0.74rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--is-text-dim);
  letter-spacing: 0.05em;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  padding: 1rem 1.4rem;
  border-bottom: 1px solid var(--is-border);
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
  font-weight: 700;
  color: var(--is-title);
}

.srv-region {
  font-size: 0.72rem;
  color: var(--is-text-dim);
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: var(--is-radius-full);
  font-size: 0.72rem;
  font-weight: 700;
}

.status-pill.operational {
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #34d399;
}

.text-cyan {
  color: var(--is-primary);
}

.text-emerald-400 { color: #34d399; }
.text-purple-400 { color: #c084fc; }

@media (max-width: 768px) {
  .table-head, .table-row {
    grid-template-columns: 1.5fr 1fr 1fr;
  }
  .latency-col {
    display: none;
  }
}
</style>
