import { createRouter, createWebHistory } from 'vue-router'
import AgendaView from '../AgendaView.vue'

// Adicione esta declaração para corrigir o erro do TypeScript
interface ImportMetaEnv {
  BASE_URL: string;
  [key: string]: any;
}

interface ImportMeta {
  env: ImportMetaEnv;
}

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
      component: () => import('../ServicosView.vue'),
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: () => import('../SobreView.vue'),
    },
  ],
})

export default router
