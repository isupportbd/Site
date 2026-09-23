<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const currentTheme = ref<'dark' | 'light'>('dark');

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

function toggleTheme() {
  currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme.value);
}

function applyTheme(theme: 'dark' | 'light') {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem('isupport_theme', theme);
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  const saved = localStorage.getItem('isupport_theme') as 'dark' | 'light' | null;
  if (saved) {
    currentTheme.value = saved;
    applyTheme(saved);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header 
    class="is-navbar"
    :class="{ 'is-navbar-scrolled': isScrolled }"
  >
    <div class="is-container d-flex align-items-center justify-content-between h-100">
      <!-- Logo -->
      <router-link to="/" class="is-logo d-flex align-items-center gap-2">
        <div class="is-logo-badge">
          <span>iS</span>
        </div>
        <div class="d-flex flex-column">
          <span class="is-logo-text">iSupport<span class="is-logo-accent">BD</span></span>
          <span class="is-logo-tag">Digital Enterprise Systems</span>
        </div>
      </router-link>

      <!-- Desktop Nav Links -->
      <nav class="is-nav-links d-none d-lg-flex align-items-center gap-4">
        <router-link to="/" class="nav-item">Ecosystem</router-link>
        <a href="#products" class="nav-item">Products</a>
        <a href="#vat-tool" class="nav-item">VAT Calculator</a>
        <a href="#tech-stack" class="nav-item">Architecture</a>
        <a href="#services" class="nav-item">Services</a>
        <a href="#faq" class="nav-item">FAQ</a>
        <a href="#contact" class="nav-item">Contact</a>
      </nav>

      <!-- Right Action: Theme Switcher Only -->
      <div class="d-none d-sm-flex align-items-center gap-2">
        <button 
          class="theme-toggle-btn"
          :title="currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          @click="toggleTheme"
        >
          <i v-if="currentTheme === 'dark'" class="bi bi-sun-fill text-amber-400"></i>
          <i v-else class="bi bi-moon-stars-fill text-indigo-500"></i>
          <span class="theme-label">{{ currentTheme === 'dark' ? 'Light' : 'Dark' }}</span>
        </button>
      </div>

      <!-- Mobile Actions (Theme + Hamburger) -->
      <div class="d-flex d-lg-none align-items-center gap-2">
        <button 
          class="theme-toggle-btn mobile-theme-btn"
          @click="toggleTheme"
          aria-label="Toggle Theme"
        >
          <i v-if="currentTheme === 'dark'" class="bi bi-sun-fill text-amber-400"></i>
          <i v-else class="bi bi-moon-stars-fill text-indigo-500"></i>
        </button>

        <button 
          class="is-mobile-toggle"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          aria-label="Toggle Menu"
        >
          <i :class="isMobileMenuOpen ? 'bi bi-x-lg' : 'bi bi-list'" class="fs-4"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div 
      v-if="isMobileMenuOpen" 
      class="is-mobile-menu d-lg-none"
      @click="isMobileMenuOpen = false"
    >
      <div class="is-container py-3 d-flex flex-column gap-2">
        <router-link to="/" class="mobile-nav-item">Ecosystem</router-link>
        <a href="#products" class="mobile-nav-item">Products & Apps</a>
        <a href="#vat-tool" class="mobile-nav-item">VAT Calculator</a>
        <a href="#tech-stack" class="mobile-nav-item">System Architecture</a>
        <a href="#services" class="mobile-nav-item">Services</a>
        <a href="#faq" class="mobile-nav-item">FAQ</a>
        <a href="#contact" class="mobile-nav-item">Contact Us</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.is-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 68px;
  background: var(--is-bg-glass);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--is-border);
  z-index: 1050;
  transition: all 0.25s ease;
}

.is-navbar-scrolled {
  background: var(--is-bg-surface);
  box-shadow: var(--is-shadow-md);
}

.d-flex { display: flex; }
.align-items-center { align-items: center; }
.justify-content-between { justify-content: space-between; }
.flex-column { flex-direction: column; }
.h-100 { height: 100%; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1.5rem; }
.py-3 { padding-top: 1rem; padding-bottom: 1rem; }
.w-100 { width: 100%; }

@media (max-width: 991px) {
  .d-lg-none { display: block; }
  .d-none.d-lg-flex { display: none !important; }
}
@media (min-width: 992px) {
  .d-lg-none { display: none !important; }
  .d-none.d-lg-flex { display: flex !important; }
}
@media (max-width: 575px) {
  .d-none.d-sm-flex { display: none !important; }
}

/* Logo */
.is-logo {
  text-decoration: none;
}
.is-logo-badge {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, #00d2ff 0%, #3b82f6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #080c14;
  font-weight: 900;
  font-size: 1.1rem;
  box-shadow: 0 0 14px rgba(0, 210, 255, 0.4);
}
.is-logo-text {
  font-size: 1.22rem;
  font-weight: 800;
  color: var(--is-title);
  letter-spacing: -0.02em;
  line-height: 1.1;
}
.is-logo-accent {
  color: var(--is-primary);
}
.is-logo-tag {
  font-size: 0.68rem;
  color: var(--is-text-dim);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* Nav links */
.nav-item {
  color: var(--is-text-muted);
  font-size: 0.88rem;
  font-weight: 600;
  padding: 0.35rem 0;
  position: relative;
}
.nav-item:hover {
  color: var(--is-primary);
}
.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--is-primary);
  transition: width 0.2s ease;
  border-radius: 2px;
}
.nav-item:hover::after {
  width: 100%;
}

/* Theme Toggle Button */
.theme-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.75rem;
  border-radius: var(--is-radius-md);
  background: var(--is-bg-surface);
  border: 1px solid var(--is-border);
  color: var(--is-text);
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.theme-toggle-btn:hover {
  background: var(--is-bg-card-hover);
  border-color: var(--is-primary);
}

.mobile-theme-btn {
  padding: 0.45rem 0.55rem;
  font-size: 1rem;
}

.theme-label {
  font-size: 0.76rem;
}

.text-amber-400 { color: #fbbf24; }
.text-indigo-500 { color: #6366f1; }

/* Mobile Toggle */
.is-mobile-toggle {
  color: var(--is-text);
  padding: 0.25rem 0.5rem;
}
.is-mobile-menu {
  background: var(--is-bg-surface);
  border-bottom: 1px solid var(--is-border);
  box-shadow: var(--is-shadow-md);
}
.mobile-nav-item {
  color: var(--is-text);
  font-size: 0.92rem;
  font-weight: 600;
  padding: 0.45rem 0;
}
.mobile-nav-item:hover {
  color: var(--is-primary);
}
</style>
