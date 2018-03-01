<style scoped lang="sass">
    @import "./../styles/index-child.scss";
</style>
<template>
    <transition
            appear
            name="fade"
            v-on:leave="leave"
    >
        <div class="index-page">
            <tab-header :tabs="page.tabList"/>
            <iscroll :className="'scroll'" :loadMore="loadMore" :scrollTop="shouldScrollTop">
                <transition-group name="list" tag="ul" class="item_list"  v-on:leave="leave">
                    <li v-for="item in page.itemList ||[]" class="list" @click="goDetail(item)" :key="item" >
                        <div class="topic" v-if="item.top">置顶</div>
                        <div class="user">
                            <div class="user-avator" :style="{backgroundImage:'url('+item.author.avatar_url+')'}"/>
                            <div class="user-info">
                                <div class="user-name">
                                    {{item.author.loginname}}
                                </div>
                                <div class="time">
                                    <span>{{getTime(item.create_at)}}</span>
                                    <span class="tag">{{getCategoryName(item.tab)}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="title">
                            {{item.title}}
                        </div>
                        <div class="setting">
                            <div class="item">
                                <i class="fa fa-eye" aria-hidden="true" />
                                <span>{{item.visit_count}}</span>
                            </div>
                            <div class="item">
                                <i class="fa fa-commenting-o" aria-hidden="true" />
                                <span>{{item.reply_count}}</span>
                            </div>
                            <div class="item">
                                <i class="fa fa-pencil" aria-hidden="true" />
                                <span>{{getTime(item.last_reply_at)}}</span>
                            </div>
                        </div>
                    </li>
                </transition-group>
            </iscroll>
        </div>
    </transition>
</template>

<script type="es6">

    import { mapActions , mapState } from 'vuex'

    import types from './../store/types/index';

    export default {

        computed: mapState({
            page: state => {
                return state.index
            }
        }),

        data () {
            return {
                ...mapActions({
                    getList: types.GET_LIST,
                    showList:types.SHOW_LIST
                }),
                loadDate:false,
                currentPage:1,
                shouldScrollTop:true
            }
        },

        beforeMount () {

        },

        mounted() {

            screenHidden();

            const { params } =  this.$route;

            this.shouldScrollTop = true;

            params.category && this.pullData({
                load:"init",
                category:params.category
            });

        },


        compiled(){

        },

        beforeRouteUpdate ( to, from, next ){
            const { category } = to.params;
            this.shouldScrollTop = true;
            this.pullData({
                load:"init",
                category:category
            });
            next();
        },

        methods: {

            getTime( time ){
               return getFormatTime(time);
            },

            loadMore(){
                const { params } = this.$route;
                this.shouldScrollTop = false;
                this.pullData({
                    load:"loadMore",
                    category:params.category
                });
            },


            pullData({ load = "init" , category = "all" }, cb=()=>{} ){

                if( this.loadDate ) return;

                this.loadDate = true;

                if( load == "init") {
                    this.currentPage = 1;
                };

                let page = this.currentPage;

                this.getList({
                    category: category,
                    page:page,
                    type:load,
                    callback:( res )=>{
                        this.currentPage ++;
                        cb();
                    }
                }).always(()=> {
                    this.loadDate = false;
                });

            },

            leave( el , done ){
                done();
            },

            goDetail( item ){
                const { id } = item;
                this.$router.push({
                   name:"detail",
                   params:{
                       id:id
                   }
                });

            },

            getCategoryName( tab ) {
                if (!tab) return "";
                const { tabList } = this.page;
                return "#" + tabList.find( item => item.category == tab).name + "#";
            }

        },
        components: {
            tabHeader:require('./../components/tabHeader.vue'),
            iscroll:require('./../components/Iscroll.vue')
        }
    }
</script>

