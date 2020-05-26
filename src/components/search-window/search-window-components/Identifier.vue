<template>
    <div class="search-window-identifier">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .search-window-identifier {
        padding: 0 .5rem;
        margin-bottom: 2rem;

        @media screen and (max-width: 540px) {
            padding: 0;
        }

        & > div {
            margin-bottom: .5rem;
            font-size: .8rem;
            color: rgb(150, 150, 150);
        }

        input {
            width: 400px;
            padding: .5rem 1rem;
            font: .95rem $reg;
            outline: none;
            border: 1px solid rgb(150, 150, 150);

            &:focus {
                border-color: darken($color: $theme-1, $amount: 33%);
            }

            @media screen and (max-width: 768px) {
                width: 100%;
            }
        }
    }
</style>
