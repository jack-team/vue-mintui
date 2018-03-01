
<style scoped lang="sass">
    @import "./../styles/index.scss";
</style>

<template>
    <div class="home">
        <router-view class="center-content"/>
        <component-footer />
    </div>
</template>

<script type="es6">
    import Footer from './../components/Footer.vue';
    export default {
        components: {
            componentFooter:Footer,
        }
    }
</script>

