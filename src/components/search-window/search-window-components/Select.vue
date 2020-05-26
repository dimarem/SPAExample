<template>
    <div 
        ref="select" 
        class="vue-select"
    >
        <div 
            v-if="title" 
            class="vue-select-caption"
        >{{ title }}</div>
        <SelectButton
            :button-content="selectedOptionContent"
            :disabled="disabled"
            @click.native="showOptions"
        />
        <transition :name="transitionName">
            <SelectOptions
                v-if="optionsRequired"
                :options="options"
                :options-styles="optionsStyles"
                :selected-option-index="selectedOptionIndex"
                @option-selected="processSelection"
            />
        </transition>
    </div>
</template>

<script>
    import SelectButton from "./select-components/SelectButton.vue";
    import SelectOptions from "./select-components/SelectOptions.vue";

    export default {
        props: {
            /**
             * Заголовок select.
             * 
             * @example title="some title"
             */
            title: {
                type: String,
                required: false
            },
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
             * @example :options="[{value: "option value"}, {value: "option value"}]"
             * @example :options="[{value: "option value", content: "option content"}, {value: "option value", content: "option content"}]"
             */
            options: {
                type: Array,
                required: true
            },
            /**
             * Индикатор активности компонента.
             * 
             * @example :disabled="false"
             */
            disabled: {
                type: Boolean,
                required: false,
                default: false
            },
            /**
             * Текущее значение компонента.
             * 
             * Должно соответствовать значению атрибута "value"
             * одного из объектов массива "options".
             * 
             * Если в процессе создания компонента соответствия
             * не найдено, по-умолчанию, в качестве первоначального
             * значения будет выбрано значение первого элемента
             * массива "options".
             * 
             * @example value="some value"
             * @example :value="7"
             * @example :value="true"
             */
            value: {
                required: true
            }
        },
        components: {
            SelectButton,
            SelectOptions
        },
        model: {
            prop: "value",
            event: "select"
        },
        data() {
            return {
                selectedOptionContent: undefined, // содержание выбранной пользователем опции
                selectedOptionIndex: undefined,   // порядковый номер выбранной пользователем опции
                optionsStyles: undefined,         // стили меню опций
                transitionName: undefined,        // наименование перехода появления меню опций
                optionsRequired: false,           // индикатор необходимости отображения опций
            }
        },
        /**
         * В данном хуке устанавливается значение
         * кнопки вызова опций на основании значения
         * входного параметра "value". Если начальное 
         * значение не соответствует ни одному из 
         * значений в массиве опций, данный параметр будет
         * установлен в значение его первого элемента и
         * произведено событие "select".
         */
        created() {
            let value = this.value;
            let options = this.options;

            for (let i = 0; i < options.length; i++) {
                let option = options[i];

                if (option.value === value) {
                    this.selectedOptionContent = option.content ? option.content : value;
                    this.selectedOptionIndex = i;

                    return;
                }
            }

            // соответствие не найдено
            this.selectedOptionContent = options[0].content ? options[0].content : options[0].value;
            this.selectedOptionIndex = 0;

            this.$emit("select", options[0].value);
        },
        methods: {
            /**
             * Выбирает опцию,
             * производит событие "select".
             * 
             * @param {number} index - порядковый номер выбранной опции.
             */
            selectOption(index) {
                let option = this.options[index];
                
                this.selectedOptionContent = option.content ? option.content : option.value;
                this.selectedOptionIndex = index;

                this.$emit("select", option.value);
            },
            /**
             * Отображает опции.
             */
            showOptions() {
                if (this.disabled || this.optionsRequired) return;

                this.positionOptions();

                this.optionsRequired = true;

                setTimeout(() => {
                    document.documentElement.addEventListener("click", this.hideOptions);
                }, 0)
            },
            /**
             * Скрывает опции.
             */
            hideOptions() {
                this.optionsRequired = false;

                document.documentElement.removeEventListener("click", this.hideOptions);
            },
            /**
             * Позиционирует меню опций.
             */
            positionOptions() {
                let docHeight = document.documentElement.clientHeight;
                let { bottom } = this.$refs.select.getBoundingClientRect();
                let underSpace = docHeight - bottom;
                let ratio = underSpace / docHeight;

                if (ratio > 0.33) {
                    this.optionsStyles = {
                        maxHeight: `${underSpace * 0.9}px`,
                        top: "100%"
                    }

                    this.transitionName = "vue-select-options-bottom";
                } else {
                    this.optionsStyles = {
                        maxHeight: "50vh",
                        bottom: "100%"
                    }

                    this.transitionName = "vue-select-options-top";
                }
            },
            /**
             * Обрабатывает выбор опции пользователем.
             * 
             * @param {string} index - порядковый номер выбранной пользователем опции.
             * @param {object} e - объект события click.
             */
            processSelection(index, e) {
                e.stopPropagation();

                this.selectOption(index);
                this.hideOptions();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vue-select {
        position: relative;
        width: 300px;
    }

    .vue-select-caption {
        margin-bottom: .5rem;
        padding: 0 .5rem;
        font-size: .8rem;
        color: rgb(150, 150, 150);
    }

    .vue-select-options-bottom-enter,
    .vue-select-options-bottom-leave-to {
        transform: translateY(10px);
        opacity: 0;
    }

    .vue-select-options-top-enter,
    .vue-select-options-top-leave-to {
        transform: translateY(-10px);
        opacity: 0;
    }

    .vue-select-options-bottom-enter-active,
    .vue-select-options-bottom-leave-active,
    .vue-select-options-top-enter-active,
    .vue-select-options-top-leave-active {
        transition: .2s ease;
    }
</style>
