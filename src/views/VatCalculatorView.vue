<script setup lang="ts">
import VatCalculatorWidget from '@/components/VatCalculatorWidget.vue';
</script>

<template>
  <div class="vat-calculator-view">
    <div class="view-hero">
      <div class="is-container">
        <div class="view-header">
          <router-link to="/" class="back-link">
            <i class="bi bi-arrow-left"></i>
            <span>Back to Ecosystem</span>
          </router-link>
          <h1 class="view-title">Bangladesh NBR VAT & SD Calculator</h1>
          <p class="view-desc">
            Statutory tax calculation engine designed strictly according to Bangladesh Value Added Tax and Supplementary Duty Act 2012.
          </p>
        </div>
      </div>
    </div>

    <!-- Embedded Calculator Widget -->
    <VatCalculatorWidget />

    <!-- Explanatory Guide -->
    <section class="is-section guide-section">
      <div class="is-container">
        <div class="guide-grid">
          <div class="is-card guide-card">
            <div class="guide-icon"><i class="bi bi-info-circle-fill text-cyan"></i></div>
            <h3 class="guide-title">Standard 15% VAT</h3>
            <p class="guide-text">
              The standard rate of 15% applies to all standard taxable supplies, goods, and services unless exempted or truncated by official NBR SRO.
            </p>
          </div>

          <div class="is-card guide-card">
            <div class="guide-icon"><i class="bi bi-pie-chart-fill text-purple-400"></i></div>
            <h3 class="guide-title">Supplementary Duty (SD)</h3>
            <p class="guide-text">
              Supplementary Duty is assessed on specified luxury or non-essential goods prior to computing VAT: VAT Base = Assessable Value + SD.
            </p>
          </div>

          <div class="is-card guide-card">
            <div class="guide-icon"><i class="bi bi-arrow-left-right text-emerald-400"></i></div>
            <h3 class="guide-title">Tax → Value (Reverse)</h3>
            <p class="guide-text">
              Instantly compute base taxable value and total gross invoice directly from a known VAT amount using reverse tax extraction formulas.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.vat-calculator-view {
  min-height: 80vh;
  padding-top: 1rem;
}

.view-hero {
  padding: 3rem 0 1.5rem;
  background: radial-gradient(circle at 50% 10%, var(--is-bg-surface) 0%, var(--is-bg) 80%);
  border-bottom: 1px solid var(--is-border);
}

.view-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--is-primary);
  margin-bottom: 1rem;
}

.back-link:hover {
  transform: translateX(-3px);
}

.view-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--is-title);
  letter-spacing: -0.03em;
  margin-bottom: 0.5rem;
}

.view-desc {
  font-size: 0.95rem;
  color: var(--is-text-muted);
  line-height: 1.55;
}

.guide-section {
  background: var(--is-bg);
}

.guide-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 768px) {
  .guide-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.guide-card {
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  padding: 1.5rem;
  box-shadow: var(--is-shadow-sm);
}

.guide-icon {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}

.guide-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--is-title);
  margin-bottom: 0.35rem;
}

.guide-text {
  font-size: 0.84rem;
  color: var(--is-text);
  opacity: 0.9;
  line-height: 1.55;
}

.text-cyan { color: var(--is-primary); }
</style>
