<template>
    <div class="home-page-services">
        <article 
            v-for="(item, index) in services" 
            :key="index"
        >
            <header v-html="item.svg"></header>
            <main>{{ item.service }}</main>
        </article>
    </div>
</template>


<script>
    export default {
        props: {
            services: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="scss">
    .home-page-services {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: auto;
        margin-bottom: 6rem;

        @media screen and (max-width: 1200px) {
            justify-content: space-around;
        }

        @media screen and (max-width: 900px) {
            flex-direction: column;
            margin-bottom: 0;
        }

        article {
            width: 350px;

            @media screen and (max-width: 1200px) {
                width: 250px;
            }

            @media screen and (max-width: 900px) {
                width: 400px;
                margin-bottom: 4rem;
            }

            @media screen and (max-width: 500px) {
                width: 100%;
            }

            header {
                margin-bottom: 2rem;

                svg {
                    display: block;
                    width: 30%;
                    margin: auto;
                    fill: rgb(210, 210, 210);
                }
            }

            main {
                font-size: .9rem;
                line-height: 1.8;
                text-align: justify;
            }
        }
    }
</style>
