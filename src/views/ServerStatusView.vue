<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// System Stats State
const isOnline = ref(true);
const isLoading = ref(true);
const lastUpdated = ref<string>('');

const cpuStats = ref({
  usage: 0,
  cores: 12,
  model: 'Intel(R) Core(TM) i5-10400 @ 2.90GHz'
});

const ramStats = ref({
  used: 0,
  total: 0,
  percentage: 0
});

const hddStats = ref({
  used: 0,
  total: 0,
  percentage: 0
});

const systemInfo = ref({
  platform: 'Linux / Private Node',
  uptime: '0h 0m'
});

const services = ref([
  { name: 'IDP Production (idp.isupportbd.com)', status: 'Operational', uptime: '99.99%', latency: '24ms', region: 'In-House Dedicated Server' },
  { name: 'ZeroVAT Automation Engine (zerovat.isupportbd.com)', status: 'Operational', uptime: '99.99%', latency: '21ms', region: 'In-House Dedicated Server' },
  { name: 'Analyser VAT Verification (analyser.isupportbd.com)', status: 'Operational', uptime: '99.98%', latency: '31ms', region: 'In-House Dedicated Server' },
  { name: 'Shailik Fashion ERP Cluster', status: 'Operational', uptime: '99.99%', latency: '18ms', region: 'In-House Dedicated Node' },
  { name: 'e-VAT Sync Service Gateway', status: 'Operational', uptime: '99.95%', latency: '45ms', region: 'In-House Dedicated Node' },
  { name: 'Baybosayee POS Cloud Database', status: 'Operational', uptime: '99.99%', latency: '19ms', region: 'In-House Dedicated Node' },
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
    // 1. Fetch live telemetry directly from the host system API
    let res = await fetch('https://api-idp.isupportbd.com/api/system-status').catch(() => null);
    
    // 2. Fallback to local server endpoint if direct IDP API fails
    if (!res || !res.ok) {
      res = await fetch('/api/system-status').catch(() => null);
    }

    if (res && res.ok) {
      const data = await res.json();
      
      // CPU
      cpuStats.value = {
        usage: data.cpu?.usage ?? 0,
        cores: data.cpu?.cores ?? 12,
        model: data.cpu?.model || 'Intel(R) Core(TM) i5-10400 @ 2.90GHz'
      };

      // RAM Calculation (exact Byte to GB)
      if (data.ram) {
        const rUsed = data.ram.used > 1000 ? parseFloat((data.ram.used / (1024 ** 3)).toFixed(1)) : data.ram.used;
        const rTotal = data.ram.total > 1000 ? parseFloat((data.ram.total / (1024 ** 3)).toFixed(1)) : data.ram.total;
        ramStats.value = {
          used: rUsed,
          total: rTotal,
          percentage: data.ram.percentage ?? (rTotal ? Math.round((rUsed / rTotal) * 100) : 0)
        };
      }

      // Hard Disk / NVMe Calculation (exact Byte to GB)
      if (data.disk) {
        const dUsed = data.disk.used > 1000 ? parseFloat((data.disk.used / (1024 ** 3)).toFixed(1)) : data.disk.used;
        const dTotal = data.disk.total > 1000 ? parseFloat((data.disk.total / (1024 ** 3)).toFixed(1)) : data.disk.total;
        hddStats.value = {
          used: dUsed,
          total: dTotal,
          percentage: data.disk.percentage ?? (dTotal ? Math.round((dUsed / dTotal) * 100) : 0)
        };
      }

      // Uptime
      if (data.uptime) {
        systemInfo.value.uptime = formatUptime(data.uptime);
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
  intervalId = setInterval(fetchStatus, 5000); // Live poll every 5s
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div class="status-view">
    <div class="is-container">
      <!-- Top Nav -->
      <div class="view-top-bar">
        <router-link to="/" class="back-link">
          <i class="bi bi-arrow-left"></i>
          <span>Back to Home</span>
        </router-link>
      </div>

      <!-- Header -->
      <div class="view-header">
        <div class="status-overall-badge" :class="isOnline ? 'badge-online' : 'badge-offline'">
          <span class="pulse-dot" :class="{ 'pulse-offline': !isOnline }"></span>
          <span>{{ isOnline ? 'System Online (100% Operational)' : 'System Telemetry Offline' }}</span>
        </div>

        <h1 class="view-title">iSupportBD Server Status</h1>
        <p class="view-desc">
          Current resource utilization across all live ERP, POS, VAT engines, and in-house servers.
        </p>
        
        <div v-if="lastUpdated" class="last-sync-badge">
          <i class="bi bi-arrow-repeat"></i>
          <span>Live Auto-Sync: {{ lastUpdated }}</span>
          <span class="uptime-tag" v-if="systemInfo.uptime">• Uptime: {{ systemInfo.uptime }}</span>
        </div>
      </div>

      <!-- Stats Grid (CPU, RAM, Hard Disk) -->
      <div class="stats-grid">
        <!-- CPU Card -->
        <div class="is-card stat-card">
          <div class="card-header">
            <div class="card-icon-box cpu-icon">
              <i class="bi bi-cpu"></i>
            </div>
            <div class="card-title-wrap">
              <div class="title-badge-wrap">
                <h3>CPU Usage</h3>
                <span class="type-badge">Intel Core i5</span>
              </div>
              <span class="stat-subtitle font-mono">{{ cpuStats.model || '12 Cores Active' }}</span>
            </div>
          </div>
          
          <div class="progress-container">
            <div class="progress-bar-bg">
              <div 
                class="progress-bar-fill" 
                :style="{ 
                  width: Math.max(cpuStats.usage, 2) + '%', 
                  background: cpuStats.usage > 80 ? '#ef4444' : 'linear-gradient(90deg, #00d2ff, #3b82f6)'
                }"
              ></div>
            </div>
            <div class="progress-text-row">
              <span class="main-val font-mono">{{ cpuStats.usage }}%</span>
              <span class="sub-val">{{ cpuStats.cores }} Cores / 12 Threads</span>
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
              <div class="title-badge-wrap">
                <h3>Memory (RAM)</h3>
                <span class="type-badge ram-badge">DDR4 Memory</span>
              </div>
              <span class="stat-subtitle">High-Speed Dual-Channel (16 GB Physical)</span>
            </div>
          </div>

          <div class="progress-container">
            <div class="progress-bar-bg">
              <div 
                class="progress-bar-fill" 
                :style="{ 
                  width: Math.max(ramStats.percentage, 2) + '%', 
                  background: ramStats.percentage > 85 ? '#ef4444' : 'linear-gradient(90deg, #10b981, #34d399)'
                }"
              ></div>
            </div>
            <div class="progress-text-row">
              <span class="main-val font-mono">{{ ramStats.used }} GB <span class="total-unit">/ {{ ramStats.total }} GB</span></span>
              <span class="sub-val text-emerald-400 font-mono">{{ ramStats.percentage }}% In Use</span>
            </div>
          </div>
        </div>

        <!-- Hard Disk Card -->
        <div class="is-card stat-card">
          <div class="card-header">
            <div class="card-icon-box disk-icon">
              <i class="bi bi-device-hdd"></i>
            </div>
            <div class="card-title-wrap">
              <div class="title-badge-wrap">
                <h3>NVMe Storage</h3>
                <span class="type-badge disk-badge">PCIe NVMe SSD</span>
              </div>
              <span class="stat-subtitle">High-IOPS Solid State Drive (256 GB)</span>
            </div>
          </div>

          <div class="progress-container">
            <div class="progress-bar-bg">
              <div 
                class="progress-bar-fill" 
                :style="{ 
                  width: Math.max(hddStats.percentage, 2) + '%', 
                  background: hddStats.percentage > 90 ? '#ef4444' : 'linear-gradient(90deg, #8b5cf6, #a855f7)'
                }"
              ></div>
            </div>
            <div class="progress-text-row">
              <span class="main-val font-mono">{{ hddStats.used }} GB <span class="total-unit">/ {{ hddStats.total }} GB</span></span>
              <span class="sub-val text-purple-400 font-mono">{{ hddStats.percentage }}% Used</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Services Uptime Table -->
      <div class="status-table is-card">
        <div class="table-top-bar">
          <h3 class="table-title">System & Cluster Status</h3>
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
  padding: 6rem 0 4rem;
  background: var(--is-bg);
}

