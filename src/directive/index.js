/**
 * Created by jiangtao on 2017/6/11.
 */


import Vue from 'vue';

//点击反馈
Vue.directive("touchactive", {
    bind: function ( el  , event ) {
        const { value } = event ;
        el.addEventListener("touchstart" , function ( e ) {
            el.style.backgroundColor = value;
            e.preventDefault();
        });

        el.addEventListener("touchend" , function ( e ) {
            el.removeAttribute("style");
            e.preventDefault();
        });
    },
    update: function (newValue, oldValue) {

    },
    unbind: function ( el ) {
        el.removeEventListener("touchstart",function () {});
        el.removeEventListener("touchend",function () {});
    }
});


Vue.directive("bindIscroll", {
    componentUpdated:function ( el , event ) {
        const { value } = event;
        value();
    }
});

