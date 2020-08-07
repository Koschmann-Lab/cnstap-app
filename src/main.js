import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import VueIntro from 'vue-introjs'


import VueRouter from 'vue-router'
import routes from './routes';

Vue.use(VueIntro)

Vue.use(VueRouter)
const router = new VueRouter({mode: 'history', routes});

import 'intro.js/introjs.css';






Vue.config.productionTip = false



new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
