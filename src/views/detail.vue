<style scoped lang="sass">
    @import "./../styles/detail.scss";
</style>
<template>
    <transition
            appear
            name="slide-fade"
            v-on:leave="leave"
    >
        <div class="detail-page" v-show="loadShow">
            <div class="content scroll" v-if="!isEmpty(page)">
                <div class="title" @dblclick="dblclick">
                    <div class="title-text">{{page.title}}</div>
                    <div class="show-item">
                        <div class="item">
                            <i class="fa fa-eye" aria-hidden="true" />
                            <span>{{page.visit_count}}</span>
                        </div>
                        <div class="item">
                            <i class="fa fa-commenting-o" aria-hidden="true" />
                            <span>{{page.reply_count}}</span>
                        </div>∫
                    </div>
                </div>
                <div class="user-info">
                    <div class="user-avator" :style="{backgroundImage:'url('+getauthor(page).avatar_url+')'}" @click="gotoUser(page)"/>
                    <div class="user-name">
                        <a class="name">{{getauthor(page).loginname}}</a>
                        <div class="time">{{getTime(page.create_at)}}</div>
                    </div>
                    <div class="tag">
                        <span>#楼主#</span>
                    </div>
                </div>
                <div class="markdown-body" v-html="page.content"></div>
                <div class="comment">
                    <div class="comment-head">
                        <div>
                            <span>共(</span><span class="color-green">{{page.replies.length}}</span><span>)条回复</span>
                        </div>
                        <div @click="showComment()"><span class="color-green">点击评论</span></div>
                    </div>
                    <ul class="comment-list">
                        <li class="list" v-for="comment in page.replies" :key="comment.create_at">
                            <div class="user-top">
                                <div class="avator" :style="{backgroundImage:'url('+getauthor(comment).avatar_url+')'}" />
                                <div class="nick-name">
                                    <div class="color-green">{{comment.author.loginname}}</div>
                                    <div class="time">{{getTime(comment.create_at)}}</div>
                                </div>
                            </div>
                            <div class="info">
                                <div class="markdown-body" v-html="comment.content"></div>
                                <div class="set">
                                    <div class="left-fill"></div>
                                    <div class="icon" @click="goodUp(comment)" :class="comment.is_uped ? 'color-green' :''" >
                                        <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                        <span>{{comment.ups.length}}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <d-mask :show="commentShow" :background="'rgba(0,0,0,.2)'" :close="closeComment">
                <div class="comment-box">
                    <div class="comment-t">
                        <textarea v-model="commentWords"></textarea>
                    </div>
                    <button @click="commentHandel()">发表</button>
                </div>
            </d-mask>
        </div>
   </transition>
</template>
<script type="es6">
    import { mapActions , mapState } from 'vuex'
    import types from './../store/types/detail';
    import dMask from './../components/Mask.vue';
    export default {

        data () {
            return {
                ...mapActions({
                    getDetail: types.GET_DETAIL,
                    goodUps:types.GOOD_UP,
                    clearDetail:types.CLEAR_DETAIL,
                    createComment:types.CREATE_COMMENT
                }),
                loadShow:false,
                commentShow:false,
                commentWords:""
            }
        },

        computed: mapState({
            page: state => {
                return state.detail.detail
            },
            Access_Token:state => {
                return state.user.Access_Token
            },
        }),

        beforeDestroy(){
            this.clearDetail();
            this.showTimeout && clearTimeout(this.showTimeout);
        },

        beforeMount () {
            console.log('组件：beforeMount')
        },

        mounted(){
            this.getDetailData();
        },

        methods: {

            leave( el , done ){
                done();
            },

            dblclick(){
               console.log("dblclick")  
            },

            getDetailData(status="init"){
                const { params } = this.$route;
                this.getDetail({
                    id:params.id,
                    accesstoken:this.Access_Token,
                    status:status
                }).always(()=>{
                    this.showTimeout = setTimeout(() => this.loadShow = true , 200);
                });
            },

            getauthor( page ){
               return page.author || {};
            },

            isEmpty( page ){
                for ( let key in page) {
                    return false;
                };
                return true;
            },

            getTime( time ){
                return  getFormatTime(time);
            },

            showComment(){
                this.commentShow = true;
            },

            back(){
                this.$router.back();
            },
            closeComment(){
                this.commentShow = false;
            },
            goodUp( comment ){

                if(!this.Access_Token) {
                    return this.$router.push({
                        name:"login",
                        params:{
                            srouce:"detail"
                        }
                    })
                };

                this.goodUps({
                    accesstoken:this.Access_Token,
                    id:comment.id
                });

            },
            gotoUser( data ){
                const { author } = data;
                this.$router.push({
                    name:'user',
                    params:{
                        id:author.loginname
                    }
                });
            },
            commentHandel(){
               if(!!!this.Access_Token) {
                   confirm("您还没有登录,是否去登录？", () => {
                       return this.$router.push({
                           name:"login",
                           params:{
                               srouce:"detail"
                           }
                       })
                   });
                   return;
               };
               if(!this.commentWords.trim()) return alert("请输入评论！");
               this.createComment({
                   id:this.page.id,
                   content:this.commentWords,
                   accesstoken:this.Access_Token,
                   replieId:"",
                   cb:()=>{
                       this.getDetailData("reload");
                       this.commentShow = false;
                   }
               });
            }
        },

        components:{
            dMask:dMask
        }
    }
</script>

