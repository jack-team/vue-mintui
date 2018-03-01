<template>
    <div class="m-select-wrapper">
        <div class="m-select" @click="open(true)" :class="getClass()">
            <input class="m-select-input" readonly :value="select"/>
        </div>
        <d-mask :show="show" :background="maskBackground" :close="open">
            <div class="modal-option" :class="upShow&&'up'">
                <d-iscroll :showLoading="false">
                    <div class="option" v-for="option in options" @click="change(option)">{{option.label}}</div>
                </d-iscroll>
            </div>
        </d-mask>
    </div>
</template>
<style lang="scss">
    @import "./../styles/components/select.scss";
</style>
<script type="es6">
    import dMask from './Mask.vue';
    import dIscroll from './Iscroll.vue';
    export default{
        props:{
            options:{
               type:Array,
               default:()=>[]
            },
            onChange:{
                type:Function,
                default:()=>()=>{}
            }
        },
        data(){
            return{
               show:false,
               maskBackground:"rgba(0,0,0,.5)",
               upShow:false,
               disabled:false,
               select:this.options.find(( opt )=> !opt.value).label
            }
        },
        methods:{
            getClass(){
               return this.show ? 'open' : '' ;
            },
            open( status ){
                this.show = !!status;
                this.disabled = false;
            },
            change(option){
                if(!this.disabled) {
                    this.disabled = true;
                    this.show = false;
                    this.onChange(option);
                    this.select = option.label;
                };
            },
            test(){

            }
        },
        watch:{
            show( show ){
                this.timer = setTimeout(()=>{
                    this.upShow = show;
                });
            }
        },
        beforeDestroy(){
            this.timer && clearTimeout(this.timer);
        },
        components:{
            dMask:dMask,
            dIscroll
        }
    }

</script>
