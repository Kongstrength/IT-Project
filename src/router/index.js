import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Summary from '../views/Summary.vue'
import Search from '../views/Search.vue'
import Profile from '../views/Profile.vue'
import Security from '../views/Security.vue'
import ResetPassword from '../views/ResetPassword.vue'
import TaladNearby from '../views/TaladNearby.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/summary',
      name: 'Summary',
      component: Summary
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/security',
      name: 'Security',
      component: Security
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/talad-nearby',
      name: 'TaladNearby',
      component: TaladNearby
    }
  ]
})

export default router
