import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import authConfig from './config.js'
import OktaVue from '@okta/okta-vue'
import { OktaAuth } from '@okta/okta-auth-js'
import VueIntro from 'vue-introjs'

import Router from 'vue-router'
import routes from './routes';

Vue.use(VueIntro)
Vue.use(Router)
const oktaAuth = new OktaAuth(authConfig.oidc)
Vue.use(OktaVue, { oktaAuth })

const router = new Router({mode: 'history', routes});

import 'intro.js/introjs.css';

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
