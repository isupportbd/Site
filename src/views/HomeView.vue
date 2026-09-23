<script setup lang="ts">
import Hero from '@/components/Hero.vue';
import SystemStats from '@/components/SystemStats.vue';
import ProductShowcase from '@/components/ProductShowcase.vue';
import VatCalculatorWidget from '@/components/VatCalculatorWidget.vue';
import TechStack from '@/components/TechStack.vue';
import Services from '@/components/Services.vue';
import FaqSection from '@/components/FaqSection.vue';
import ContactSection from '@/components/ContactSection.vue';
</script>

<template>
  <main class="home-page">
    <Hero />
    <SystemStats />
    <ProductShowcase />
    <VatCalculatorWidget />
    <TechStack />
    <Services />
    <FaqSection />
    <ContactSection />
  </main>
</template>

<style scoped>
.home-page {
  position: relative;
  overflow: hidden;
}
</style>
