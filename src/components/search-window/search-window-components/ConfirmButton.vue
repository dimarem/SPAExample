<template>
    <div class="search-window-confirm-button-container">
        <button 
            @click="$emit('request-data')" 
            class="search-window-confirm-button"
        >
            <span v-if="!blocked">Поиск</span>
            <span v-else><Spinner /></span>
        </button>
    </div>
</template>

<script>
    import Spinner from "./confirm-button-components/Spinner.vue";

    export default {
        props: {
            /**
             * Индикатор блокировки интерфейса.
             */
            blocked: {
                type: Boolean,
                required: true
            }
        },
        components: {
            Spinner
        }
    }
</script>

<style lang="scss">
    .search-window-confirm-button-container {
        @media screen and (min-width: 1001px) {
            position: absolute;
            bottom: 2rem;
            right: 4rem;
        }

        @media screen and (max-width: 1000px) {
            display: flex;
            justify-content: flex-end;
        }
    }

    .search-window-confirm-button {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 40px;
        border: none;
        outline: none;
        background-color: $theme-1;
        transition: background-color .3s ease;

        &:hover {
            background-color: darken($color: $theme-1, $amount: 5%);
        }

        span {
            color: white;
            font: .95rem $medium;
        }
    }
</style>
