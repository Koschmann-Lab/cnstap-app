

import Home from './components/home.vue';
import UserView from './components/user_view.vue';
import { LoginCallback } from '@okta/okta-vue'


const routes = [
    { path: '/', component: Home },
    { path: '/login/callback', component: LoginCallback},
    { path: '/UserView', name:"userview", component: UserView,  meta: {requiresAuth: true}}
];

export default routes;
