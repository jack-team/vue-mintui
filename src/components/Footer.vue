<template>
   <div class="footer-bar">
      <router-link :to="{name:link.link}" v-for="link in links" key="$index">
         <p>
            <i class="fa" :class="link.icon"/>
         </p>
         <p>{{link.name}}</p>
      </router-link>
   </div>
</template>
<script type="es6">
    import '../styles/components/Footer.scss';
    const links = [
       {name:"首页",link:"topics" , icon:"fa-home"},
       {name:"发表",link:"release" , icon:"fa-paper-plane-o"},
       {name:"消息",link:"message" , icon:"fa-envelope-o"},
       {name:"我的",link:"my" , icon:"fa-user-o"}
    ]
    export default{
        data(){
            return{
               links:links
            }
        },
        created () {
   
        },
        beforeDestroy () {

        },
        methods: {

        },
    }
</script>
