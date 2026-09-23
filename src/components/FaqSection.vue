<script setup lang="ts">
import { ref } from 'vue';
import { faqList } from '@/data/isupportData';

const openIndex = ref<number | null>(0);

function toggleFaq(idx: number) {
  openIndex.value = openIndex.value === idx ? null : idx;
}
</script>

<template>
  <section id="faq" class="is-section faq-section">
    <div class="is-container">
      <!-- Section Header -->
      <div class="is-section-header">
        <div class="is-section-tag">
          <i class="bi bi-question-circle-fill"></i>
          <span>Knowledge & Inquiries</span>
        </div>
        <h2 class="is-section-title">Frequently Asked Questions</h2>
        <p class="is-section-desc">
          Answers to common questions about our ERP platforms, retail POS, statutory VAT compliance, and security.
        </p>
      </div>

      <!-- FAQ Accordion List -->
      <div class="faq-list">
        <div 
          v-for="(item, idx) in faqList" 
          :key="idx"
          class="faq-item"
          :class="{ active: openIndex === idx }"
        >
          <button class="faq-question-btn" @click="toggleFaq(idx)">
            <span class="faq-badge">{{ item.category }}</span>
            <span class="faq-q-text">{{ item.question }}</span>
            <i class="bi bi-chevron-down faq-chevron"></i>
          </button>
          
          <div v-show="openIndex === idx" class="faq-answer-wrap">
            <p class="faq-answer-text">{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  background: var(--is-bg);
}

.faq-list {
  max-width: 840px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.faq-item {
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-md);
  box-shadow: var(--is-shadow-sm);
  overflow: hidden;
  transition: all 0.2s ease;
}

.faq-item.active {
  border-color: var(--is-primary);
  background: var(--is-bg-card-hover);
}

.faq-question-btn {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1.1rem 1.25rem;
  gap: 0.85rem;
  text-align: left;
  color: var(--is-title);
  background: none;
  cursor: pointer;
}

.faq-badge {
  padding: 0.2rem 0.55rem;
  background: rgba(0, 210, 255, 0.1);
  border: 1px solid rgba(0, 210, 255, 0.25);
  border-radius: 4px;
  color: var(--is-primary);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  flex-shrink: 0;
}

[data-theme="light"] .faq-badge {
  background: rgba(2, 132, 199, 0.1);
  border-color: rgba(2, 132, 199, 0.25);
}

.faq-q-text {
  font-size: 0.95rem;
  font-weight: 700;
  flex-grow: 1;
  color: var(--is-title);
}

.faq-chevron {
  font-size: 0.85rem;
  color: var(--is-text-muted);
  transition: transform 0.25s ease;
  flex-shrink: 0;
}

.faq-item.active .faq-chevron {
  transform: rotate(180deg);
  color: var(--is-primary);
}

.faq-answer-wrap {
  padding: 0 1.25rem 1.25rem 1.25rem;
}

.faq-answer-text {
  font-size: 0.88rem;
  color: var(--is-text);
  opacity: 0.9;
  line-height: 1.6;
  border-top: 1px solid var(--is-border);
  padding-top: 0.85rem;
}
</style>
