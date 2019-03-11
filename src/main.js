import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';

import App from '@/app.vue';
import Util from '@/libs/util';
import store from '@/store';
import config from '@/config/config';
import Routers from '@/router';
import requestConfig from '@/requestConfig'; // 引入axios库和配置

import 'iview/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.use(iView);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

// 每个组件都可以使用 this.$axios 的形式进行访问
Vue.prototype.$axios = requestConfig.axios;
// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});
router.afterEach(route => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

let myApp = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

Util.title(config.env);
// 启动 axios 配置
requestConfig.bootConfig(myApp);