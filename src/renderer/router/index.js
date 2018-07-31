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
      path: '/walkthrough/walkthroughsteps',
      name: 'walkthrough',
      component: require('@/components/Connection/WalkthroughSteps').default
    },
    {
      path: '/user/login',
      name: 'login_app',
      component: require('@/components/User/UserLogin').default
    },
    {
      path: '/user/userpharmacybranch',
      name: 'login_pharmacyBranch',
      component: require('@/components/User/Componets/UserPharmacyBranch').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
