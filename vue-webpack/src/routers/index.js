import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import home from '@/home.vue';

export default new VueRouter({
    routes: [{
        path: '/home',
        component: home,
        name: 'home'
    }]
})