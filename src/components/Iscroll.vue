
<style scoped lang="sass">
    @import "./../styles/components/Iscroll.scss";
</style>

<template>
  <div :class="className" ref="scroller">
      <div v-bindIscroll="iScrollRefresh">
          <slot/>
          <div class="load-more" v-if="showLoading">
              <i class="fa fa-spinner refresh"/>
              <span>加载中..</span>
          </div>
      </div>
  </div>
</template>

<script type="es6">

    import iScroll from 'iscroll/build/iscroll-probe';

    export default{

        props:{
           className:{
               default:"iscroll",
               type:String
           },
           loadMore:{
               default:()=>{},
               type:Function
           },
           scrollTop:{
               default:false,
               type:Boolean
           },
           shouldLoadMoreToButtom:{
               default:40,
               type:Number
           },
           showLoading:{
               default:true,
               type:Boolean
           },
           onLazyLoad:{
               default:()=> ()=>{},
               type:Function
           }
        },

        created(){
            this.iScrollRefresh = this.componentUpdate.bind(this);
        },

        data(){
            return {
                componentUpdate () {
                    const { iScroll } = this;
                    if( iScroll) {
                        setTimeout( ()=> {
                            iScroll.refresh();
                            this.scrollTop && iScroll.scrollTo( 0 , 0 , 100 );
                        },0);
                    };
                },
                loadMoreState:false,
                width:window.innerWidth,
                height:window.innerHeight
            }
        },

        mounted(){
            const { scroller } = this.$refs;

            this.iScroll = new iScroll( scroller , {
               probeType: 1,
               mouseWheel: true,
               scrollbars:"custom",
               bindToWrapper:scroller,
               click:false
            });

            this.iScrollLoadMore( ()=> {
                this.loadMore();
            });
        },

        beforeDestroy () {
            this.iScroll && this.iScroll.destroy();
        },

        methods:{
            iScrollLoadMore ( callback = () => {} , refresh = () => {} ) {

                let self = this;

                const { iScroll } = this;

                let startY = 0;

                let direction = null;

                iScroll.on("beforeScrollStart" , function () {
                    startY = Math.abs(this.y);
                    const { innerWidth , innerHeight } = window;
                    if( self.height != innerHeight || self.width != innerWidth ) {
                        this.refresh();
                        self.height = innerHeight;
                        self.width  = innerWidth;
                    };
                });

                iScroll.on("scroll" ,scrollFun);

                iScroll.on("scrollEnd" , scrollFun);
                
                function scrollFun() {

                    let currentY = Math.abs(this.y);

                    const diff = Math.abs(currentY - startY);

                    if( diff <= 0 ) return;

                    direction = currentY - startY > 0 ? 'up' : 'down';

                    if( this.y > 0 || Math.abs(this.y) > Math.abs(this.maxScrollY)) {
                        return;
                    };

                    if( Math.abs(this.maxScrollY) - Math.abs(this.y) <= self.shouldLoadMoreToButtom && direction == 'up') {
                        callback();
                    };

                    startY = currentY;
                };
            }
        },
        components: {

        }
    }
</script>
