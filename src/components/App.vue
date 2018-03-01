
<template>
    <div id="app-root">
        <router-view class="router-content"/>
        <loading-component
                :show="loading.show"
                :text="loading.text"
        />
        <alert-component
                :show="alert.show"
                :title="alert.title"
                :message="alert.message"
                :buttons="alert.buttons"
        />
    </div>
</template>

<script type="es6">
    import loading from './Loading.vue';
    import Alert from './Alert.vue';
    import types from './../store/types/common';

    export default {

        data () {
            return {
                loading:{
                    show:false,
                    text:""
                },
                alert:{
                    show:false,
                    message:"",
                    title:"",
                    buttons:[]
                }
            }
        },

        created () {

        },

        mounted(){

        },

        beforeMount(){

            const { $store } = this;

            window.loading = ( text ) => {
                this.loading = {
                    show:true,
                    text:text
                };
            };

            window.loadingClose = () => {
                this.loading = {
                    show:false,
                    text:""
                };
            };

            window.alert = ( message , callback ) => {

                if(typeof message === "function") {
                    callback = message;
                };

                callback = callback || function () {};

                this.alert = {
                    ...this.alert,
                    show:true,
                    message:message,
                    buttons:[
                        {
                            text:"确定",
                            press:()=> {
                                if(callback() === false) return;
                                this.alert.show = false;
                            },
                            className:"ok"
                        }
                    ]
                }
            };

            window.confirm = ( message , confirm , cancel ) => {
                if(typeof message === "function") {
                    confirm = message;
                    cancel  = confirm;
                };

                confirm = confirm || function () {};
                cancel  = cancel  || function () {};

                this.alert = {
                    ...this.alert,
                    show:true,
                    message: message || "",
                    buttons:[
                        {
                            text:"取消",
                            press:()=> {
                                if(cancel() === false ) return;
                                this.alert.show = false;
                            },
                            className:"cancel"
                        },
                        {
                            text:"确定",
                            press:()=> {
                                if(confirm() === false) return;
                                this.alert.show = false;
                            },
                            className:"ok"
                        },
                    ]
                }
            };
        },

        beforeDestroy () {

        },

        methods: {

        },
        components:{
            loadingComponent:loading,
            alertComponent:Alert
        }
    }
</script>