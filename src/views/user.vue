<template>
    <div class="user-page bg-fff">
        <div class="content scroll" v-if="'loginname' in page">
            <div class="top-box">
                <div class="cover" :style="{backgroundImage:'url(./../image/headimg-bg.jpg)'}">
                    <div class="avator">
                        <div class="avator-image-wrap">
                            <div class="avator-image" :style="{backgroundImage:'url('+page.avatar_url+')'}"/>
                        </div>
                    </div>
                    <div class="user-name">{{page.loginname}}</div>
                </div>
               <div class="center-box">
                   <div class="user-info">
                       <div class="text">积分: {{page.score}}</div>
                       <div class="text">注册于: {{this.getTime(page.create_at)}}</div>
                   </div>
                   <div class="replies">
                       <ul class="replies-type">
                           <li class="type" :class="type.active &&'active'" v-for="(type,index) in typeList" @click="changeTab(index,type.type)">{{type.name}}</li>
                       </ul>
                       <ul class="item-list" v-if="!!subList.length">
                           <li class="list" @click="goDetail(item.id)" v-for="item in subList">
                               <div class="user-avator" :style="{backgroundImage:'url('+item.author.avatar_url+')'}" />
                               <div class="content">
                                   <div class="top">
                                       <div class="user_name">
                                           {{item.author.loginname}}
                                       </div>
                                       <div class="time">{{getTime(item.last_reply_at)}}</div>
                                   </div>
                                   <div class="con">
                                       {{item.title}}
                                   </div>
                               </div>

                           </li>
                       </ul>
                       <div v-else class="no-list">暂无数据</div>
                   </div>
               </div>
            </div>
        </div>
    </div>
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
            page: state => {
                return state.user.detail
            }
        }),
        data(){
            return{
                ...mapActions({
                    getList: types.GET_DETAIL
                }),
                typeList:[
                    {name:'主题',type:"recent_topics" , active:true },
                    {name:'回复',type:"recent_replies"}
                ],
                subList:[]
            }
        },

        mounted(){
           const { params } = this.$route;
           this.getList({
               id:params.id,
               callback:()=> {
                   this.changeTab(0);
               }
           })
        },
        methods: {
            getTime( time ){
                return  getFormatTime(time);
            },
            changeTab( index ){
                this.typeList.map(( val , $index )=> {
                   $index == index ? val.active = true : val.active = false;
                });
                const type =  this.typeList[index].type;
                this.subList = [].concat(this.page[type]);
            },
            goDetail( id ){
               this.$router.push({
                   name:'detail',
                   params:{
                       id
                   }
               })

            }
        },
        components:{
        }
    }
</script>
