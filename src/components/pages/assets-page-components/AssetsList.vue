<template>
    <!-- список с кратким описанием недвижимостей -->
    <section class="assets-list">
        <Main :content="content" />
        <Footer />
    </section>
</template>

<script>
    import Main from "./assets-list-components/Main.vue";
    import Footer from "./assets-list-components/Footer.vue";
    import { mapGetters, mapMutations } from "vuex";

    export default {
        components: {
            Main,
            Footer
        },
        data() {
            return {
                fetchBlocked: false,            // возможность запроса данных блокирована
                scrollProcessingBlocked: false, // обработка скроллинга блокирована
            }
        },
        computed: {
            ...mapGetters([
                "assetsPageStoredData", 
                "assetsPageDataChunk", 
                "storedSearchURL"
            ]),
            /**
             * Формирует массив содержащий
             * информацию по объектам недвижимости.
             * 
             * @returns {array}
             */
            content() {
                if (this.assetsPageStoredData) return this.assetsPageStoredData.data;
                else return [];
            }
        },
        created() {
            // скорректируем заголовок страницы
            document.title = `Compass - наши предложения`;

            window.addEventListener("scroll", this.processScrolling, { passive: true });
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.processScrolling, { passive: true });
        },
        methods: {
            ...mapMutations([
                "storeAssetsPageData", 
                "storeAssetsPageDataChunk"
            ]),
            /**
             * Запрашивает у сервера часть данных.
             * 
             * @param {number} dataChunk - порядковый номер запрашиваемой части данных.
             */
            fetchDataChunk(dataChunk) {
                if (this.fetchBlocked) return;

                // блокируем интерфейс до получения данных
                this.fetchBlocked = true;

                let self = this;
                let URL = this.storedSearchURL; // созданный ранее поисковым окном url запроса данных

                fetch(`${URL}&chunk=${dataChunk}`)
                    .then(result => result.json())
                    .then(result => {
                        self.storeAssetsPageData(result);         // сохраним полученные данные в хранилище
                        self.storeAssetsPageDataChunk(dataChunk); // обновим порядковый номер запрошенной части
                    })
                    .catch(err => {
                        console.error(err);
                    })
                    .finally(() => {
                        self.fetchBlocked = false;
                    })
            },
            /**
             * Обрабатывает прокрутку страницы
             * подгружая новые данные,
             * если она была прокручена до конца и
             * не все данные были получены с сервера.
             */
            processScrolling() {
                if (!this.assetsPageStoredData || this.scrollProcessingBlocked) return;

                this.scrollProcessingBlocked = true;

                setTimeout(() => {
                    // если данных больше нет
                    if (!this.assetsPageStoredData.hasMore) {
                        window.removeEventListener("scroll", this.processScrolling, { passive: true });

                        return;
                    }

                    let {scrolled, clientHeight, scrollHeight} = this.getDocumentMetrics();

                    // если прокручено более 50% страницы
                    if (scrolled > (scrollHeight - clientHeight) * 0.5) {
                        let dataChunk = this.assetsPageDataChunk + 1;
                   
                        this.fetchDataChunk(dataChunk);
                    }

                    this.scrollProcessingBlocked = false;
                }, 1000)
            },
            /**
             * Расчитывает и возвращает три параметра:
             * полную высоту документа, высоту его видимой части
             * и высоту прокрученной части.
             * 
             * @returns {object} {scrolled, clientHeight, scrollHeight}
             */
            getDocumentMetrics() {
                let scrolled = window.pageYOffset || document.documentElement.scrollTop;
                let clientHeight = document.documentElement.clientHeight;
                let scrollHeight = Math.max(
                    document.body.scrollHeight, document.documentElement.scrollHeight,
                    document.body.offsetHeight, document.documentElement.offsetHeight,
                    document.body.clientHeight, document.documentElement.clientHeight
                )

                return {scrolled, clientHeight, scrollHeight};
            }
        }
    }
</script>
