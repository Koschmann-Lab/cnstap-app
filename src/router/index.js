import Vue from 'vue'
import Router from 'vue-router'
import OktaVue, { LoginCallback } from '@okta/okta-vue'
import { OktaAuth } from '@okta/okta-auth-js'
import authConfig from '@/config'
import Home from '../components/home.vue';
import UserView from '../components/user_view.vue';
import BatchView from '../components/batch_view.vue';
import VueMeta from 'vue-meta';

Vue.use(Router)
Vue.use(VueMeta)
const oktaAuth = new OktaAuth(authConfig.oidc)
Vue.use(OktaVue, { oktaAuth })

const router = new Router({
  mode: 'history',
  routes: [
      { path: '/', component: Home },
      { path: '/login/callback', component: LoginCallback},
      { path: '/UserView', name:"userview", component: UserView,  meta: {requiresAuth: true}},
      { path: '/BatchView', name:"batchview", component: BatchView,  meta: {requiresAuth: true}}

  ]
});

export default router;
