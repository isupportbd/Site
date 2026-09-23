<script setup lang="ts">
import { ref, computed } from 'vue';
import { productsData, Product } from '@/data/isupportData';

const activeCategory = ref<string>('all');
const searchQuery = ref<string>('');
const selectedProduct = ref<Product | null>(null);

const categories = [
  { id: 'all', label: 'All Ecosystem', icon: 'bi-grid' },
  { id: 'vat', label: 'VAT & Tax Tools', icon: 'bi-file-earmark-spreadsheet' },
  { id: 'business', label: 'POS & ERP', icon: 'bi-shop' },
  { id: 'education', label: 'Academic & Campus', icon: 'bi-mortarboard' },
  { id: 'utility', label: 'Security & Utilities', icon: 'bi-tools' },
];

const categoryLabels: Record<string, { label: string; bg: string; color: string }> = {
  idp: { label: 'VAT Return Automation', bg: 'rgba(0, 210, 255, 0.12)', color: '#00d2ff' },
  analyser: { label: 'Audit & Reconciliation', bg: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8' },
  zerovat: { label: 'Zero-Friction VAT', bg: 'rgba(16, 185, 129, 0.12)', color: '#10b981' },
  baybosayee: { label: 'Multi-Branch POS', bg: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b' },
  shailik: { label: 'Fashion & Apparel ERP', bg: 'rgba(6, 182, 212, 0.12)', color: '#06b6d4' },
  'vat-calculator': { label: 'Free VAT Utility', bg: 'rgba(236, 72, 153, 0.12)', color: '#ec4899' },
  bidyapeet: { label: 'Academic & Campus ERP', bg: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6' },
  mosque: { label: 'Islamic Centre ERP', bg: 'rgba(16, 185, 129, 0.12)', color: '#10b981' },
  'password-manager': { label: 'Security & Vault', bg: 'rgba(99, 102, 241, 0.12)', color: '#6366f1' }
};

const filteredProducts = computed(() => {
  return productsData.filter((prod: Product) => {
    const matchesCategory = activeCategory.value === 'all' || prod.category === activeCategory.value;
    const query = searchQuery.value.toLowerCase().trim();
    const matchesSearch = !query || 
      prod.name.toLowerCase().includes(query) ||
      prod.tagline.toLowerCase().includes(query) ||
      prod.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
});

function openDetails(product: Product) {
  selectedProduct.value = product;
  document.body.style.overflow = 'hidden';
}

function closeDetails() {
  selectedProduct.value = null;
  document.body.style.overflow = '';
}
</script>

<template>
  <section id="products" class="is-section products-section">
    <div class="is-container">
      <!-- Section Header -->
      <div class="is-section-header">
        <div class="is-section-tag">
          <i class="bi bi-cpu-fill"></i>
          <span>Production-Ready Platforms</span>
        </div>
        <h2 class="is-section-title">Enterprise Software Ecosystem</h2>
        <p class="is-section-desc">
          Specialized systems engineered with robust architectures for VAT compliance, retail commerce, education, and enterprise security.
        </p>
      </div>

      <!-- Controls: Category Filter Tabs + Search -->
      <div class="filter-controls">
        <div class="category-tabs">
          <button 
            v-for="cat in categories" 
            :key="cat.id"
            class="tab-btn"
            :class="{ active: activeCategory === cat.id }"
            @click="activeCategory = cat.id"
          >
            <i :class="['bi', cat.icon]"></i>
            <span>{{ cat.label }}</span>
          </button>
        </div>

        <div class="search-box">
          <i class="bi bi-search search-icon"></i>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search software or modules..."
            class="search-input"
          />
          <button v-if="searchQuery" class="clear-search" @click="searchQuery = ''">
            <i class="bi bi-x"></i>
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="products-grid">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="is-card compact-card"
          :style="{ '--prod-color': product.color }"
        >
          <!-- Top Row: Icon + Category Badge + Live Status -->
          <div class="card-top-row">
            <div class="prod-icon-box" :style="{ background: product.color + '22', color: product.color, border: '1px solid ' + product.color + '40' }">
              <i :class="['bi', product.icon]"></i>
            </div>
            <div class="badges-row">
              <span 
                v-if="categoryLabels[product.id]" 
                class="prod-category-tag"
              >
                {{ categoryLabels[product.id].label }}
              </span>
              <span 
                class="is-badge" 
                :class="{
                  'is-badge-live': product.status === 'Live',
                  'is-badge-enterprise': product.status === 'Enterprise',
                  'is-badge-beta': product.status === 'Beta'
                }"
              >
                <i class="bi bi-circle-fill badge-dot"></i>
                {{ product.status }}
              </span>
            </div>
          </div>

          <!-- Product Identity -->
          <div class="prod-identity">
            <h3 class="prod-name">{{ product.name }}</h3>
            <div class="prod-tagline">{{ product.tagline }}</div>
          </div>

          <!-- Short Description -->
          <p class="compact-desc">{{ product.description }}</p>

          <!-- Metric Pill -->
          <div class="metric-pill">
            <i class="bi bi-lightning-charge-fill" :style="{ color: product.color }"></i>
            <span>{{ product.highlightMetric }}</span>
          </div>

          <!-- Action Buttons with Clear Separation -->
          <div class="compact-actions">
            <button class="is-btn is-btn-secondary detail-btn" @click="openDetails(product)">
              <i class="bi bi-info-circle"></i>
              <span>View Details</span>
            </button>

            <a 
              v-if="product.url.startsWith('http')" 
              :href="product.url" 
              target="_blank" 
              rel="noopener"
              class="is-btn is-btn-primary action-btn"
            >
              <span>Launch</span>
              <i class="bi bi-box-arrow-up-right"></i>
            </a>
            <router-link 
              v-else-if="product.url.startsWith('/')" 
              :to="product.url"
              class="is-btn is-btn-primary action-btn"
            >
              <span>Open Tool</span>
              <i class="bi bi-arrow-right"></i>
            </router-link>
            <a 
              v-else
              href="#contact"
              class="is-btn is-btn-secondary action-btn"
            >
              <span>Demo</span>
              <i class="bi bi-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Details Modal -->
    <div v-if="selectedProduct" class="modal-backdrop" @click.self="closeDetails">
      <div class="modal-dialog is-card">
        <!-- Close Button -->
        <button class="modal-close-btn" @click="closeDetails" aria-label="Close modal">
          <i class="bi bi-x-lg"></i>
        </button>

        <!-- Modal Header -->
        <div class="modal-header-row">
          <div class="modal-icon-box" :style="{ background: selectedProduct.color + '22', color: selectedProduct.color, border: '1px solid ' + selectedProduct.color + '40' }">
            <i :class="['bi', selectedProduct.icon]"></i>
          </div>
          <div class="modal-title-wrap">
            <div class="modal-badges">
              <span v-if="selectedProduct.isFree" class="is-badge is-badge-free">Free Public</span>
              <span 
                class="is-badge" 
                :class="{
                  'is-badge-live': selectedProduct.status === 'Live',
                  'is-badge-enterprise': selectedProduct.status === 'Enterprise',
                  'is-badge-beta': selectedProduct.status === 'Beta'
                }"
              >
                {{ selectedProduct.status }}
              </span>
            </div>
            <h2 class="modal-prod-name">{{ selectedProduct.name }}</h2>
            <div class="modal-tagline" :style="{ color: selectedProduct.color }">{{ selectedProduct.tagline }}</div>
          </div>
        </div>

        <!-- Metric Ribbon -->
        <div class="modal-metric-banner" :style="{ borderLeft: '3px solid ' + selectedProduct.color }">
          <i class="bi bi-lightning-charge-fill" :style="{ color: selectedProduct.color }"></i>
          <span>{{ selectedProduct.highlightMetric }}</span>
        </div>

        <!-- Overview -->
        <div class="modal-section">
          <h4 class="modal-sec-title">Overview</h4>
          <p class="modal-desc">{{ selectedProduct.description }}</p>
        </div>

        <!-- Key Features -->
        <div class="modal-section">
          <h4 class="modal-sec-title">Key Capabilities & Features</h4>
          <ul class="modal-features-list">
            <li v-for="(feat, idx) in selectedProduct.features" :key="idx">
              <i class="bi bi-check-circle-fill feat-icon" :style="{ color: selectedProduct.color }"></i>
              <span>{{ feat }}</span>
            </li>
          </ul>
        </div>

        <!-- Technical Specifications -->
        <div class="modal-section">
          <h4 class="modal-sec-title">Technical Specifications</h4>
          <div class="modal-specs-table">
            <div v-for="(spec, idx) in selectedProduct.specs" :key="idx" class="modal-spec-row">
              <span class="modal-spec-lbl">{{ spec.label }}:</span>
              <span class="modal-spec-val font-mono">{{ spec.val }}</span>
            </div>
          </div>
        </div>

        <!-- Modal Actions Footer -->
        <div class="modal-footer-actions">
          <a 
            v-if="selectedProduct.url.startsWith('http')" 
            :href="selectedProduct.url" 
            target="_blank" 
            rel="noopener"
            class="is-btn is-btn-primary modal-action-btn"
          >
            <i class="bi bi-box-arrow-up-right"></i>
            <span>Launch Live Platform</span>
          </a>
          <router-link 
            v-else-if="selectedProduct.url.startsWith('/')" 
            :to="selectedProduct.url"
            class="is-btn is-btn-primary modal-action-btn"
            @click="closeDetails"
          >
            <i class="bi bi-calculator"></i>
            <span>Open Tool</span>
          </router-link>
          <a 
            v-else
            href="#contact"
            class="is-btn is-btn-primary modal-action-btn"
            @click="closeDetails"
          >
            <i class="bi bi-whatsapp"></i>
            <span>Request Live Demo</span>
          </a>

          <button class="is-btn is-btn-secondary" @click="closeDetails">
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products-section {
  background: var(--is-bg);
}

.filter-controls {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

@media (min-width: 900px) {
  .filter-controls {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.05rem;
  border-radius: var(--is-radius-md);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--is-text-muted);
  background: var(--is-bg-surface);
  border: 1px solid var(--is-border);
  transition: all 0.2s ease;
}

.tab-btn:hover {
  color: var(--is-title);
  border-color: var(--is-border-light);
  background: var(--is-bg-card-hover);
}

.tab-btn.active {
  color: #080c14;
  background: var(--is-primary);
  border-color: var(--is-primary);
  font-weight: 800;
  box-shadow: 0 2px 10px rgba(0, 210, 255, 0.35);
}

[data-theme="light"] .tab-btn.active {
  color: #ffffff;
}

.search-box {
  position: relative;
  min-width: 280px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--is-text-dim);
  font-size: 0.9rem;
}

.search-input {
  width: 100%;
  padding: 0.55rem 2.25rem 0.55rem 2.5rem;
  background: var(--is-bg-surface);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-md);
  color: var(--is-text);
  font-size: 0.88rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  border-color: var(--is-primary);
}

.clear-search {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--is-text-dim);
  font-size: 1.15rem;
}

/* Grid & Compact Cards */
.products-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.compact-card {
  display: flex;
  flex-direction: column;
  padding: 1.75rem 1.5rem;
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-lg);
  box-shadow: var(--is-shadow-sm);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.compact-card:hover {
  border-color: var(--is-primary);
  transform: translateY(-4px);
  box-shadow: var(--is-shadow-md);
}

.card-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.prod-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.45rem;
}

