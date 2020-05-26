<template>
    <!-- блок с кратким описанием недвижимости -->
    <!-- клик по изображению ведет на страницу с полным описанием -->
    <article class="assets-list-article">
        <Img :content="content" />
        <Description :content="content" />
    </article>
</template>

<script>
    import Img from "./asset-components/Img.vue";
    import Description from "./asset-components/Description.vue";

    export default {
        props: {
            content: {
                type: Object,
                required: true
            }
        },
        components: {
            Img,
            Description
        }
    }
</script>

<style lang="scss">
    .assets-list-article {
        width: 300px;
        margin: 4rem 2rem;

        @media screen and (max-width: 768px) {
            margin: 2rem;
        }

        @media screen and (max-width: 500px) {
            width: 80vw;
        }
    }
</style>
