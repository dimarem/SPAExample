<template>
    <div class="search-window-switcher">
        <button 
            ref="characteristics"
            class="search-window-switcher-button"
            :class="{'search-window-switcher-button-current': current === 1}"
            @click="showOptionsBlock"
        >Характеристи</button>
        <button 
            ref="identifier"
            class="search-window-switcher-button"
            :class="{'search-window-switcher-button-current': current === 2}"
            @click="showIdentifierBlock"
        >Идентификатор</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                current: 1,               // порядковый номер текущей активной кнопки
                underlineRequired: false, // необходимость отображения линии подчеркивания
                underlineStyles: null,    // стили линии подчеркивания
            }
        },
        methods: {
            /**
             * Отобразить блок для поиска по 
             * характеристикам объекта недвижимости.
             */
            showOptionsBlock() {
                this.current = 1;
                this.$emit("show-options-block");
            },
            /**
             * Отобразить блок для поиска по 
             * идентификатору объекта недвижимости.
             */
            showIdentifierBlock() {
                this.current = 2;
                this.$emit("show-identifier-block");
            }
        }
    }
</script>

<style lang="scss">
    .search-window-switcher {
        margin-bottom: 2rem;
        padding: .5rem;

        @media screen and (max-width: 769px) {
            display: flex;
            flex-flow: row wrap;
            justify-content: center;
        }

        @media screen and (max-width: 400px) {
            flex-direction: column;
        }
    }

    .search-window-switcher-button {
        cursor: pointer;
        border: none;
        outline: none;
        background-color: transparent;
        text-transform: uppercase;
        color: rgb(200, 200, 200);
        transition: .3s;

        &:hover {
            color: $color;
        }

        @media screen and (min-width: 400px) {
            &:not(:last-of-type) {
                margin-right: 1rem;
            }
        }

        @media screen and (max-width: 400px) {
            &:not(:last-of-type) {
                margin-bottom: .5rem;
            }
        }
    }

    .search-window-switcher-button-current {
        color: darken($color: $theme-1, $amount: 33%) !important;
    }
</style>
