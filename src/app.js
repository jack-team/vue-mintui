/**
 * Created by jiangtao on 2017/5/17.
 */

import Vue from 'vue';

import 'mint-ui/lib/style.css';
//根组件
import App from './components/App.vue';

import router from './router';

import Mint from 'mint-ui';
Vue.use(Mint);

// 开启debug模式
Vue.config.debug = true;

new Vue({
    render: ( h )=> h ( App ),
    router:router
}).$mount('#root');






