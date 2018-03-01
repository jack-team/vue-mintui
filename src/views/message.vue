<template>
    <div>
        <div class="message-page scroll">
           <ul class="message-ul">
               <li class="message-list" v-for="item in messageList">
                   <div class="avator" :style="{backgroundImage:'url('+item.author.avatar_url+')'}" @click="goUser(item.author.loginname)"/>
                   <div class="content">
                       <div class="top">
                           <span class="user_name">
                               {{item.author.loginname}}
                           </span>
                           <span class="date_time">{{getTime(item.create_at)}}</span>
                       </div>
                       <div class="message-feed">
                           <span>回复了你的话题</span>
                           <span class="title" @click="goDetail(item.topic.id)">{{item.topic.title}}</span>
                       </div>
                       <div class="markdown-body" v-html="item.reply.content"></div>
                   </div>
               </li>
           </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import "./../styles/message.scss";
</style>
<script type="es6">
    import types from './../store/types/user';
    import { mapActions , mapState } from 'vuex';
    export default{
        data(){
            return{
                msg:'hello vue',
                ...mapActions({
                    getList:types.GET_MESSAGE_LIST
                })
            }
        },
        computed: mapState({
            Access_Token:state => {
                return state.user.Access_Token
            },
            messageList:state=>{
                return state.user.messageList
            }
        }),
        mounted() {
            !!this.Access_Token && this.getList({
                accesstoken:this.Access_Token
            })
        },
        created(){
            const { Access_Token , $router } = this;
            !Access_Token && $router.replace({
                name:"login",
                params:{
                    srouce:"message"
                }
            });
        },
        methods:{

            getTime( time ){
                return getFormatTime(time);
            },

            goDetail( id ){
                this.$router.push({
                    name:"detail",
                    params:{
                        id:id
                    }
                });
            },

            goUser( loginname ){
                this.$router.push({
                    name:"user",
                    params:{
                        id:loginname
                    }
                });
            }

        },
        components:{

        }
    }
</script>
