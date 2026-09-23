import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import VatCalculatorView from '@/views/VatCalculatorView.vue';
import ServerStatusView from '@/views/ServerStatusView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/vat-calculator',
    name: 'vat-calculator',
    component: VatCalculatorView
  },
  {
    path: '/status',
    name: 'status',
    component: ServerStatusView
  },
  {
    path: '/server-status',
    redirect: '/status'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

export default router;
