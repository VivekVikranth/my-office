import Vue from 'vue'
import Router  from 'vue-router'
import store from '../store.js'

Vue.use(Router )

const routes = [
  {
    path: '/',
    name: 'UserLogin',
    component: () => import('../views/UserLogin.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/selectyouroffice',
    name: 'MyWorkLocation',
    component: () => import('../views/MyWorkLocation.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Register.vue'),
    meta: {
        guest: true
      }
  },
  {
    path: '/confirmation',
    name: 'Confirmation', 
    component: () => import('../views/confirmation.vue')
  }
]

const router = new Router ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next('/') 
    } else {
      next() 
    }
  })

export default router
