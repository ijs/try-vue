import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/base.css'
Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
