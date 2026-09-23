<script setup lang="ts">
import { ref } from 'vue';
import { contactInfo, productsData } from '@/data/isupportData';

const form = ref({
  name: '',
  phone: '',
  email: '',
  product: 'IDP',
  message: ''
});

const isSubmitting = ref(false);
const submitSuccess = ref(false);

async function handleSubmit() {
  if (!form.value.name || !form.value.phone) {
    alert('Please enter your Name and Mobile / WhatsApp number.');
    return;
  }

  isSubmitting.value = true;
  // Send via WhatsApp URL redirect or simulate quick API submission
  setTimeout(() => {
    isSubmitting.value = false;
    submitSuccess.value = true;

    // Direct WhatsApp pre-filled chat link
    const text = encodeURIComponent(`Hi iSupportBD Team,
My name is: ${form.value.name}
Phone: ${form.value.phone}
Interested in: ${form.value.product}
Message: ${form.value.message || 'I would like to request a live demo / pricing details.'}`);
    
    window.open(`https://wa.me/8801719950891?text=${text}`, '_blank');
  }, 600);
}
</script>

<template>
  <section id="contact" class="is-section contact-section">
    <div class="is-container">
      <!-- Section Header -->
      <div class="is-section-header">
        <div class="is-section-tag">
          <i class="bi bi-chat-dots-fill"></i>
          <span>Direct Communication</span>
        </div>
        <h2 class="is-section-title">
          Get in Touch with <span class="gradient-text">iSupportBD</span>
        </h2>
        <p class="is-section-desc">
          Speak directly with our technical leads for software onboarding, custom ERP development, or VAT consultancy.
        </p>
      </div>

      <div class="contact-grid">
        <!-- Contact Info Cards -->
        <div class="contact-info-col">
          <!-- WhatsApp / Phone Card -->
          <a :href="contactInfo.whatsappUrl" target="_blank" rel="noopener" class="is-card contact-channel-card whatsapp-channel">
            <div class="ch-icon"><i class="bi bi-whatsapp"></i></div>
            <div class="ch-body">
              <span class="ch-sub">Mobile & WhatsApp (Instant Support)</span>
              <span class="ch-main font-mono">{{ contactInfo.phoneDisplay }}</span>
              <span class="ch-status"><i class="bi bi-circle-fill dot-live"></i> Online 24/7 for Inquiries</span>
            </div>
            <i class="bi bi-arrow-right ch-arrow"></i>
          </a>

          <!-- Email Card -->
          <a :href="'mailto:' + contactInfo.email" class="is-card contact-channel-card">
            <div class="ch-icon email-icon"><i class="bi bi-envelope-at-fill"></i></div>
            <div class="ch-body">
              <span class="ch-sub">Official Email Address</span>
              <span class="ch-main">{{ contactInfo.email }}</span>
              <span class="ch-status">Response within 2 hours</span>
            </div>
            <i class="bi bi-arrow-right ch-arrow"></i>
          </a>

          <!-- Web Portal Card -->
          <a :href="contactInfo.website" target="_blank" rel="noopener" class="is-card contact-channel-card">
            <div class="ch-icon web-icon"><i class="bi bi-globe2"></i></div>
            <div class="ch-body">
              <span class="ch-sub">Official Web Domain</span>
              <span class="ch-main">isupportbd.com</span>
              <span class="ch-status">Global & Local Services</span>
            </div>
            <i class="bi bi-arrow-right ch-arrow"></i>
          </a>

          <!-- Office Location Info -->
          <div class="location-banner">
            <i class="bi bi-geo-alt-fill text-cyan"></i>
            <span>{{ contactInfo.location }} — Serving clients nationwide across Bangladesh.</span>
          </div>
        </div>

        <!-- Consultation Request Form -->
        <div class="contact-form-col">
          <div class="is-card form-card">
            <h3 class="form-title">
              <i class="bi bi-send-fill text-cyan"></i>
              <span>Request Software Demo / Consultation</span>
            </h3>

            <div v-if="submitSuccess" class="success-box">
              <i class="bi bi-check-circle-fill text-emerald-500 text-2xl"></i>
              <div>
                <h4 class="font-bold text-emerald-400">Thank You! Redirecting to WhatsApp...</h4>
                <p class="text-xs text-slate-300 mt-1">Our team will respond promptly. You can also call directly at {{ contactInfo.phoneDisplay }}.</p>
              </div>
            </div>

            <form v-else @submit.prevent="handleSubmit" class="inquiry-form">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Your Name / Firm *</label>
                  <input 
                    v-model="form.name" 
                    type="text" 
                    placeholder="e.g. Mijanur Rahman"
                    required
                    class="form-input"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Mobile / WhatsApp *</label>
                  <input 
                    v-model="form.phone" 
                    type="tel" 
                    placeholder="01719950891"
                    required
                    class="form-input"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Email Address (Optional)</label>
                  <input 
                    v-model="form.email" 
                    type="email" 
                    placeholder="name@example.com"
                    class="form-input"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Select Product / System</label>
                  <select v-model="form.product" class="form-input form-select">
                    <option v-for="prod in productsData" :key="prod.id" :value="prod.name">
                      {{ prod.name }} ({{ prod.tagline }})
                    </option>
                    <option value="Custom Software">Custom ERP / Software Development</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Requirements or Message</label>
                <textarea 
                  v-model="form.message" 
                  rows="3" 
                  placeholder="Tell us about your firm's requirements, monthly invoice volume, or branch setup..."
                  class="form-input form-textarea"
                ></textarea>
              </div>

              <button 
                type="submit" 
                class="is-btn is-btn-primary submit-btn"
                :disabled="isSubmitting"
              >
                <i v-if="isSubmitting" class="bi bi-arrow-repeat animate-spin"></i>
                <i v-else class="bi bi-whatsapp"></i>
                <span>{{ isSubmitting ? 'Processing...' : 'Submit & Connect via WhatsApp' }}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  background: var(--is-bg);
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

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 860px) {
  .contact-grid {
    grid-template-columns: 1fr 1.2fr;
  }
}

