import Vue from 'vue'
import App from './App.vue'
import './stylling/styles.scss'
import responsive from 'vue-responsive'
import 'es6-promise/auto'
import VueRouter from 'vue-router'
import router from './router'
import store from './stores/todos';

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(router)
Vue.use(responsive)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
