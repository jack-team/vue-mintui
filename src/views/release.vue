<template>
    <div>
        <div class="release-page">
            <div class="content scroll">
                <div class="form-group">
                    <input type="text" v-model="title" placeholder="请输入主题">
                </div>
                <div class="form-group">
                    <mSelect :options="options" :onChange="onChange" />
                </div>
                <div class="form-group">
                    <div class="textarea">
                        <textarea v-model="content" placeholder="请输入内容"></textarea>
                        <div class="textarea-fill">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <button @click="submit" v-touchactive="'rgba(26,188,156,.8)'">{{!loading ? '发表' :'发表中..'}}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="sass">
    @import "./../styles/release.scss";
</style>
<script type="es6">
    import navHeader from './../components/navHeader.vue';
    import types from './../store/types/index';
    import { mapActions , mapState } from 'vuex';
    import mSelect from './../components/Select.vue';
    export default{
        data(){
            return{
                msg:'hello vue',
                options: [{
                    value: '',
                    label: '请选择发布类型'
                },{
                    value: 'dev',
                    label: '测试'
                },
                    {
                    value: 'ask',
                    label: '问答'
                }, {
                    value: 'share',
                    label: '分享'
                }, {
                    value: 'job',
                    label: '招聘'
                }],
                tab:"",
                title:"",
                content:"",
                ...mapActions({
                    createTopic:types.CREATE_TOPICS
                }),
                loading:false
            }
        },
        computed: mapState({
            Access_Token:state => {
                return state.user.Access_Token
            },
        }),
        created () {
            const store = this.$store;
        },
        beforeDestroy () {
            const store = this.$store;
        },
        methods:{
            submit(){
                const { tab , title , content , $router } = this;

                if(this.loading) return;

                if(!this.Access_Token) {
                    confirm("您还没有登录，是否登录？" , ()=>{
                        $router.push({
                            name:"login",
                            params:{
                                srouce:"release"
                            }
                        })
                    });
                    return;
                }

                if(!title.trim()) return alert("请输入标题");
                if(!tab) return alert("请选择发布类型");
                if(!content.trim()) return alert("请输入你要发表的内容");

                this.loading = true;

                this.createTopic({
                    data:{
                        tab,
                        title,
                        content,
                        accesstoken:this.Access_Token
                    },
                    callback:( data )=>{
                        if(data.success) {
                            alert("发布成功",()=>{
                                $router.push({
                                    name:"home"
                                })
                            });
                        } else {
                            alert(data.message);
                        }
                    }
                }).always( () => {
                    this.loading = false;
                });
            },
            onChange( opt ){
                this.tab = opt.value;
            }
        },
        components:{
            mSelect:mSelect
        }
    }
</script>
