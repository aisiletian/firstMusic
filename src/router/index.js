import Vue from 'vue'
import Router from 'vue-router'

import Recomender from '../components/recomender/recomender'
import Singer from '../components/singer/singer'
import Ranking from '../components/ranking/ranking'
import Search from '../components/search/search'
import Detail from '../components/detail/detail'

Vue.use(Router)

const routes = [
  {
    path: '/recomender',
    component: Recomender,
    children: [{
      path: '/recomender/:page',
      component: Detail
    }]
  },
  {
    path: '/singer',
    component: Singer,
    children: [{
      path: '/singer/:page',
      component: Detail
    }]
  },
  {
    path: '/ranking',
    component: Ranking,
    children: [{
      path: '/ranking/:number',
      component: Detail
    }]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '*',
    redirect: '/recomender'
  }
]

export default new Router({ routes })
