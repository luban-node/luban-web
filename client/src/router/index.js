import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'index',
      path: '/',
      component: () => import('../views/index.vue'),
      children: [
        {
          name: 'qr',
          path: '/qr',
          component: () => import('../views/qr.vue')
        }
      ]
    }
  ]
})
