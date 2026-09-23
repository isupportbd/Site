<script setup lang="ts">
import { servicesData, contactInfo } from '@/data/isupportData';
</script>

<template>
  <section id="services" class="is-section services-section">
    <div class="is-container">
      <!-- Section Header -->
      <div class="is-section-header">
        <div class="is-section-tag">
          <i class="bi bi-briefcase-fill"></i>
          <span>Professional Solutions</span>
        </div>
        <h2 class="is-section-title">Enterprise Engineering Services</h2>
        <p class="is-section-desc">
          Custom software engineering, statutory tax digitisation, retail POS, and cloud infrastructure tailored to your business needs.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="services-grid">
        <div 
          v-for="service in servicesData" 
          :key="service.id"
          class="is-card service-card"
          :style="{ '--srv-color': service.color }"
        >
          <div class="srv-icon-box" :style="{ background: service.color + '22', color: service.color }">
            <i :class="['bi', service.icon]"></i>
          </div>

          <h3 class="srv-title">{{ service.title }}</h3>
          <p class="srv-desc">{{ service.description }}</p>

          <ul class="srv-points">
            <li v-for="(point, idx) in service.points" :key="idx">
              <i class="bi bi-chevron-right point-icon" :style="{ color: service.color }"></i>
              <span>{{ point }}</span>
            </li>
          </ul>

          <div class="srv-cta">
            <a :href="contactInfo.whatsappUrl" target="_blank" rel="noopener" class="srv-link">
              <span>Discuss Project</span>
              <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  background: var(--is-bg);
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.service-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  box-shadow: var(--is-shadow-sm);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.service-card:hover {
  border-color: var(--srv-color);
  transform: translateY(-4px);
  box-shadow: var(--is-shadow-md);
}

.srv-icon-box {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.srv-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--is-title);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.srv-desc {
  font-size: 0.85rem;
  color: var(--is-text);
  opacity: 0.88;
  line-height: 1.55;
  margin-bottom: 1.15rem;
}

.srv-points {
  list-style: none;
  padding: 0;
  margin: 0 0 1.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  flex-grow: 1;
}

.srv-points li {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  font-size: 0.82rem;
  color: var(--is-text);
  line-height: 1.4;
}

.point-icon {
  font-size: 0.76rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
  font-weight: 800;
}

.srv-cta {
  margin-top: auto;
  border-top: 1px solid var(--is-border);
  padding-top: 0.85rem;
}

.srv-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--is-primary);
}

.srv-link:hover {
  color: var(--is-title);
  transform: translateX(3px);
}
</style>
