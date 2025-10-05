import { createRouter, createWebHistory } from 'vue-router'
import AgendaView from '../views/AgendaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'agenda',
      component: AgendaView,
    },
    {
      path: '/servicos',
      name: 'servicos',
      component: () => import('../views/ServicosView.vue'),
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: () => import('../views/SobreView.vue'),
    },
  ],
})

export default router