.badges-row {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
}

.prod-category-tag {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.22rem 0.65rem;
  border-radius: var(--is-radius-full);
  background: var(--is-bg-surface);
  color: var(--is-text-muted);
  border: 1px solid var(--is-border);
  font-family: var(--is-font-mono);
}

[data-theme="light"] .prod-category-tag {
  background: #f1f5f9;
  color: #475569;
  border-color: #e2e8f0;
}

.badge-dot {
  font-size: 0.45rem;
}

.prod-identity {
  margin-bottom: 0.85rem;
}

.prod-name {
  font-size: 1.28rem;
  font-weight: 800;
  color: var(--is-title);
  line-height: 1.25;
}

.prod-tagline {
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--is-text-muted);
  margin-top: 0.35rem;
  line-height: 1.45;
}

[data-theme="light"] .prod-tagline {
  color: #475569;
}

.compact-desc {
  font-size: 0.86rem;
  color: var(--is-text);
  opacity: 0.9;
  line-height: 1.55;
  margin-bottom: 1.15rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.metric-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.38rem 0.8rem;
  background: var(--is-bg-surface);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-sm);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--is-title);
  margin-bottom: 1.25rem;
  font-family: var(--is-font-mono);
  width: fit-content;
}

[data-theme="light"] .metric-pill {
  background: #f8fafc;
  border-color: #e2e8f0;
  color: #1e293b;
}

