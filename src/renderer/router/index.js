import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
    },
    {
      path: '/todos',
      name: 'todos',
      component: require('@/components/TodosPage').default,
    },
    {
      path: '/notes',
      name: 'notes',
      component: require('@/components/NotePage').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})
