import { createRouter, createWebHistory, useRouter } from 'vue-router'
const use_Router = useRouter()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'index',
      component: () => import('../views/index.vue'),
    },

    {
      path: '/layout',
      name: 'layout',
      component: () => import('../views/layout/index.vue'),
      children:[
        {
          path: '/layout/about-us',
          name: 'about-us',
          component: () => import('../views/layout/about-us.vue')
        },
        {
          path: '/layout/faq',
          name: 'faq',
          component: () => import('../views/layout/faq.vue')
        },
        {
          path: '/layout/taxes',
          name: 'taxes',
          component: () => import('../views/layout/taxes.vue')
        },
        {
          path: '/layout/p2p',
          name: 'p2p',
          component: () => import('../views/layout/p2p.vue')
        },
        {
          path: '/layout/help',
          name: 'help',
          component: () => import('../views/layout/help.vue')
        },
        {
          path: '/layout/contact-us',
          name: 'contact-us',
          component: () => import('../views/layout/contact-us.vue')
        },
        {
          path: '/layout/rules',
          name: 'rules',
          component: () => import('../views/layout/rules.vue')
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'index' }
  },
  ]
})

export default router