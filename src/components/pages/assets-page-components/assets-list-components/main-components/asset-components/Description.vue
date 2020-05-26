<template>
    <!-- компонент формирующий область с кратким описанием недвижимости -->
    <div class="assets-list-description">
        <div class="price">{{ formattedPrice }} <span>{{ content.currency }}</span></div>
        <div class="type">{{ content.asset_type }}. {{ content.deal_type }}</div>
        <div class="adress">{{ content.adress }}</div>
        <div class="characteristics">
            <div 
                v-for="item in characteristics" 
                :key="item.id"  
                class="characteristic"
            >
                <div class="title">{{ item.title }}</div>
                <div class="value">{{ item.value }}</div>
            </div>
        </div>
        <!-- "особое" предложение -->
        <div
            v-if="content.hot" 
            class="hot"
        >HOT</div>
    </div>
</template>

<script>
    export default {
        props: {
            content: {
                type: Object,
                required: true
            }
        },
        computed: {
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
                let { area, rooms, floor } = this.content;

                chars.push({"title": "Площадь, м2", "value": area});
                chars.push({"title": "Комнат, шт.", "value": rooms});

                if (floor) chars.push({"title": "Этаж", "value": floor});

                return chars;
            }
        }
    }
</script>

<style lang="scss">
    .assets-list-description {
        position: relative;

        .price, .type {
            margin: 1rem 0;
        }

        .adress, .type {
            font-size: .9rem;
        }

        .type {
            font-size: .8rem;
            color: rgb(150, 150, 150);
        }

        .price {
            font-family: $medium;
            font-size: 1.3rem;

            span {
                font-family: $medium;
                font-size: .95rem;
            }
        }

        .adress {
            font-family: $medium;
            margin-bottom: .5rem;
        }

        .characteristics {
            display: flex;
            flex-flow: row wrap;

            .characteristic {
                margin-bottom: .5rem;

                &:not(:last-of-type) {
                    margin-right: 1rem;
                }

                .title {
                    margin-bottom: .5rem;
                    font-size: .8rem;
                    color: rgb(150, 150, 150);
                }

                .value {
                    text-align: center;
                    font-family: $medium;
                    font-size: .9rem;
                }
            }
        }

        .hot {
            position: absolute;
            right: 0;
            top: 0;
            padding: .1rem .5rem;
            color: $theme-2;
            font: .8rem $medium;
            border: 1px solid $theme-2;
            border-radius: 3px;
        }
    }
</style>
