import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// load in the component that named "app"
new Vue({
  render: h => h(App),
}).$mount('#app')
