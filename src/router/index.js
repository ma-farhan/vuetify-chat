import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Signup from '@/components/Signup.vue'
import Login from '@/components/Login.vue'
import Chat from '@/components/Chat.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/login', name: 'Login', component: Login },
  { path: '/chat', name: 'Chat', component: Chat },
  { path: '/chat/:user', component: Chat },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