.compact-actions {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 0.5rem;
}

.detail-btn {
  padding: 0.65rem 0.85rem;
  font-size: 0.85rem;
}

.action-btn {
  padding: 0.65rem 0.85rem;
  font-size: 0.85rem;
}

/* Modal Styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-dialog {
  width: 100%;
  max-width: 680px;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-lg);
  padding: 2.25rem;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.25s ease;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--is-bg-surface);
  border: 1px solid var(--is-border);
  color: var(--is-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-close-btn:hover {
  color: var(--is-title);
  border-color: var(--is-primary);
}

.modal-header-row {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.modal-icon-box {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0;
}

.modal-title-wrap {
  display: flex;
  flex-direction: column;
}

.modal-badges {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.45rem;
}

.modal-prod-name {
  font-size: 1.65rem;
  font-weight: 800;
  color: var(--is-title);
  line-height: 1.2;
}

.modal-tagline {
  font-size: 0.9rem;
  font-weight: 700;
  margin-top: 0.25rem;
}

.modal-metric-banner {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 1.15rem;
  background: var(--is-bg-surface);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-md);
  font-size: 0.88rem;
  font-weight: 800;
  color: var(--is-title);
  font-family: var(--is-font-mono);
  margin-bottom: 1.75rem;
}

.modal-section {
  margin-bottom: 1.5rem;
}

.modal-sec-title {
  font-size: 0.88rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--is-text-muted);
  margin-bottom: 0.65rem;
}

.modal-desc {
  font-size: 0.94rem;
  color: var(--is-text);
  line-height: 1.65;
}

.modal-features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.modal-features-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.9rem;
  color: var(--is-text);
  line-height: 1.5;
}

.feat-icon {
  font-size: 0.95rem;
  margin-top: 0.15rem;
  flex-shrink: 0;
}

.modal-specs-table {
  background: var(--is-bg-surface);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-md);
  padding: 0.85rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.modal-spec-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.84rem;
}

.modal-spec-lbl {
  color: var(--is-text-muted);
}

.modal-spec-val {
  color: var(--is-title);
  font-weight: 700;
}

.modal-footer-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--is-border);
}

.modal-action-btn {
  flex-grow: 1;
}
</style>
