import Vue from 'vue/dist/vue.esm.js';
import VueRouter from 'vue-router';
import router from './router.js';
import '../css/main.css';
Vue.use(VueRouter);

let vm = new Vue({
    el: "#div1",
    data: {},
    router
})