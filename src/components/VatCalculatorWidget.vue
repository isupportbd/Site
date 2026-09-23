<script setup lang="ts">
import { ref, computed } from 'vue';

const amount = ref<string>('');
const rate = ref<number>(15);
const customRate = ref<string>('');
const isCustomRate = ref<boolean>(false);
const sdRate = ref<number>(0);
const customSdRate = ref<string>('');
const isCustomSd = ref<boolean>(false);
const mode = ref<'exclusive' | 'inclusive' | 'taxToValue'>('exclusive');
const copied = ref<boolean>(false);

const vatRates = [5, 7.5, 10, 15];
const sdRates = [0, 10, 20, 25, 30, 45, 60];

const effectiveVatRate = computed(() => {
  if (isCustomRate.value) {
    return parseFloat(customRate.value) || 0;
  }
  return parseFloat(rate.value as any) || 0;
});

const effectiveSdRate = computed(() => {
  if (isCustomSd.value) {
    return parseFloat(customSdRate.value) || 0;
  }
  return parseFloat(sdRate.value as any) || 0;
});

const results = computed(() => {
  const val = parseFloat(amount.value);
  if (isNaN(val) || val < 0) {
    return { baseAmount: 0, sdAmount: 0, vatAmount: 0, totalAmount: 0 };
  }

  const currentVatRate = effectiveVatRate.value;
  const currentSdRate = effectiveSdRate.value;

  if (mode.value === 'exclusive') {
    const sd = val * (currentSdRate / 100);
    const valueForVat = val + sd;
    const vat = valueForVat * (currentVatRate / 100);
    const total = valueForVat + vat;
    
    return {
      baseAmount: Math.round(val * 100) / 100,
      sdAmount: Math.round(sd * 100) / 100,
      vatAmount: Math.round(vat * 100) / 100,
      totalAmount: Math.round(total * 100) / 100
    };
  } else if (mode.value === 'inclusive') {
    const valueForVat = val / (1 + (currentVatRate / 100));
    const vat = val - valueForVat;
    const base = valueForVat / (1 + (currentSdRate / 100));
    const sd = valueForVat - base;

    return {
      baseAmount: Math.round(base * 100) / 100,
      sdAmount: Math.round(sd * 100) / 100,
      vatAmount: Math.round(vat * 100) / 100,
      totalAmount: Math.round(val * 100) / 100
    };
  } else {
    // taxToValue
    if (currentVatRate === 0) {
      return { baseAmount: 0, sdAmount: 0, vatAmount: val, totalAmount: val };
    }
    const base = val / ((1 + currentSdRate / 100) * (currentVatRate / 100));
    const sd = base * (currentSdRate / 100);
    const valueForVat = base + sd;
    const total = valueForVat + val;

    return {
      baseAmount: Math.round(base * 100) / 100,
      sdAmount: Math.round(sd * 100) / 100,
      vatAmount: Math.round(val * 100) / 100,
      totalAmount: Math.round(total * 100) / 100
    };
  }
});

function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
}

function selectVatRate(r: number) {
  isCustomRate.value = false;
  rate.value = r;
}

function enableCustomVat() {
  isCustomRate.value = true;
}

function selectSdRate(s: number) {
  isCustomSd.value = false;
  sdRate.value = s;
}

function enableCustomSd() {
  isCustomSd.value = true;
}

function reset() {
  amount.value = '';
  rate.value = 15;
  customRate.value = '';
  isCustomRate.value = false;
  sdRate.value = 0;
  customSdRate.value = '';
  isCustomSd.value = false;
  mode.value = 'exclusive';
}

function copySummary() {
  const text = `iSupportBD VAT Calculation:
Mode: ${mode.value.toUpperCase()}
Base Amount: ${formatCurrency(results.value.baseAmount)}
${results.value.sdAmount > 0 ? `Supplementary Duty (SD ${effectiveSdRate.value}%): ${formatCurrency(results.value.sdAmount)}\n` : ''}VAT (${effectiveVatRate.value}%): ${formatCurrency(results.value.vatAmount)}
Total Gross Amount: ${formatCurrency(results.value.totalAmount)}
Calculated via iSupportBD VAT Engine (https://isupportbd.com)`;

  navigator.clipboard.writeText(text);
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 2000);
}
</script>

