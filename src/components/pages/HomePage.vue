<template>
    <section>
        <template v-if="content">
            <Header :content="content.header" />
            <Main :content="content.main" />
            <Footer />
        </template>
        <template v-if="loading">
            <LoadingComponent />
        </template>
        <template v-if="fetchError">
            <ErrorComponent />
        </template>
    </section>
</template>

<script>
    import Header from "./home-page-components/Header.vue";
    import Main from "./home-page-components/Main.vue";
    import Footer from "./home-page-components/Footer.vue";
    import { mapGetters, mapMutations } from "vuex";

    export default {
        components: {
            Header,
            Main,
            Footer
        },
        data() {
            return {
                content: false,
                loading: false,
                fetchError: false
            }
        },
        computed: mapGetters(["hasHomePageData", "homePageStoredData"]),
        created() {
            // скорректируем заголовок страницы
            document.title = `Compass - главная`;

            // проверим, есть ли сохраненные ранее данные в хранилище
            // если нет, запросим их
            if (!this.hasHomePageData) this.getContent();
            else this.content = this.homePageStoredData;
        },
        methods: {
            ...mapMutations(["storeHomePageData"]),
            /**
             * Запрашивает содержимое компонента с сервера.
             */
            getContent() {
                let self = this;
                let timer = setTimeout(() => {self.loading = true}, 500);
                let HOME_DATA_URL = this.constants.HOME_DATA_URL;

                fetch(HOME_DATA_URL)
                    .then(result => result.json())
                    .then(result => {
                        self.content = result;          // контент страницы
                        self.storeHomePageData(result); // сохраним полученные данные в хранилище
                    })
                    .catch(err => {
                        self.fetchError = true;
                        console.error(err);
                    })
                    .finally(() => {
                        self.loading = false;
                        clearTimeout(timer);
                    })
            }
        }
    }
</script>
