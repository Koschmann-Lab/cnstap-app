import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueIntro from 'vue-introjs'
import 'intro.js/introjs.css';
import router from './router/index.js'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
Vue.use(VueIntro)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
