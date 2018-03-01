<template>
    <div>
       <div class="login-page">
           <div class="scroll flex-1">
              <form class="login-form" name="login"  @submit.prevent="submit">
                  <div class="form-group">
                      <input type="text" placeholder="请输入Access_Token" v-model="token"/>
                  </div>
                 <div class="form-group">
                     <button type="submit" v-touchactive="'rgba(26,188,156,.8)'">{{loading?'登录中..':'立即登录'}}</button>
                 </div>
              </form>
           </div>

       </div>
    </div>
</template>
<style scoped lang="sass">
    @import "./../styles/login.scss";
</style>
<script type="es6">

    import { mapActions , mapState } from 'vuex';

    import types from './../store/types/user'

    export default{
        data(){
            return{
                ...mapActions({
                    login: types.LOGIN
                }),
                token:"",
                loading:false
            }
        },

        computed: mapState({
            common:state => {
                return state.common
            },
        }),

        created(){
            const { Access_Token } = this.common;
            const { $router } = this;
            !!Access_Token && $router.replace({
                name:"home"
            });
        },

        methods:{

            submit(){
                const {$route} = this;
                const {srouce} = $route.params;
                if(!this.token) return alert("请输入Access_Token!");
                if(this.loading) return;
                this.loading = true;
                this.login({
                    accesstoken:this.token,
                    callback:()=> {
                        this.$router.replace({
                            name:srouce
                        });
                    }
                }).always(()=>{
                    this.loading = false;
                });

                return false
            }

        },

        mounted(){



        },

        components:{

        }
    }
</script>
