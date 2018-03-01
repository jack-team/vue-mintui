<template>
    <div id="header" ref="scroller">
        <div class="header-scroll">
            <router-link :to="{ path: tab.category }" v-for="(tab , index) in tabs" key="index">
                {{tab.name}}
            </router-link>
        </div>
        <div class="scroll-border" :style="animation()"></div>
    </div>
</template>
<script type="es6">

    export default {

        created(){
            const { category } = this.$route.params;
            this.tab = category;
        },

        props:{
            tabs:{
                type:Array,
                default:()=>[]
            }
        },

        data(){
            return {
                tab:"good"
            }
        },

        methods:{
            animation() {
                const { tabs } = this;

                const $index = tabs.findIndex( ( val  ) => val.category === this.tab );

                const percentage =  1 / tabs.length * 100;

                return {
                    width: percentage + '%',
                    '-webkit-transform':'translateX('+ $index * 100+'%)',
                    transform: 'translateX('+ $index * 100 +'%)'
                }
            }
        },
        watch: {
            '$route' (to, from ) {
                const { category } = to.params;
                this.tab = category;
            }
        }
    }
</script>
