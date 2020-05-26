<template>
    <!-- страница, содержание которой определяется текущим адресом -->
    <!-- если адрес вида "/assets", отобразится компонент "AssetsList" -->
    <!-- если адрес вида "/assets/:id", отобразится компонент "AssetDescription" -->
    <section class="assets-page">
        <Header />
        <router-view name="assets-list"></router-view>
        <router-view name="asset-description"></router-view>
    </section>
</template>

<script>
    import Header from "./assets-page-components/Header.vue";

    export default {
        components: {
            Header
        }
    }
</script>

<style lang="scss">
    .assets-page {
        min-height: 100vh;
    }
</style>
