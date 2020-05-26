<template>
    <div class="home-page-header-main">
        <h1>{{ h1 }}</h1>
        <h2>{{ h2 }}</h2>
        <div><button @click="createSearchWindow">Поиск</button></div>
    </div>
</template>

<script>
    import { mapMutations } from "vuex";

    export default {
        props: {
            h1: {
                type: String,
                required: true
            },
            h2: {
                type: String,
                required: true
            }
        },
        methods: mapMutations(["createSearchWindow"])
    }
</script>

<style lang="scss">
    .home-page-header-main {
        position: absolute;
        left: 0;
        top: 50%;
        z-index: 1;
        width: 100%;
        transform: translateY(-50%);

        h1, h2 {
            text-align: center;
            color: white;
            font-weight: normal;
            font-family: $bold;
        }

        h1 {
            font-size: 8rem;

            @media screen and (max-width: 768px) {
                font-size: 5rem;
            }

            @media screen and (max-width: 425px) {
                font-size: 4rem;
            }

            span {
                display: inline-block;
                color: white;
                font-family: $bold;
            }
        }

        h2 {
            font-size: .95rem;
        }

        div {
            display: flex;
            justify-content: center;
            margin-top: 2rem;

            button {
                cursor: pointer;
                padding: 1rem 2.5rem;
                border: none;
                outline: none;
                background-color: $theme-1;
                color: white;
                font-size: .95rem;
                font-family: $medium;
                transition: background-color .3s ease;

                &:hover {
                    background-color: darken($color: $theme-1, $amount: 5%);
                }

                &:active {
                    transform: scale(.98);
                }
            }
        }
    }
</style>
