<template>
    <transition
            appear
            name="slide-fade"
            v-on:leave="leave"
    >
        <div class="user-page">
            <div class="content scroll">
                <div class="top-box">
                    <div class="cover" :style="{backgroundImage:'url(./../image/headimg-bg.jpg)'}">
                        <div class="avator-image-wrap"  @click="login()">
                            <div  v-if="!Access_Token">点击登录</div>
                            <div class="avator-image" v-if="myInfo.avatar_url" :style="{backgroundImage:'url('+myInfo.avatar_url+')'}"/>
                        </div>
                        <div class="user-name">{{!!Access_Token?myInfo.loginname :""}}</div>
                    </div>
                </div>
                <div class="line-group">
                    <router-link tag="div" to="/home/release" class="line" v-touchactive="'#f8f8f8'">
                        <div class="icon">
                            <i class="fa fa-paper-plane"></i>
                        </div>
                        <div class="line-content">发表主题</div>
                        <div class="arrow">
                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                        </div>
                    </router-link>
                    <router-link tag="div" to="/home/message" class="line" v-touchactive="'#f8f8f8'">
                        <div class="icon">
                            <i class="fa fa-envelope"></i>
                        </div>
                        <div class="line-content">我的消息</div>
                        <div class="arrow">
                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                        </div>
                    </router-link>
                </div>
                <button v-if="!!Access_Token" class="un-login" @click="unlogin" v-touchactive="'red'">退出登录</button>
            </div>
        </div>
    </transition>

</template>
<style scoped lang="sass">
    @import "./../styles/user.scss";
</style>
<script type="es6">

    import types from './../store/types/user';

    import { mapActions , mapState } from 'vuex';

    export default{
        created () {

        },
        beforeDestroy () {

        },
        computed: mapState({
            myInfo: state => {
                return state.user.myInfo
            },
            Access_Token:state => {
                return state.user.Access_Token
            },
        }),
        data(){
            return{
                ...mapActions({
                    getMy: types.GET_MY,
                    unLogin:types.UNLOGIN
                })
            }
        },

        mounted(){
            this.Access_Token && this.getMy(this.Access_Token);
        },
        methods: {
            getTime( time ){
                return  getFormatTime(time);
            },
            login(){
                const { Access_Token } = this;
                const { loginname } = this.myInfo;
                const { $router } = this;
                if(!!Access_Token && !!loginname) {
                    $router.push({
                        name:"user",
                        params:{
                            id:loginname
                        }
                    })
                } else {
                    $router.push({
                        name:"login",
                        params:{
                            srouce:"my"
                        }
                    })
                }
            },
            leave(el,done){
                done()
            },
            unlogin(){
                confirm("退出登录?" , ()=> this.unLogin() );
            }
        },
        components:{

        }
    }
</script>
