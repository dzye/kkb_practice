import Vue from 'vue';
import APP from './app.vue';

import router from './routers';
new Vue({
    router,
    render: h => h(APP)
}).$mount("#app-box")