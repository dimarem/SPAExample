<template>
    <section class="search-window">
        <Container
            :class="{'translate-container-top': translateContainerTop, 'translate-container-bottom': translateContainerBottom}"
        >
            <CloseButton @click.native="hideSearchWindow('down')" />
            <template v-if="searchAttributes">
                <Switcher 
                    @show-options-block="showBlock(1)"
                    @show-identifier-block="showBlock(2)"
                />
                <Options v-show="blockNumber === 1">
                    <Select
                        title="Тип сделки"
                        v-model="searchParams.dealType"
                        :options="searchAttributes.dealType"
                        class="search-window-select"
                    />
                    <Select
                        title="Тип недвижимости"
                        v-model="searchParams.assetType"
                        :options="searchAttributes.assetType"
                        class="search-window-select"
                    />
                    <Select
                        title="Район"
                        v-model="searchParams.district"
                        :options="searchAttributes.district"
                        class="search-window-select"
                    />
                    <Select
                        title="Площадь, м2"
                        v-model="searchParams.area"
                        :options="searchAttributes.area"
                        class="search-window-select"
                    />
                    <Select
                        title="Комнат, шт"
                        v-model="searchParams.rooms"
                        :options="searchAttributes.rooms"
                        class="search-window-select"
                    />
                    <Select
                        title="Этаж"
                        v-model="searchParams.floor"
                        :options="searchAttributes.floor"
                        :disabled="searchParams.assetType === 'Дом'"
                        class="search-window-select"
                    />
                    <Select
                        title="Цена, $"
                        v-model="searchParams.price"
                        :options="searchAttributes.price"
                        class="search-window-select"
                    />
                </Options>
                <Identifier v-show="blockNumber === 2">
                    <div>Введите идентификатор объекта недвижимости</div>
                    <input 
                        ref="input"
                        v-model="identifier"
                        @keyup.enter="requestData"
                        type="text"
                    >
                </Identifier>
                <ConfirmButton 
                    :blocked="blocked"
                    @request-data="requestData"
                />
            </template>
            <LoadingComponent v-else />
        </Container>
        <transition name="search-window-messager">
            <Messager 
                v-if="messagerRequired" 
                :message="message" 
            />
        </transition>
    </section>
</template>

