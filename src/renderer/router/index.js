import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '/connection/walkthrough',
      name: 'walkthrough',
      component: require('@/components/Connection/Walkthrough').default
    },
    {
      path: '/User/Login',
      name: 'login_app',
      component: require('@/components/User/Login').default
    },
    {
      path: '/User/PharmacyBranch',
      name: 'login_pharmacyBranch',
      component: require('@/components/User/Componets/PharmacyBranch').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
