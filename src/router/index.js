import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/HomeView.vue')
    },
     {
      path: '/history',
      name: 'history',
      component: () => import('../components/HistoryView.vue')
    },
     {
      path: '/news',
      name: 'news',
      component: () => import('../components/NewsView.vue')
    },
     {
      path: '/exchangerate',
      name: 'exchangerate',
      component: () => import('../components/ExchangeRateView.vue')
    },
    {
      path: '/loan',
      name: 'loan',
      component: () => import('../components/LoanView.vue')
    },
  ]
})

export default router