<script>
    import Container from "./search-window-components/Container.vue";
    import Options from "./search-window-components/Options.vue";
    import Identifier from "./search-window-components/Identifier.vue";
    import Switcher from "./search-window-components/Switcher.vue";
    import CloseButton from "./search-window-components/CloseButton.vue";
    import ConfirmButton from "./search-window-components/ConfirmButton.vue";
    import Select from "./search-window-components/Select.vue";
    import Messager from "./search-window-components/Messager.vue";
    import { mapState, mapGetters, mapMutations } from "vuex";

    export default {
        components: {
            Container,
            Options,
            Identifier,
            Switcher,
            CloseButton,
            ConfirmButton,
            Select,
            Messager
        },
        data() {
            return {
                blockNumber: 1,                   // порядковый номер текущего отображаемого блока поиска
                blocked: false,                   // идификатор блокировки интерфейса
                identifier: null,                 // идентификатор объекта недвижимости
                messagerRequired: false,          // идентификатор необходимости отображения уведомителя
                message: null,                    // сообщение пользователю
                timer: null,                      // ссылка на внутренний таймер
                translateContainerTop: false,     // true, если контейнер требуется сместить вверх на 100vh
                translateContainerBottom: false,  // true, если контейнер требуется сместить вниз на 100vh
                searchParams: {                   // параметры поиска
                    dealType: null,
                    assetType: null,
                    district: null,
                    area: null,
                    rooms: null,
                    floor: null,
                    price: null
                }
            }
        },
        computed: {
            ...mapState(["searchAttributes"]),
            ...mapGetters([
            "hasAssetDescriptions", 
            "assetDescriptions"
        ])},
        mounted() {
            document.documentElement.style.overflow = "hidden";
        },
        methods: {
            ...mapMutations([
                "destroySearchWindow", 
                "storeAssetsPageData",
                "storeAssetsPageDataChunk", 
                "storeSearchURL",
                "dropAssetsPageData",
                "storeAssetDescription"
            ]),
            /**
             * Скрывает поисковое окно.
             * 
             * @param {string} direction - направление смещения контейнера ("down" | "top").
             * @param {boolean} restoreDocumentScrolling - требуется ли восстановление прокручивания страницы?
             */
            hideSearchWindow(direction = "down", restoreDocumentScrolling = true) {
                if (direction === "down") this.translateContainerBottom = true;
                if (direction === "top") this.translateContainerTop = true;

                setTimeout(() => {
                    this.destroySearchWindow();

                    if (restoreDocumentScrolling) document.documentElement.style.overflow = "";
                }, 300)
            },
            /**
             * Отображает компонент-уведомитель.
             * 
             * @param {string} message - сообщение пользователю.
             */
            showMessager(message) {
                if (this.timer) clearTimeout(this.timer);

                this.message = message;
                this.messagerRequired = true;
            },
            /**
             * Скрывает компонент-уведомитель.
             */
            hideMessager() {
                this.messagerRequired = false;
            },
            /**
             * Формирует url для формирования запроса
             * по характеристикам объекта недвижимости.
             * 
             * @returns {string}
             */
            getURL() {
                let e = encodeURIComponent;

                let { dealType, assetType, district, area, rooms, price } = this.searchParams;

                let floor = assetType === "Дом" ? null : this.searchParams.floor;

                let params = `?dealType=${e(dealType)}&assetType=${e(assetType)}&district=${e(district)}&area=${e(area)}&rooms=${e(rooms)}&floor=${e(floor)}&price=${e(price)}`;
                
                let ASSETS_DATA_URL = this.constants.ASSETS_DATA_URL;
                
                let URL = `${ASSETS_DATA_URL}${params}`;

                return URL;
            },
            /**
             * Производит запрос данных.
             */
            requestData() {
                switch (this.blockNumber) {
                    case 1:
                        this.useCharacteristics();
                        break;
                    case 2:
                        this.useIdentifier();
                }
            },
            /**
             * Запрашивает данные 
             * используя поисковые параметры.
             */
            useCharacteristics() {
                if (this.blocked) return;

                let chunk = 0; // на данном этапе запросим первую часть информации
                let self = this;
                let URL = this.getURL();

                if (!URL) return;

                this.blocked = true;

                fetch(`${URL}&chunk=${chunk}`)
                    .then(result => result.json())
                    .then(result => {
                        if (result.data) { // данные есть
                            self.dropAssetsPageData();            // сначала удалим прошлые данные
                            self.storeSearchURL(URL);             // сохраним url запроса данных
                            self.storeAssetsPageData(result);     // сохраним полученные данные в хранилище
                            self.storeAssetsPageDataChunk(chunk); // обновим порядковый номер запрошенной части

                            // если все успешно прошло, перенаправим 
                            // пользователя на страницу с перечнем полученных данных
                            let ASSETS_PATH = this.constants.ASSETS_PATH;
                            let currentPath = this.$router.currentRoute.path;

                            // выполним с задержкой в 400мс, чтобы избежать подвисания
                            // из-за анимации сокрытия поискового окна
                            if (currentPath !== ASSETS_PATH) setTimeout(() => self.$router.push(ASSETS_PATH), 400, self);

                            self.hideSearchWindow("top");

                            document.documentElement.scrollTop = 0;
                        } else { // данных нет
                            this.showMessager("Нет данных соответствующих текущим характеристикам");

                            this.timer = setTimeout(this.hideMessager, 5000, this);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })
                    .finally(() => {
                        this.blocked = false;
                    })
            },
            /**
             * Запрашивает данные используя 
             * идентификатор объекта недвижимости.
             */
            useIdentifier() {
                if (this.blocked) return;

                let id = parseInt(this.identifier); // id объекта недвижимости

                if (!id) {
                    this.$refs.input.focus();
                    
                    return;
                }

                this.blocked = true;

                let ASSETS_PATH = this.constants.ASSETS_PATH;
                let ASSET_DATA_URL = this.constants.ASSET_DATA_URL;

                if (this.hasAssetDescriptions) { // ранее уже сохранялись данные с описаниями объекта недвижимости
                    let description = this.assetDescriptions[id];

                    // данные уже были получены ранее и сохранены в хранилище, вернем их
                    if (description) {
                        this.blocked = false;

                        // выполним с задержкой в 400мс, чтобы избежать подвисания
                        // из-за анимации сокрытия поискового окна
                        setTimeout(() => this.$router.push(`${ASSETS_PATH}/${id}`), 400, this);

                        this.hideSearchWindow("top", false);

                        return;
                    }
                }

                // если ничего из вышеперечисленного
                let self = this;

                fetch(`${ASSET_DATA_URL}?id=${id}`)
                    .then(result => result.json())
                    .then(result => {
                        if (result) { // если данные есть
                            self.storeAssetDescription({ id, description: result}); // сохраним данные в хранилище
                            self.hideSearchWindow("top", false);

                            // выполним с задержкой в 400мс, чтобы избежать подвисания
                            // из-за анимации сокрытия поискового окна
                            setTimeout(() => self.$router.push(`${ASSETS_PATH}/${id}`), 400, self);
                        } else { // если данных нет
                            self.showMessager("Нет данных соответствующих текущему id");

                            self.timer = setTimeout(self.hideMessager, 5000);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })
                    .finally(() => {
                        self.blocked = false;
                    })
            },
            /**
             * Отображает блок поиска.
             * 
             * @param {number} blockNumber - порядковый номер блока поиска.
             */
            showBlock(blockNumber) {
                this.blockNumber = blockNumber;

                if (this.blockNumber === 2) {
                    this.$nextTick(() => {
                        this.$refs.input.focus();
                    })
                }
            }
        }
    }
</script>

<style lang="scss">
    .search-window {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        background-color: rgba($color: #000, $alpha: .5);
        overflow: hidden;
    }

    .translate-container-top {
        animation: search-window-container-translate-top .3s forwards;
    }

    .translate-container-bottom {
        animation: search-window-container-translate-bottom .3s forwards;
    }

    @keyframes search-window-container-translate-bottom {
        0% {
            transform: translateY(0);
        } 100% {
            transform: translateY(100vh);
        }
    }

    @keyframes search-window-container-translate-top {
        0% {
            transform: translateY(0);
        } 100% {
            transform: translateY(-100vh);
        }
    }

    .search-window-messager-enter-active {
        animation: search-window-messager-bounce-in .3s ease forwards;
    }

    .search-window-messager-leave-active {
        animation: search-window-messager-bounce-in .3s ease forwards reverse;
    }

    @keyframes search-window-messager-bounce-in {
        0% {
            transform: translateY(500px);
        } 80% {
            transform: translateY(-25px);
        } 100% {
            transform: translateY(0);
        }
    }

    .search-window-select {
        flex-shrink: 0;
        margin-bottom: 2rem;

        @media screen and (max-width: 430px) {
            width: 100%;
        }

        .vue-select-option {
            font-size: .95rem;
        }

        .vue-select-button:hover::after {
            border-top-color: $color;
        }

        .vue-select-button-content {
            font: .9rem $medium;
        }

        .vue-selected-option {
            font-family: $medium;
            color: darken($color: $theme-1, $amount: 33%);
        }
    }
</style>
