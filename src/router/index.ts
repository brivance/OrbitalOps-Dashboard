import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import SatelliteDetailView from '../views/SatelliteDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/satellites/:id',
      name: 'satellite-detail',
      component: SatelliteDetailView,
    },
  ],
})

export default router
