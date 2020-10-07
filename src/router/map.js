export default {
  '/excel': {
    name: 'excel',
    meta: {
      title: '使用Web Worker读取Excel数据'
    },
    component: () => import('../components/excel/index.vue')
  }
}