<template>
  <section id="vat-tool" class="is-section vat-calc-section">
    <div class="is-container">
      <!-- Section Header -->
      <div class="is-section-header">
        <div class="is-section-tag">
          <i class="bi bi-calculator-fill"></i>
          <span>Tax Calculation Engine</span>
        </div>
        <h2 class="is-section-title">Bangladesh VAT & SD Calculator</h2>
        <p class="is-section-desc">
          Accurate VAT, Supplementary Duty (SD), and Tax-to-Value reverse calculation tool built according to Bangladesh VAT Act formats.
        </p>
      </div>

      <!-- Main Dual-Pane Console -->
      <div class="vat-calc-console">
        <!-- Controls Pane -->
        <div class="calc-controls-pane">
          <!-- Calculation Mode Tabs -->
          <div class="calc-group">
            <div class="pane-group-head">
              <label class="calc-label">Calculation Mode</label>
              <span class="mode-status-pill">Active: {{ mode === 'exclusive' ? 'Exclusive' : mode === 'inclusive' ? 'Inclusive' : 'Tax → Value' }}</span>
            </div>
            <div class="mode-tabs">
              <button 
                class="mode-btn" 
                :class="{ active: mode === 'exclusive' }"
                @click="mode = 'exclusive'"
              >
                <i class="bi bi-plus-circle"></i>
                <span>Exclusive</span>
              </button>
              <button 
                class="mode-btn" 
                :class="{ active: mode === 'inclusive' }"
                @click="mode = 'inclusive'"
              >
                <i class="bi bi-pie-chart"></i>
                <span>Inclusive</span>
              </button>
              <button 
                class="mode-btn" 
                :class="{ active: mode === 'taxToValue' }"
                @click="mode = 'taxToValue'"
              >
                <i class="bi bi-arrow-left-right"></i>
                <span>Tax → Value</span>
              </button>
            </div>
          </div>

          <!-- Amount Input Field -->
          <div class="calc-group">
            <label class="calc-label">
              {{ mode === 'exclusive' ? 'Base Value (Excluding VAT)' : mode === 'inclusive' ? 'Total Gross Amount (Including VAT)' : 'Known VAT Amount' }}
            </label>
            <div class="amount-input-box">
              <span class="currency-tag">BDT ৳</span>
              <input 
                v-model="amount" 
                type="number" 
                min="0"
                step="100"
                placeholder="0.00"
                class="amount-input"
              />
            </div>
          </div>

          <!-- Statutory VAT Rates -->
          <div class="calc-group">
            <div class="label-row">
              <label class="calc-label">Statutory VAT Rate</label>
              <span class="rate-badge">{{ effectiveVatRate }}% Active Rate</span>
            </div>
            <div class="rate-selector">
              <button 
                v-for="r in vatRates" 
                :key="r"
                class="rate-btn" 
                :class="{ active: !isCustomRate && rate === r }"
                @click="selectVatRate(r)"
              >
                {{ r }}%
              </button>
              <button 
                class="rate-btn custom-btn"
                :class="{ active: isCustomRate }"
                @click="enableCustomVat"
              >
                Custom %
              </button>
            </div>
            <div v-if="isCustomRate" class="custom-rate-input-wrap">
              <input 
                v-model="customRate" 
                type="number" 
                placeholder="Enter custom VAT rate %" 
                class="custom-rate-input"
              />
              <span class="custom-pct">%</span>
            </div>
          </div>

          <!-- Supplementary Duty (SD) -->
          <div class="calc-group">
            <div class="label-row">
              <label class="calc-label">Supplementary Duty (SD %) - Optional</label>
              <span v-if="effectiveSdRate > 0" class="rate-badge sd-badge">{{ effectiveSdRate }}% SD Applied</span>
            </div>
            <div class="rate-selector">
              <button 
                v-for="s in [0, 10, 20, 30, 45]" 
                :key="s"
                class="rate-btn" 
                :class="{ active: !isCustomSd && sdRate === s }"
                @click="selectSdRate(s)"
              >
                {{ s }}%
              </button>
              <button 
                class="rate-btn custom-btn"
                :class="{ active: isCustomSd }"
                @click="enableCustomSd"
              >
                Custom SD
              </button>
            </div>
            <div v-if="isCustomSd" class="custom-rate-input-wrap">
              <input 
                v-model="customSdRate" 
                type="number" 
                placeholder="Enter custom SD %" 
                class="custom-rate-input"
              />
              <span class="custom-pct">%</span>
            </div>
          </div>

          <!-- Reset Console Button -->
          <button class="is-btn is-btn-secondary reset-console-btn" @click="reset">
            <i class="bi bi-arrow-counterclockwise"></i>
            <span>Reset All Values</span>
          </button>
        </div>

        <!-- Receipt & Output Summary Pane -->
        <div class="calc-summary-pane">
          <div class="summary-header">
            <div class="summary-title-wrap">
              <i class="bi bi-receipt text-cyan"></i>
              <h3 class="summary-title">Statutory Tax Voucher</h3>
            </div>
            <button class="copy-voucher-btn" @click="copySummary">
              <i :class="copied ? 'bi bi-check-lg text-emerald-400' : 'bi bi-clipboard'"></i>
              <span>{{ copied ? 'Copied to Clipboard!' : 'Copy Summary' }}</span>
            </button>
          </div>

          <!-- Line Items List -->
          <div class="voucher-list">
            <div class="voucher-row">
              <div class="voucher-cell-lbl">
                <span class="main-lbl">Base Assessable Amount</span>
                <span class="sub-lbl">Net value before indirect duties</span>
              </div>
              <span class="voucher-cell-val font-mono">{{ formatCurrency(results.baseAmount) }}</span>
            </div>
            
            <div v-if="results.sdAmount > 0" class="voucher-row sd-row">
              <div class="voucher-cell-lbl">
                <span class="main-lbl">Supplementary Duty (SD)</span>
                <span class="sub-lbl">Assessed at {{ effectiveSdRate }}%</span>
              </div>
              <span class="voucher-cell-val font-mono text-purple-400">+ {{ formatCurrency(results.sdAmount) }}</span>
            </div>
            
            <div class="voucher-row vat-row">
              <div class="voucher-cell-lbl">
                <span class="main-lbl">Statutory Value Added Tax (VAT)</span>
                <span class="sub-lbl">Assessed at {{ effectiveVatRate }}%</span>
              </div>
              <span class="voucher-cell-val font-mono text-cyan">+ {{ formatCurrency(results.vatAmount) }}</span>
            </div>
            
            <div class="voucher-divider"></div>
            
            <div class="voucher-total-row">
              <div class="voucher-cell-lbl">
                <span class="total-lbl">Total Gross Invoice</span>
                <span class="sub-lbl">Final payable amount</span>
              </div>
              <span class="voucher-total-val font-mono">{{ formatCurrency(results.totalAmount) }}</span>
            </div>
          </div>

          <!-- Explanatory Narrative Box -->
          <div class="narrative-box">
            <i class="bi bi-info-circle text-cyan"></i>
            <p v-if="!amount">
              Enter any amount above to compute instant statutory VAT, Supplementary Duty (SD), and Mushak 6.3 invoice totals.
            </p>
            <p v-else-if="mode === 'exclusive'">
              In <strong>Exclusive mode</strong>, a base amount of <strong>{{ formatCurrency(results.baseAmount) }}</strong> generates <span v-if="results.sdAmount > 0"><strong>{{ formatCurrency(results.sdAmount) }}</strong> in SD,</span> <strong>{{ formatCurrency(results.vatAmount) }}</strong> in VAT, resulting in a total invoice of <strong>{{ formatCurrency(results.totalAmount) }}</strong>.
            </p>
            <p v-else-if="mode === 'inclusive'">
              In <strong>Inclusive mode</strong>, a gross invoice of <strong>{{ formatCurrency(results.totalAmount) }}</strong> extracts a net base of <strong>{{ formatCurrency(results.baseAmount) }}</strong> and <strong>{{ formatCurrency(results.vatAmount) }}</strong> in VAT.
            </p>
            <p v-else>
              In <strong>Tax → Value mode</strong>, a target VAT of <strong>{{ formatCurrency(results.vatAmount) }}</strong> at {{ effectiveVatRate }}% extracts a base assessable value of <strong>{{ formatCurrency(results.baseAmount) }}</strong>.
            </p>
          </div>

          <div class="voucher-footer-meta">
            <i class="bi bi-shield-check text-emerald-400"></i>
            <span>Bangladesh VAT & SD Standard Calculation • Mushak 6.3 Formats</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vat-calc-section {
  background: var(--is-bg);
}

