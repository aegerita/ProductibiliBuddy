import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// load in the component that named "app"
new Vue({
  router,
  render: h => h(App),
  mounted(){
    document.title = 'Todos';
  }
}).$mount('#app')
