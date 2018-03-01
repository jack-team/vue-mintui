<template>
    <mask-component :show="show">
        <div class="loading-modal">
            <div class="loading-icon"></div>
            <div class="loading-text">{{text}}</div>
        </div>
    </mask-component>
</template>
<style lang="sass">
    @import "./../styles/components/loading"
</style>
<script type="es6">
    import maskComponent from './Mask.vue';
    export default{
        props:{
            show:{
                types:Boolean,
                default:false
            },
            text:{
                types:String,
                default:""
            }
        },
        components:{
            maskComponent
        }
    }
</script>
