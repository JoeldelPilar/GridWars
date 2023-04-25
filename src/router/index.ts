import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import gameView from '../views/gameView.vue'
import resultView from '@/views/resultView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView
    },
    {
      path: '/game',
      name: 'game',
      component: gameView
     
    }
    ,
    {
      path: '/result',
      name: 'result',
      component: resultView
     
    }
  ]
})

export default router
