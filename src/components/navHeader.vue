<template>
    <div class="back-header">
        <div class="back-button" @click="backPage()" v-if="showBack" >
            <i class="fa fa-angle-left" aria-hidden="true"/>
        </div>
        <div class="header-title">
           {{title}}
        </div>
        <div class="right-box">
            <slot />
        </div>
    </div>
</template>
<style scoped lang="sass">
    @import "./../styles/components/navHeader"
</style>
<script type="es6">
    export default{
        props:{
            back:{
              default:false,
            },
            title:{
                default:"",
                type:String
            },
            showBack:{
                default:true,
                type:Boolean
            }
        },
        data(){
            return{
                backPage(){
                    if(this.back) {
                        this.back();
                    } else {
                        this.$router.back();
                    }
                }
            }
        },
        components:{

        }
    }
</script>
