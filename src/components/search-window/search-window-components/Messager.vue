<template>
    <!-- данный компонент используется для передачи сообщений пользователю -->
    <div class="search-window-messager">
        {{ message }}
    </div>
</template>

<script>
    export default {
        props: {
            /**
             * Сообщение пользователю.
             */
            message: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss">
    .search-window-messager {
        position: fixed;
        left: 1rem;
        bottom: 1rem;
        z-index: 11;
        padding: 1.2rem 2rem;
        background-color: $theme-2;
        font-size: .95rem;
        color: white;
        text-align: center;

        @media screen and (min-width: 426px) {
            max-width: 300px;
        }

        @media screen and (max-width: 425px) {
            left: 5%;
            right: 5%;
            bottom: 1rem;
        }
    }
</style>
