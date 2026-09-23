<script setup lang="ts">
import { statsOverview } from '@/data/isupportData';
</script>

<template>
  <div class="stats-wrap">
    <div class="is-container">
      <div class="stats-grid">
        <div 
          v-for="(item, idx) in statsOverview" 
          :key="idx" 
          class="is-card stat-card"
        >
          <div class="stat-icon-wrap">
            <i :class="['bi', item.icon]"></i>
          </div>
          <div class="stat-number">{{ item.number }}</div>
          <div class="stat-label">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-wrap {
  padding: 2rem 0;
  background: transparent;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 1.25rem;
  }
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.35rem 1rem;
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-lg);
  box-shadow: var(--is-shadow-sm);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.stat-card:hover {
  border-color: var(--is-primary);
  background: var(--is-bg-card-hover);
  transform: translateY(-3px);
  box-shadow: var(--is-shadow-md);
}

.stat-icon-wrap {
  font-size: 1.5rem;
  color: var(--is-primary);
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--is-title);
  font-family: var(--is-font-mono);
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 0.35rem;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--is-text-muted);
  font-weight: 600;
  line-height: 1.35;
}
</style>
