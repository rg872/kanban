import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import stageNumber from './views/stage-number-select.vue'
import StageSetup from './views/stage-setup.vue'
import ListSetup from './views/list-setup.vue'
import MemberSetup from './views/member-setup.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/stage-number',
      name: 'stage-number',
      component: stageNumber
    },
    {
      path: '/stage-setup',
      name: 'stage-setup',
      component: StageSetup
    },
    {
      path: '/list-setup',
      name: 'list-setup',
      component: ListSetup
    },
    {
      path: '/member-setup',
      name: 'member-setup',
      component: MemberSetup
    }
  ]
})
