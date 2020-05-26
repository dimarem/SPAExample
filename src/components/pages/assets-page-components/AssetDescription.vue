<template>
    <!-- описание недвижимости -->
    <section class="asset-description">
        <Main :content="content" />
    </section>
</template>

<script>
    import Main from "./asset-description-components/Main.vue";
    import { mapGetters, mapMutations } from "vuex";

    export default {
        components: {
            Main
        },
        data() {
            return {
                content: {}
            }
        },
        computed: mapGetters(["hasAssetDescriptions", "assetDescriptions"]),
        created() {
            document.documentElement.style.overflow = "hidden";

            // id записи для просмотра
            let id = parseInt(this.$route.params.id);

            if (!this.hasStoredData(id)) this.fetchData(id);
        },
        beforeDestroy() {
            document.documentElement.style.overflow = "";
        },
        /**
         * Обрабатывает изменение параметра id
         * по текущему маршруту.
         */
        beforeRouteUpdate(to, from, next) {
            // id записи для просмотра
            let id = parseInt(to.params.id);
            
            if (!this.hasStoredData(id)) this.fetchData(id);

            next();
        },
        methods: {
            ...mapMutations(["storeAssetDescription"]),
            /**
             * Проверяет наличие сохраненных ранее
             * данных по текущему идентификатору.
             * Если данные есть, присваивает их
             * атрибуту content.
             * 
             * @param {number} id - идентификатор объекта недвижимости.
             * @returns {boolean}
             */
            hasStoredData(id) {
                // в хранилище уже есть данные с описаниеми объектов недвижимости,
                // проверим, возможно по указанному id уже были получены данные ранее
                if (this.hasAssetDescriptions) {
                    let description = this.assetDescriptions[id];

                    if (description) {
                        this.content = description;

                        return true;
                    }
                } else {
                    return false;
                }
            },
            /**
             * Запрашивает данные с сервера.
             * Сохраняет их в хранилище.
             * 
             * @param {number} id - идентификатор объекта недвижимости.
             */
            fetchData(id) {
                let self = this;
                let timer = setTimeout(() => {
                    self.content = { loading: true };
                }, 1000);

                let ASSET_DATA_URL = this.constants.ASSET_DATA_URL;

                fetch(`${ASSET_DATA_URL}?id=${id}`)
                    .then(result => result.json())
                    .then(result => {
                        // данных соответствующих текущему id нет
                        if (!result) {
                            this.content = { empty: true };

                            return;
                        }

                        self.content = result;
        
                        // сохраним данные в хранилище
                        self.storeAssetDescription({ id, description: result});
                    })
                    .catch(err => {
                        self.content = { fetchError: true };
                        console.error(err);
                    })
                    .finally(() => {
                        clearTimeout(timer);
                    })
            }
        }
    }
</script>

<style lang="scss">
    .asset-description {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        width: 100%;
        height: 100vh;
        padding: 4rem 1rem;
        background-color: rgba($color: #000, $alpha: .5);
        overflow-y: scroll;

        @media screen and (max-width: 500px) {
            padding: 0;
        }
    }
</style>
