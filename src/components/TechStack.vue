<script setup lang="ts">
import { techStackData } from '@/data/isupportData';
</script>

<template>
  <section id="tech-stack" class="is-section tech-section">
    <div class="is-container">
      <!-- Section Header -->
      <div class="is-section-header">
        <div class="is-section-tag">
          <i class="bi bi-stack"></i>
          <span>Architecture & Reliability</span>
        </div>
        <h2 class="is-section-title">Built on Modern, High-Concurrency Tech</h2>
        <p class="is-section-desc">
          We leverage lightweight TypeScript runtimes, compiled engines, and resilient cloud architectures to eliminate latency and maximize uptime.
        </p>
      </div>

      <!-- Tech Cards Grid -->
      <div class="tech-grid">
        <div 
          v-for="(tech, index) in techStackData" 
          :key="index"
          class="is-card tech-card"
        >
          <div class="tech-icon-box" :style="{ background: tech.color + '22', color: tech.color }">
            <i :class="['bi', tech.icon]"></i>
          </div>
          <div class="tech-info">
            <h3 class="tech-name">{{ tech.name }}</h3>
            <p class="tech-desc">{{ tech.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Architecture Highlights Box -->
      <div class="arch-box is-card">
        <div class="arch-item">
          <div class="arch-badge"><i class="bi bi-speedometer2"></i> High Performance</div>
          <h4 class="arch-title">Sub-Second Checkout & Data Parsing</h4>
          <p class="arch-desc">Parses 50,000+ Excel invoice rows in seconds for VAT returns; delivers 0.1s instant barcode checkouts in retail POS.</p>
        </div>

        <div class="arch-divider"></div>

        <div class="arch-item">
          <div class="arch-badge"><i class="bi bi-file-earmark-text"></i> Standard VAT Logic</div>
          <h4 class="arch-title">Bangladesh Standard VAT Formats</h4>
          <p class="arch-desc">Built according to standard Bangladesh VAT rules, Mushak 6.1/6.2 calculation formulas, and withholding tax logic.</p>
        </div>

        <div class="arch-divider"></div>

        <div class="arch-item">
          <div class="arch-badge"><i class="bi bi-cloud-check"></i> Enterprise Security</div>
          <h4 class="arch-title">Zero-Knowledge & Role Access</h4>
          <p class="arch-desc">AES-256 encrypted credential vaults, multi-tenant database isolation, and automated encrypted backups.</p>
        </div>
      </div>

      <!-- In-House Dedicated Server Banner -->
      <div class="server-infra-card is-card">
        <div class="infra-left">
          <div class="infra-badge">
            <span class="live-dot"></span>
            <span>Dedicated In-House Server Hardware • Self-Hosted Infrastructure</span>
          </div>
          <h3 class="infra-title">Self-Hosted on Our Own Dedicated Physical Machines</h3>
          <p class="infra-desc">
            We don't rely on shared third-party hosting. iSupportBD operates and manages its own dedicated in-house server machines, ensuring absolute data privacy, full data sovereignty, high-speed response, and automated daily encrypted backups for all enterprise workloads.
          </p>
          <div class="infra-features">
            <div class="infra-feature-item">
              <i class="bi bi-hdd-rack-fill text-cyan"></i>
              <span>Owned Private Server Hardware</span>
            </div>
            <div class="infra-feature-item">
              <i class="bi bi-lightning-charge-fill text-cyan"></i>
              <span>High-Speed Local Execution</span>
            </div>
            <div class="infra-feature-item">
              <i class="bi bi-shield-lock-fill text-cyan"></i>
              <span>100% Data Sovereignty</span>
            </div>
            <div class="infra-feature-item">
              <i class="bi bi-check2-circle text-cyan"></i>
              <span>99.99% Hardware Reliability</span>
            </div>
          </div>
        </div>
        <div class="infra-right">
          <router-link to="/server-status" class="is-btn is-btn-secondary infra-btn">
            <i class="bi bi-activity"></i>
            <span>Live Server Telemetry</span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech-section {
  background: var(--is-bg);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .tech-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.15rem;
  }
}

.tech-card {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem 1.15rem;
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  box-shadow: var(--is-shadow-sm);
  transition: transform 0.2s, border-color 0.2s, background 0.2s;
}

.tech-card:hover {
  background: var(--is-bg-card-hover);
  border-color: var(--is-primary);
  transform: translateY(-2px);
}

.tech-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
}

.tech-info {
  display: flex;
  flex-direction: column;
}

.tech-name {
  font-size: 0.98rem;
  font-weight: 700;
  color: var(--is-title);
  margin-bottom: 0.1rem;
}

.tech-desc {
  font-size: 0.78rem;
  color: var(--is-text-muted);
}

.arch-box {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding: 1.5rem 1.75rem;
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  box-shadow: var(--is-shadow-sm);
}

@media (min-width: 860px) {
  .arch-box {
    grid-template-columns: 1fr auto 1fr auto 1fr;
    gap: 1.25rem;
    align-items: center;
  }
}

.arch-divider {
  display: none;
}

@media (min-width: 860px) {
  .arch-divider {
    display: block;
    width: 1px;
    height: 100%;
    min-height: 80px;
    background: var(--is-border);
  }
}

.arch-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.74rem;
  font-weight: 700;
  color: var(--is-primary);
  text-transform: uppercase;
  margin-bottom: 0.35rem;
  letter-spacing: 0.04em;
}

.arch-title {
  font-size: 0.98rem;
  font-weight: 800;
  color: var(--is-title);
  margin-bottom: 0.25rem;
}

.arch-desc {
  font-size: 0.82rem;
  color: var(--is-text);
  opacity: 0.9;
  line-height: 1.5;
}

.server-infra-card {
  margin-top: 1.5rem;
  padding: 1.6rem 1.75rem;
  background: linear-gradient(135deg, rgba(0, 210, 255, 0.05) 0%, var(--is-bg-card) 60%, rgba(16, 185, 129, 0.05) 100%);
  border: 1px solid rgba(0, 210, 255, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: var(--is-shadow-sm);
}

@media (min-width: 860px) {
  .server-infra-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.infra-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.76rem;
  font-weight: 700;
  color: #10b981;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.4rem;
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.infra-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--is-title);
  margin-bottom: 0.4rem;
}

.infra-desc {
  font-size: 0.88rem;
  color: var(--is-text);
  line-height: 1.55;
  max-width: 720px;
  margin-bottom: 0.9rem;
}

.infra-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
}

.infra-feature-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--is-title);
}

.infra-btn {
  white-space: nowrap;
  padding: 0.75rem 1.35rem;
  font-size: 0.88rem;
}
</style>
