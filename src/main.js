import Vue from 'vue'
import App from './App.vue'
import './stylling/styles.scss'
import responsive from 'vue-responsive'
import 'es6-promise/auto'
import store from './stores/todos';

Vue.config.productionTip = false
Vue.use(responsive)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
