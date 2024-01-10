export default {
  '/excel': {
    name: 'excel',
    meta: {
      title: '使用Web Worker读取Excel数据'
    },
    component: () => import('../components/excel/index.vue')
  },
  '/fetch': {
    name: 'fetch',
    meta: {
      title: '使用Web Worker读取Fetch数据, 清洗, 共享'
    },
    component: () => import('../components/fetch/index.vue')
  },
  '/broadcast': {
    name: 'broadcast',
    meta: {
      title: 'broadcast Channel API'
    },
    component: () => import('../components/broadcast/index.vue')
  }
}
