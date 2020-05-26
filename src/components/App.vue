<template>
    <section id="app">
        <router-view></router-view>
        <transition name="search-window">
            <SearchWindow v-if="searchWindowRequired" />
        </transition>
        <transition name="curtain">
            <Curtain v-if="!ready" />
        </transition>
    </section>
</template>

<script>
    import SearchWindow from "./search-window/SearchWindow.vue";
    import Curtain from "./curtain/Curtain.vue";
    import { mapState, mapMutations } from "vuex";

    export default {
        components: {
            SearchWindow,
            Curtain
        },
        data() {
            return {
                ready: false // индикатор готовности приложения
            }
        },
        computed: mapState(["searchWindowRequired"]),
        created() {
            this.getSearchAttributes();
        },
        mounted() {
            this.$nextTick(() => this.ready = true);
        },
        methods: {
            ...mapMutations(["storeSearchAttributes"]),
            /**
             * Запрашивает поисковые настройки.
             */
            getSearchAttributes() {
                let url = this.constants.SEARCH_ATTRIBUTES;

                fetch(url)
                    .then(result => result.json())
                    .then(result => {
                        this.searchAttributes = result;

                        this.storeSearchAttributes(result);
                    })
            }
        },
    }
</script>

<style lang="scss">
    #app {
        height: 100vh;
    }

    .search-window-enter, .search-window-leave-to {
        opacity: 0;
    }

    .search-window-enter-active, .search-window-leave-active {
        transition: .3s;
    }

    .curtain-leave-to {
        opacity: 0;
    }

    .curtain-leave-active {
        transition: .5s;
    }
</style>
