<template>
    <main class="home-page-main">
        <Services :services="content.services" />
        <About :about="content.about" />
    </main>
</template>

<script>
    import Services from "./main-components/Services.vue";
    import About from "./main-components/About.vue";

    export default {
        props: {
            content: {
                type: Object,
                required: true
            }
        },
        components: {
            Services,
            About
        }
    }
</script>

<style lang="scss">
    .home-page-main {
        padding: 6rem 2rem 2rem;
    }
</style>
