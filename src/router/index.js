/**
 * Created by jiangtao on 2017/5/17.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routers = [
    {
        path: '/',
        redirect: '/home/topics/good'
    },
    {
        path: '/home',
        name:'home',
        redirect: '/home/topics/good',
        component:require("./../views/index.vue"),
        children:[
            {
                path: 'topics',
                name: "topics",
                redirect: '/home/topics/good',
                component: require("./../components/tpl.vue"),
                children:[
                    {
                        path: ':category',
                        name:"category",
                        component:  ( resolve ) => {
                            require( ['../views/indexChild.vue'] , resolve )
                        }
                    },
                ]
            },
            {
                path:'release',
                name:'release',
                component:( resolve ) => {
                    require( ['../views/release.vue'] , resolve )
                }
            },
            {
                path: 'my',
                name:'my',
                exact:true,
                component: ( resolve ) => {
                    require( ['../views/my.vue'] , resolve )
                }
            },
            {
                path: 'message',
                name:'message',
                component:( resolve ) => {
                    require( ['../views/message.vue'] , resolve )
                }
            }
        ]
    },
    {
        path: '/detail/:id',
        name:'detail',
        component: ( resolve ) => {
            require( ['../views/detail.vue'] , resolve )
        }
    },
    {
        path: '/usr/:id',
        name:'user',
        component: ( resolve ) => {
            require( ['../views/user.vue'] , resolve )
        }
    },
    {
        path: '/login/:srouce',
        name:'login',
        component: ( resolve ) => {
            require( ['../views/login.vue'] , resolve )
        }
    },

];

export default new VueRouter({
    history: true,
    routes:routers
});


