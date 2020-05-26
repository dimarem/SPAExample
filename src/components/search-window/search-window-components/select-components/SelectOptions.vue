<template>
    <div 
        :style="optionsStyles"
        :class="{'webkit-scrollbar': !isMobile}"
        class="vue-select-options"
    >
        <div 
            v-for="(option, index) in options"
            :key="index"
            :class="{'vue-selected-option': selectedOptionIndex === index}"
            @click="$emit('option-selected', index, $event)"
            class="vue-select-option"
        >
            {{ option.content ? option.content : option.value }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            /**
             * Массив опций.
             * 
             * Каждый элемент представляет объект,
             * обязательным атрибутом которого должно 
             * быть "value" - значение возвращаемое опцией;
             * необязательным - "content", значение которого
             * будет использоваться для отображения пользователю;
             * если оно не указано, вместо него будет использовано 
             * значение артибута "value" (предпологается, что значение
             * атрибута "value" будет уникальным).
             * 
             * @example :options="[{value: "some value"}, {value: "some value"}]"
             * @example :options="[{value: "some value", content: "some content"}, {value: "some value", content: "some content"}]"
             */
            options: {
                type: Array,
                required: true
            },
            /**
             * Стили меню опций.
             * 
             * @example :options-styles="{maxHeight: "300px", top: "100%"}"
             */
            optionsStyles: {
                type: Object,
                required: true
            },
            /**
             * Порядковый номер выбранной пользователем опции.
             * 
             * @example :selectedOptionIndex="1"
             */
            selectedOptionIndex: {
                type: Number,
                required: false
            }
        },
        computed: {
            /**
             * Если мобильная среда, возвращает true,
             * иначе - false.
             * 
             * @returns {boolean}
             */
            isMobile() {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vue-select-options {
        position: absolute;
        left: 0;
        z-index: 1;
        width: 100%;
        padding: 1.5rem 0;
        border-radius: 3px;
        background-color: white;
        box-shadow: 0 2px 6px rgba($color: #000, $alpha: .35);
        overflow: auto;
    }

    .vue-select-option {
        cursor: pointer;
        padding: .5rem 1rem;

        &:hover {
            background-color: rgb(245, 245, 245);
        }
    }

    .webkit-scrollbar {
        &::-webkit-scrollbar {
            width: 5px;
        }
        
        &::-webkit-scrollbar-thumb {
            background-color: rgb(220, 220, 220);

            &:hover {
                background-color: rgb(200, 200, 200);
            }
        }
    }
</style>