.vat-calc-console {
  display: flex;
  flex-direction: column;
  max-width: 1040px;
  margin: 0 auto;
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-lg);
  box-shadow: var(--is-shadow-md);
  overflow: hidden;
}

@media (min-width: 860px) {
  .vat-calc-console {
    flex-direction: row;
    align-items: stretch;
  }
}

.calc-controls-pane {
  flex: 1.15;
  padding: 2.25rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  border-bottom: 1px solid var(--is-border);
}

@media (min-width: 860px) {
  .calc-controls-pane {
    border-bottom: none;
    border-right: 1px solid var(--is-border);
  }
}

.calc-summary-pane {
  flex: 0.95;
  padding: 2.25rem 2rem;
  background: var(--is-bg-surface);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pane-group-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.mode-status-pill {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--is-primary);
  background: rgba(0, 210, 255, 0.1);
  padding: 0.2rem 0.55rem;
  border-radius: var(--is-radius-sm);
  border: 1px solid rgba(0, 210, 255, 0.25);
  font-family: var(--is-font-mono);
}

.calc-label {
  display: block;
  font-size: 0.84rem;
  font-weight: 800;
  color: var(--is-title);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.rate-badge {
  font-size: 0.74rem;
  font-weight: 800;
  color: var(--is-primary);
  background: rgba(0, 210, 255, 0.12);
  padding: 0.2rem 0.6rem;
  border-radius: var(--is-radius-sm);
  border: 1px solid rgba(0, 210, 255, 0.3);
  font-family: var(--is-font-mono);
}

.sd-badge {
  color: #c084fc;
  background: rgba(168, 85, 247, 0.12);
  border-color: rgba(168, 85, 247, 0.3);
}

.mode-tabs {
  display: flex;
  background: var(--is-bg);
  padding: 5px;
  border-radius: var(--is-radius-md);
  border: 1px solid var(--is-border);
  gap: 5px;
}

.mode-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.65rem 0.5rem;
  border-radius: var(--is-radius-sm);
  background: transparent;
  color: var(--is-text-muted);
  font-weight: 700;
  font-size: 0.84rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-btn:hover {
  color: var(--is-title);
}

.mode-btn.active {
  background: var(--is-bg-card);
  color: var(--is-primary);
  border: 1px solid rgba(0, 210, 255, 0.35);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.amount-input-box {
  position: relative;
}

.currency-tag {
  position: absolute;
  left: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--is-primary);
  font-size: 1rem;
  font-weight: 800;
  font-family: var(--is-font-mono);
}

.amount-input {
  width: 100%;
  padding: 0.75rem 1.25rem 0.75rem 4.5rem;
  background: var(--is-bg);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-md);
  color: var(--is-text);
  font-size: 1.35rem;
  font-weight: 800;
  font-family: var(--is-font-mono);
  outline: none;
  transition: border-color 0.2s;
}

