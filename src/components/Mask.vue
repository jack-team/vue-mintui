<template>
    <div class="mask" :style="{background:background}" :class="hideClass+maskShow" @touchmove.prevent >
        <slot />
        <div class="mask-tap"  @click="closeHandel()" />
    </div>
</template>
<style lang="sass">
    @import "./../styles/components/mask.scss";
</style>
<script type="es6">
    export default{
        props:{
           show:{
               types:Boolean,
               default:false
           },
           background:{
               types:String,
               default:"rgba(255,255,255,1)"
           },
           close:{
               types:Function,
               default:()=>()=>{}
           }
        },

        data(){
            return {
                hideClass:"",
                maskShow:" visibility",
                disabled:false
            }
        },

        mounted(){

        },

        methods:{
            closeHandel(){
                if(!this.disabled) {
                    this.disabled = true;
                    this.close();
                }
            }
        },

        watch:{
            show:function () {
                if(this.show !== this.maskShow) {
                    if(this.show === false) {
                        this.hideClass = "hide";
                        this.timer = setTimeout(()=> {
                            this.maskShow = " visibility";
                        },300);
                    } else {
                        this.maskShow = "";
                        this.hideClass = "";
                        this.disabled = false;
                    }
                }
            }
        },

        beforeDestroy(){
            this.timer && clearTimeout(this.timer);
        },
        
        components:{

        }
    }
</script>
