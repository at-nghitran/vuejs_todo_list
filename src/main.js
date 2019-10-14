import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { dom } from '@fortawesome/fontawesome-svg-core'
import { config } from '@fortawesome/fontawesome-svg-core'
import  "./stylling/styles.scss"; 
import responsive from 'vue-responsive'

config.autoA11y = true
config.dataSearchPseudoElements = true
dom.watch()
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(responsive)

new Vue({
  render: h => h(App)
}).$mount('#app')
