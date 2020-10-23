

import Home from './components/home.vue';
import UserView from './components/user_view.vue';


const routes = [
    { path: '/', component: Home },
    { path: '/UserView', name:"userview", component: UserView}
];

export default routes;
