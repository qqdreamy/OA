import Vue from 'vue'
import Router from 'vue-router'
import update from '@/view/update.md'
import PriceSet from '@/view/PriceSet'
import Bag from '@/view/Bag'
import PaperTransform from '@/view/PaperTransform'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'update',
      component: update
    }, {
      path: '/PriceSet',
      name: 'PriceSet',
      component: PriceSet
    }, {
      path: '/Bag',
      name: 'Bag',
      component: Bag
    }, {
      path: '/PaperTransform',
      name: 'PaperTransform',
      component: PaperTransform
    }
  ]
})
