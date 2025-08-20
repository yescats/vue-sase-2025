import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import UserView from '@/views/UserView.vue'
import NewspotView from '@/views/NewspotView.vue'
import SpotView from '@/views/SpotView.vue'
import ChangeSpotView from '@/views/ChangeSpotView.vue'
import ChangeUserView from '@/views/ChangeUserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    },
    {
      path: '/user/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/user/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/user/me',
      name: 'user',
      component: UserView,
    },
    {
      path: '/spot/createspot',
      name: 'spot_creation',
      component: NewspotView,
    },
    {
      path: '/spot/:id/change',
      name: 'spot_change',
      component: ChangeSpotView,
    },
    {
      path: '/spot/:id',
      name: 'spot',
      component: SpotView,
    },
    {
      path: '/user/redact',
      name: 'user_change',
      component: ChangeUserView,
    },
  ],
})

export default router
