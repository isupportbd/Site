<script setup lang="ts">
</script>

<template>
  <section class="hero-section">
    <!-- Ambient Glow background -->
    <div class="is-ambient-glow glow-1"></div>
    <div class="is-ambient-glow glow-2"></div>

    <div class="is-container relative z-10">
      <div class="hero-content">
        <!-- Top Tech Pill -->
        <div class="hero-badge">
          <span class="live-indicator">
            <span class="dot"></span>
            <span class="ping"></span>
          </span>
          <span class="badge-text">Military-Grade Enterprise Software Ecosystem</span>
        </div>

        <!-- Main Heading -->
        <h1 class="hero-title">
          Powering Next-Gen Enterprises with <br class="hidden sm:inline" />
          <span class="gradient-text">Military-Grade Digital Infrastructure</span>
        </h1>

        <!-- Subtitle -->
        <p class="hero-desc">
          From smart VAT management platforms like <strong>IDP</strong>, <strong>ZeroVAT</strong> & <strong>Analyser</strong> to multi-branch retail POS, garments ERP, and cloud security — <strong class="brand-text">iSupportBD</strong> engineers resilient, battle-tested software built for mission-critical operations.
        </p>

        <!-- CTA Button -->
        <div class="hero-actions">
          <a href="#products" class="is-btn is-btn-primary hero-btn">
            <i class="bi bi-grid-fill"></i>
            <span>Explore All Systems</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  padding: 4.5rem 0 3.5rem;
  overflow: hidden;
  background: var(--is-bg);
}

@media (min-width: 768px) {
  .hero-section {
    padding: 5.5rem 0 4.5rem;
  }
}

.glow-1 {
  top: -10%;
  left: 20%;
  width: 450px;
  height: 450px;
  background: rgba(0, 210, 255, 0.15);
}

.glow-2 {
  top: 20%;
  right: 15%;
  width: 400px;
  height: 400px;
  background: rgba(168, 85, 247, 0.12);
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1rem;
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-full);
  margin-bottom: 1.5rem;
  box-shadow: var(--is-shadow-sm);
}

.live-indicator {
  position: relative;
  display: inline-flex;
  width: 8px;
  height: 8px;
}

.live-indicator .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
}

.live-indicator .ping {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  opacity: 0.75;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2.4);
    opacity: 0;
  }
}

.badge-text {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--is-text);
}

.hero-title {
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.04em;
  color: var(--is-title);
  margin-bottom: 1.25rem;
  max-width: 900px;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 3.4rem;
  }
}

.gradient-text {
  background: linear-gradient(135deg, #00d2ff 0%, #38bdf8 50%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

[data-theme="light"] .gradient-text {
  background: linear-gradient(135deg, #0284c7 0%, #2563eb 60%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: 1.05rem;
  color: var(--is-text-muted);
  max-width: 760px;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.brand-text {
  color: var(--is-title);
  font-weight: 700;
}

.hero-actions {
  display: flex;
  justify-content: center;
}

.hero-btn {
  padding: 0.8rem 1.85rem;
  font-size: 0.98rem;
}
</style>
