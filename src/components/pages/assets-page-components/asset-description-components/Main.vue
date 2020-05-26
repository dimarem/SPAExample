<template>
    <!-- описание объекта недвижимости -->
    <main class="asset-main">
        <!-- кнопка "закрывающая текущую страницу" -->
        <CloseButton @click.native="closeAssetPage" />
        <!-- данных нет -->
        <template v-if="content.empty">
            <div class="asset-empty">Данные по уканному ID отсутствуют</div>
        </template>
        <!-- данные грузятся -->
        <template v-if="content.loading">
            <LoadingComponent />
        </template>
        <!-- ошибка загрузки данных -->
        <template v-if="content.fetchError">
            <ErrorComponent />
        </template>
        <!-- данные получены -->
        <!-- если данные загружаются в-первые, создается эффект плавного отображения -->
        <transition name="asset-main-content">
            <div v-if="content.adress">
                <!-- адрес недвижимости -->
                <h1>{{ content.adress }}</h1>
                <!-- район -->
                <h2>{{ content.district }}</h2>
                <!-- цена -->
                <h3>{{ formattedPrice }} {{ content.currency}}</h3>
                <!-- характеристики недвижимости -->
                <div class="asset-characteristics">
                    <div 
                        v-for="item in characteristics" 
                        :key="item.title" 
                        class="asset-characteristic"
                    >
                        <div class="title">{{ item.title }}</div>
                        <div class="value">{{ item.value }}</div>
                    </div>
                </div>
                <p>{{ content.description }}</p>
                <!-- изображения недвижимости -->
                <img 
                    v-for="(src, index) in content.images"
                    :key="index"
                    :src="src" 
                    :alt="content.adress"
                    class="asset-image"
                >
            </div>
        </transition>
    </main>
</template>

<script>
    import CloseButton from "./main-components/CloseButton.vue";
    import { mapGetters } from "vuex";

    export default {
        props: {
            content: {
                type: Object,
                required: true
            }
        },
        components: {
            CloseButton
        },
        computed: {
            ...mapGetters(["hasAssetsPageData"]),
            /**
             * Возвращает отформатированное значение цены.
             * 
             * @returns {string}
             */
            formattedPrice() {
                return new Intl.NumberFormat("ru").format(this.content.price);
            },
            /**
             * Формирует массив содержащий
             * характеристики объекта недвижимости.
             * 
             * @returns {array}
             */
            characteristics() {
                let chars = [];
                let { deal_type, asset_type, id, area, floor, rooms } = this.content;

                chars.push({"title": "Тип сделки", "value": deal_type});
                chars.push({"title": "Тип недвиж.", "value": asset_type});
                chars.push({"title": "Код объекта", "value": id});
                chars.push({"title": "Площадь, м2", "value": area});
                chars.push({"title": "Комнат, шт.", "value": rooms});

                if (floor) chars.push({"title": "Этаж", "value": floor});

                return chars;
            }
        },
        methods: {
            /**
             * "Закрывает" текущую страницу.
             */
            closeAssetPage() {
                // редирект иным способом приведет к потере 
                // текущей прокрутки по адресу "/assets" 
                if (this.hasAssetsPageData) this.$router.go(-1);
                else this.$router.push("/assets");
            }
        }
    }
</script>

<style lang="scss">
    .asset-main {
        position: relative;
        padding: 4rem 2rem;
        min-height: 100vh;
        max-width: 1200px;
        margin: auto;
        background-color: white;
        border-radius: 5px;

        @media screen and (max-width: 500px) {
            padding: 6rem 2rem;
            border-radius: unset;
        }

        h1, h2, h3 {
            text-align: center;
            font-weight: normal;
        }

        h1 {
            font-family: $medium;
        }

        h1 {
            margin-bottom: .5rem;
            font-size: 2rem;

            @media screen and (max-width: 425px) {
                font-size: 1.5rem;
            }
        }

        h2 {
            font-size: .95rem;

            @media screen and (max-width: 425px) {
                font-size: 1rem;
            }
        }

        h3 {
            margin: 2rem 0;
            font-size: 1.5rem;
            color: darken($color: $theme-1, $amount: 33%);
        }

        p {
            max-width: 800px;
            margin: 2rem auto;
            font-size: .95rem;
            line-height: 1.8;
            text-align: justify;
        }
    }

    .asset-characteristics {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        margin-bottom: 2rem;

        @media screen and (max-width: 768px) {
            margin-bottom: 0;
        } 
    }

    .asset-characteristic {
        flex-shrink: 0;

        &:not(:last-of-type) {
            margin-right: 3rem;
        }

        @media screen and (max-width: 768px) {
            width: 100px;
            margin-bottom: 2rem;

            &:not(:last-of-type) {
                margin-right: 0;
            }
        }

        .title, .value {
            text-align: center;
        }

        .title {
            margin-bottom: .5rem;
            font-size: .8rem;
            color: rgb(150, 150, 150);
        }

        .value {
            font: .9rem $medium;
        }
    }

    .asset-image {
        display: block;
        max-width: 800px;
        margin: auto;

        &:not(:last-of-type) {
            margin-bottom: 1rem;
        }

        @media screen and (max-width: 900px) {
            max-width: 100%;
        }
    }

    .asset-empty {
        position: absolute;
        left: 50%;
        top: 50%;
        color: rgb(150, 150, 150);
        transform: translate(-50%, -50%);
    }

    .asset-main-content-enter {
        opacity: 0;
    }

    .asset-main-content-enter-active {
        transition: .5s;
    }
</style>
