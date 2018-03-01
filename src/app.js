/**
 * Created by jiangtao on 2017/5/17.
 */

import Vue from 'vue';


import 'swiper/dist/css/swiper.min.css';

//根组件
import App from './components/App.vue';

import router from './router';

import store from './store'

import './directive';

// 开启debug模式
Vue.config.debug = true;

new Vue({
    render: ( h )=> h ( App ),
    store:  store,
    router: router
}).$mount('#app');






