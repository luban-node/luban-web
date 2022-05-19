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
          name: 'tool',
          path: '/tool',
          component: () => import('../views/tool'),
          children: [{
            name: 'qr',
            path: 'qr',
            component: () => import('../views/qr.vue')
          },
          {
            name: 'dy_wm',
            path: 'dy/wm',
            component: () => import('../views/dy_wm.vue')
          }, {
            name: 'ocr',
            path: 'ocr',
            component: () => import('../views/ocr')
          }]
        }
      ]
    }
  ]
})
