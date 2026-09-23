<script setup lang="ts">
import { contactInfo, productsData } from '@/data/isupportData';
</script>

<template>
  <footer class="site-footer">
    <div class="is-container">
      <!-- Main Footer Grid in a Card -->
      <div class="is-card footer-card">
        <div class="footer-grid">
          <!-- Brand Column -->
          <div class="footer-brand-col">
            <router-link to="/" class="footer-brand">
              <span class="brand-badge"><i class="bi bi-shield-shaded"></i></span>
              <span class="brand-title">iSupport<span class="brand-accent">BD</span></span>
            </router-link>
            <p class="brand-desc">
              Next-generation enterprise software, smart VAT automation, and cloud-native digital infrastructure engineered in Bangladesh.
            </p>
            <div class="footer-badge-pill">
              <i class="bi bi-patch-check-fill text-cyan"></i>
              <span>High-Performance Enterprise & Software Platforms</span>
            </div>
          </div>

          <!-- Software Ecosystem Links -->
          <div class="footer-links-col">
            <h4 class="col-heading">Software Ecosystem</h4>
            <ul class="footer-links">
              <li v-for="prod in productsData.slice(0, 5)" :key="prod.id">
                <a v-if="prod.url.startsWith('http')" :href="prod.url" target="_blank" rel="noopener">
                  {{ prod.name }} <i class="bi bi-arrow-up-right link-ext"></i>
                </a>
                <router-link v-else-if="prod.url.startsWith('/')" :to="prod.url">
                  {{ prod.name }}
                </router-link>
                <a v-else href="#products">
                  {{ prod.name }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Quick Navigation -->
          <div class="footer-links-col">
            <h4 class="col-heading">Navigation & About</h4>
            <ul class="footer-links">
              <li>
                <!-- About redirects to isupportbd.com per user instruction -->
                <a :href="contactInfo.website" target="_blank" rel="noopener" class="about-link">
                  <span>About iSupportBD</span>
                  <i class="bi bi-box-arrow-up-right link-ext"></i>
                </a>
              </li>
              <li><a href="#services">Enterprise Services</a></li>
              <li><router-link to="/status">Server Status & Health</router-link></li>
              <li><a href="#vat-tool">VAT Calculator</a></li>
              <li><a href="#tech-stack">System Architecture</a></li>
              <li><a href="#faq">Frequently Asked Questions</a></li>
            </ul>
          </div>

          <!-- Direct Contact Details -->
          <div class="footer-links-col contact-col">
            <h4 class="col-heading">Contact Us</h4>
            <ul class="contact-details">
              <li>
                <i class="bi bi-whatsapp text-emerald-500"></i>
                <div class="contact-item-wrap">
                  <span class="detail-label">Mobile & WhatsApp:</span>
                  <a :href="contactInfo.whatsappUrl" target="_blank" rel="noopener" class="detail-val font-mono">
                    {{ contactInfo.phoneDisplay }}
                  </a>
                </div>
              </li>
              <li>
                <i class="bi bi-envelope-at text-cyan"></i>
                <div class="contact-item-wrap">
                  <span class="detail-label">Email:</span>
                  <a :href="'mailto:' + contactInfo.email" class="detail-val">
                    {{ contactInfo.email }}
                  </a>
                </div>
              </li>
              <li>
                <i class="bi bi-globe text-purple-500"></i>
                <div class="contact-item-wrap">
                  <span class="detail-label">Official Portal:</span>
                  <a :href="contactInfo.website" target="_blank" rel="noopener" class="detail-val">
                    isupportbd.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Copyright Ribbon -->
      <div class="footer-bottom">
        <div class="copyright-text">
          © iSupportBD 2026-2029 💖 created by <a :href="contactInfo.website" target="_blank" rel="noopener" class="creator-link">Md. Mijanur Rahman</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--is-bg);
  padding: 2.5rem 0 2rem;
  color: var(--is-text-muted);
}

.footer-card {
  padding: 2.5rem 2rem;
  margin-bottom: 2rem;
  background: var(--is-bg-card);
  border: 1px solid var(--is-border);
  border-radius: var(--is-radius-lg);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 640px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
    gap: 2.25rem;
  }
}

.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.85rem;
}

.brand-badge {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #00d2ff 0%, #3b82f6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #080c14;
  font-size: 1rem;
}

.brand-title {
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--is-title);
}

.brand-accent {
  color: var(--is-primary);
}

.brand-desc {
  font-size: 0.84rem;
  color: var(--is-text-muted);
  line-height: 1.55;
  margin-bottom: 1rem;
  max-width: 320px;
}

.footer-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.74rem;
  color: var(--is-text);
  background: var(--is-bg-card);
  padding: 0.35rem 0.65rem;
  border-radius: var(--is-radius-sm);
  border: 1px solid var(--is-border);
}

.col-heading {
  font-size: 0.88rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--is-title);
  margin-bottom: 1rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.footer-links a {
  font-size: 0.84rem;
  color: var(--is-text-muted);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.footer-links a:hover {
  color: var(--is-primary);
  transform: translateX(2px);
}

.link-ext {
  font-size: 0.65rem;
  opacity: 0.7;
}

.contact-details {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.contact-details li {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.84rem;
}

.contact-item-wrap {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 0.72rem;
  color: var(--is-text-dim);
}

.detail-val {
  color: var(--is-title);
  font-weight: 700;
  font-size: 0.86rem;
}

.detail-val:hover {
  color: var(--is-primary);
}

.footer-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.86rem;
  text-align: center;
}

.copyright-text {
  color: var(--is-text-muted);
  font-weight: 500;
}

.creator-link {
  color: var(--is-primary);
  font-weight: 700;
}

.creator-link:hover {
  text-decoration: underline;
}

.footer-meta-links {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--is-text-dim);
  font-size: 0.78rem;
}

.separator {
  opacity: 0.4;
}

.text-cyan { color: var(--is-primary); }
</style>