.amount-input:focus {
  border-color: var(--is-primary);
  box-shadow: 0 0 0 2px var(--is-primary-glow);
}

.rate-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.rate-btn {
  flex: 1;
  min-width: 55px;
  padding: 0.55rem 0;
  text-align: center;
  background: var(--is-bg);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-sm);
  color: var(--is-text);
  font-size: 0.85rem;
  font-weight: 700;
  font-family: var(--is-font-mono);
  transition: all 0.2s;
}

.rate-btn:hover {
  color: var(--is-title);
  border-color: var(--is-border-light);
}

.rate-btn.active {
  background: var(--is-primary);
  color: #080c14;
  border-color: var(--is-primary);
  font-weight: 900;
}

[data-theme="light"] .rate-btn.active {
  color: #ffffff;
}

.custom-btn {
  flex: 1.4;
}

.custom-rate-input-wrap {
  position: relative;
  margin-top: 0.65rem;
}

.custom-rate-input {
  width: 100%;
  padding: 0.55rem 2rem 0.55rem 0.85rem;
  background: var(--is-bg);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-sm);
  color: var(--is-text);
  font-size: 0.88rem;
  font-family: var(--is-font-mono);
  font-weight: 700;
  outline: none;
}

.custom-pct {
  position: absolute;
  right: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--is-text-dim);
  font-weight: 700;
}

.reset-console-btn {
  width: 100%;
  padding: 0.7rem;
  font-size: 0.88rem;
  margin-top: auto;
}

/* Summary Voucher Styles */
.summary-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--is-border);
}

.summary-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.15rem;
}

.summary-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--is-title);
}

.copy-voucher-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--is-primary);
  background: var(--is-bg-card);
  padding: 0.45rem 0.85rem;
  border-radius: var(--is-radius-sm);
  border: 1px solid var(--is-border);
  transition: all 0.2s;
}

.copy-voucher-btn:hover {
  border-color: var(--is-primary);
  background: var(--is-bg-card-hover);
}

.voucher-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.voucher-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.voucher-cell-lbl {
  display: flex;
  flex-direction: column;
}

.main-lbl {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--is-title);
}

.sub-lbl {
  font-size: 0.74rem;
  color: var(--is-text-dim);
}

.voucher-cell-val {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--is-title);
}

.text-cyan {
  color: var(--is-primary);
}

.voucher-divider {
  height: 1px;
  background: var(--is-border);
  margin: 0.5rem 0;
}

.voucher-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-md);
}

.total-lbl {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--is-title);
}

.voucher-total-val {
  font-size: 1.35rem;
  font-weight: 900;
  color: #10b981;
}

[data-theme="light"] .voucher-total-val {
  color: #059669;
}

.narrative-box {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-md);
  padding: 1rem 1.15rem;
  font-size: 0.84rem;
  color: var(--is-text);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.narrative-box i {
  font-size: 1.1rem;
  margin-top: 0.15rem;
  flex-shrink: 0;
}

.voucher-footer-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.76rem;
  color: var(--is-text-muted);
  font-weight: 600;
}
</style>
