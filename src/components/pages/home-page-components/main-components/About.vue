<template>
    <article class="home-page-about">
        <h1>{{ about.title }}</h1>
        <p 
            v-for="(item, index) in about.paragraphs" 
            :key="index"
        >
            {{ item }}
        </p>
    </article>
</template>

<script>
    export default {
        props: {
            about: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss">
    .home-page-about {
        position: relative;
        max-width: 1200px;
        margin: auto;

        h1 {
            margin-bottom: 1.5rem;
            text-align: center;
            font-weight: normal;
            font-size: 2rem;
            font-family: $bold;
        }

        p {
            margin: 1rem 0;
            font-size: .9rem;
            line-height: 1.8;
            text-align: justify;
        }
    }
</style>
