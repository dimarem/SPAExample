<template>
    <header class="assets-page-header">
        <nav>
            <router-link to="/"><HomeSVG />Главная</router-link>
            <button @click="createSearchWindow"><SearchSVG /></button>
        </nav>
    </header>
</template>

<script>
    import HomeSVG from "./header-components/HomeSVG.vue";
    import SearchSVG from "./header-components/SearchSVG.vue";
    import { mapMutations } from "vuex";

    export default {
        components: {
            HomeSVG,
            SearchSVG
        },
        methods: mapMutations(["createSearchWindow"])
    }
</script>

<style lang="scss">
    .assets-page-header {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 2;
        align-items: center;
        padding: 1.5rem 2rem;
        background-color: white;
        box-shadow: 0 3px 6px rgba($color: #000, $alpha: .09), 0 3px 6px rgba($color: #000, $alpha: .06), 0 3px 6px rgba($color: #000, $alpha: .03);
        transition: .3s;

        nav {
            display: flex;
            justify-content: space-between;
            max-width: 1680px;
            margin: auto;

            a {
                text-decoration: none;
                font-size: .9rem;
                transition: .2s ease;

                svg {
                    margin-right: 5px;
                }
            }

            button:hover, a:hover {
                color: darken($color: $theme-1, $amount: 33%);

                svg {
                    fill: darken($color: $theme-1, $amount: 33%);
                }
            }

            a, button {
                svg {
                    position: relative;
                    top: .2rem;
                    height: 1.2rem;
                    width: 1.2rem;
                    fill: $color;
                    transition: .2s ease;
                }
            }

            button {
                cursor: pointer;
                border: none;
                outline: none;
                background-color: transparent;
            }
        }
    }
</style>
