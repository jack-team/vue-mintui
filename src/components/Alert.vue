<template>
    <mask-component :show="show" :background="background" :close="close">
        <div class="alert-content" :class="showContent && 'show'">
            <div class="title" v-if="title">{{title}}</div>
            <div class="tip">
                <span>{{message}}</span>
            </div>
            <div class="button-group">
                <button
                    v-for="button in buttons"
                    class="button"
                    :class="button.className"
                    v-touchactive="'#ececec'"
                    @click="handel(button.press)"
                >
                    {{button.text}}
                </button>
            </div>
        </div>
    </mask-component>
</template>
<style lang="sass">
    @import "./../styles/components/alert.scss";
</style>
<script type="es6">
    import maskComponent from './Mask.vue';
    import types from './../store/types/common';
    export default{
        props:{
            show:{
                type:Boolean,
                default:false
            },
            title:{
                type:String,
                default:""
            },
            message:{
                type:String,
                default:""
            },
            buttons:{
                type:Array,
                default:function ( data ) {
                    return [
                        {
                            text:"取消" ,
                            press:()=>{} ,
                            className:"cancel"
                        },
                        {
                            text:"确定" ,
                            press:()=>{} ,
                            className:"ok"
                        }
                    ]
                }
            }
        },
        data(){
            return {
                background:"rgba(0,0,0,.6)",
                showContent:false
            }
        },

        mounted(){

        },

        watch:{
            show(){
                if(this.show !== this.showContent) {
                    setTimeout(()=> this.showContent = this.show);
                }
            }
        },

        methods:{
            handel( cb ){
                cb();
            },
            close(){
                const cancel = this.buttons.find((button)=> button.className === "cancel") || {};
                const { press = () => {} } = cancel;
            }
        },

        components:{
            maskComponent:maskComponent
        }
    }
</script>