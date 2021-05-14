import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import toast from 'components/common/toast/index'
//引入
import fastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
//初始化FastClick实例。在页面的DOM文档加载完成后
fastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(toast)
Vue.use(VueLazyload, {
  preLoad: 1,
  loading:  require('assets/img/common/lazy.gif'),
  attempt: 1
  })

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
