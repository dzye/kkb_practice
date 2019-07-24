import VueRouter from 'vue-router';
import header from './components/header.js';
import home from './components/home.js';
import new1 from './components/new1.js';
export default new VueRouter({
    routes: [{
            path: '/',
            name: 'index',
            components: {
                header: header,
                default: home
            }
        },
        {
            path: '/news',
            name: 'news',
            components: {
                header: header,
                default: new1
            }
        }
    ]
})