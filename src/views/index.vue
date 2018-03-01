<template>
    <div class="app">

        <mt-navbar v-model="selected">
            <mt-tab-item id="1">option A</mt-tab-item>
            <mt-tab-item id="2">option B</mt-tab-item>
            <mt-tab-item id="3">option C</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <mt-cell v-for="n in 10" :title="'content ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell v-for="n in 4" :title="'content ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <mt-cell v-for="n in 6" :title="'content ' + n" />
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                selected:"1"
            }
        },

        created () {

        },

        mounted(){

        },

        beforeMount(){

        },

        beforeDestroy () {

        },

        methods: {
            handleClose(){

            }
        },
        components:{

        }
    }
</script>

<style lang="scss" scoped>
    @import "./../styles/index";
</style>