.contact-info-col {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.contact-channel-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem 1.35rem;
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  box-shadow: var(--is-shadow-sm);
  transition: transform 0.2s, border-color 0.2s;
}

.contact-channel-card:hover {
  transform: translateX(4px);
  border-color: var(--is-primary);
}

.whatsapp-channel {
  border-color: rgba(37, 211, 102, 0.35);
}

.whatsapp-channel:hover {
  border-color: #25d366;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.2);
}

.ch-icon {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  background: rgba(37, 211, 102, 0.15);
  color: #25d366;
  flex-shrink: 0;
}

.email-icon {
  background: rgba(0, 210, 255, 0.15);
  color: var(--is-primary);
}

.web-icon {
  background: rgba(168, 85, 247, 0.15);
  color: var(--is-accent-purple);
}

.ch-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

.ch-sub {
  font-size: 0.74rem;
  color: var(--is-text-muted);
  font-weight: 500;
}

.ch-main {
  font-size: 1.02rem;
  font-weight: 800;
  color: var(--is-title);
}

.ch-status {
  font-size: 0.74rem;
  color: var(--is-text-muted);
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.15rem;
}

.dot-live {
  font-size: 0.5rem;
  color: #10b981;
}

.ch-arrow {
  color: var(--is-text-dim);
  font-size: 0.95rem;
  transition: transform 0.2s;
}

.contact-channel-card:hover .ch-arrow {
  transform: translateX(3px);
  color: var(--is-primary);
}

.location-banner {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-md);
  font-size: 0.8rem;
  color: var(--is-text);
  box-shadow: var(--is-shadow-sm);
}

/* Form */
.form-card {
  padding: 1.5rem;
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  box-shadow: var(--is-shadow-sm);
}

.form-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--is-title);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.inquiry-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 580px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--is-text);
}

.form-input {
  width: 100%;
  padding: 0.6rem 0.85rem;
  background: var(--is-bg-surface);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-md);
  color: var(--is-text);
  font-size: 0.85rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}

.form-input:focus {
  border-color: var(--is-primary);
  box-shadow: 0 0 0 2px var(--is-primary-glow);
}

.form-select {
  cursor: pointer;
}

.form-select option {
  background: var(--is-bg-card);
  color: var(--is-text);
}

.form-textarea {
  resize: vertical;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  font-size: 0.92rem;
  margin-top: 0.25rem;
}

.success-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.4);
  border-radius: var(--is-radius-md);
}

.text-cyan {
  color: var(--is-primary);
}
</style>
