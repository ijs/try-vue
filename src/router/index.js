import Vue from 'vue'
import routes from './map'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  base: '',
  routes: Object.keys(routes).reduce((previous, current) => {
    return (previous.push({path: current, ...routes[current]}), previous)
  }, []).concat({
    path: '*',
    redirect: '/excel'
  }),
  // eslint-disable-next-line
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
router.beforeEach((to, from, next) => {
  to.matched.filter(({meta}) => meta.title).map(({meta}) => document.title = meta.title)
  next()
})

export default router