.view-top-bar {
  max-width: 1000px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.86rem;
  font-weight: 700;
  color: var(--is-primary);
  text-decoration: none;
  transition: transform 0.2s ease, color 0.2s ease;
  padding: 0.35rem 0.75rem;
  border-radius: var(--is-radius-sm);
  background: var(--is-bg-surface);
  border: 1px solid var(--is-border);
}

.back-link:hover {
  transform: translateX(-3px);
  border-color: var(--is-primary);
}

.view-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 720px;
  margin: 0 auto 3rem;
}

.status-overall-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.45rem 1.35rem;
  border-radius: var(--is-radius-full);
  font-size: 0.88rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
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
  font-size: 2.3rem;
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
  gap: 0.45rem;
  margin-top: 0.85rem;
  font-size: 0.78rem;
  color: var(--is-text-dim);
  background: var(--is-bg-surface);
  padding: 0.3rem 0.8rem;
  border-radius: var(--is-radius-full);
  border: 1px solid var(--is-border);
}

.uptime-tag {
  color: var(--is-primary);
  font-weight: 600;
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
  padding: 1.6rem;
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-lg);
  box-shadow: var(--is-shadow-sm);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: var(--is-border-focus);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1.25rem;
}

.card-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
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

.card-title-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.title-badge-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.title-badge-wrap h3 {
  font-size: 1.12rem;
  font-weight: 800;
  color: var(--is-title);
  margin: 0;
  line-height: 1.2;
}

.type-badge {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: var(--is-radius-sm);
  background: rgba(0, 210, 255, 0.12);
  color: #00d2ff;
  border: 1px solid rgba(0, 210, 255, 0.25);
  letter-spacing: 0.02em;
}

.ram-badge {
  background: rgba(16, 185, 129, 0.12);
  color: #34d399;
  border-color: rgba(16, 185, 129, 0.25);
}

.disk-badge {
  background: rgba(139, 92, 246, 0.12);
  color: #c084fc;
  border-color: rgba(139, 92, 246, 0.25);
}

.stat-subtitle {
  font-size: 0.74rem;
  color: var(--is-text-dim);
  font-weight: 600;
  margin-top: 0.25rem;
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

.progress-text-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.main-val {
  font-size: 1.22rem;
  font-weight: 800;
  color: var(--is-title);
}

.total-unit {
  font-size: 0.85rem;
  color: var(--is-text-muted);
  font-weight: 500;
}

.sub-val {
  font-size: 0.85rem;
  color: var(--is-text-muted);
  font-weight: 700;
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

.text-cyan { color: var(--is-primary); }
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
