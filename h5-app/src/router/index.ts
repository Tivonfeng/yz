import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Page2 from '@/views/Page2.vue'
import Page3 from '@/views/Page3.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/page2',
      name: 'page2',
      component: Page2
    },
    {
      path: '/page3',
      name: 'page3',
      component: Page3
    }
  ]
})

export default router