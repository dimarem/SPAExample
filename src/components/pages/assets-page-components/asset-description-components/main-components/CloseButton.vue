<template>
    <button class="asset-main-close-button">
        <svg viewBox="0 0 413.348 413.348">
            <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 
                24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
        </svg>
    </button>
</template>

<style lang="scss">
    .asset-main-close-button {
        cursor: pointer;
        position: absolute;
        right: 2rem;
        top: 2rem;
        border: none;
        outline: none;
        background-color: transparent;

        svg {
            width: .9rem;
            height: .9rem;
            fill: $color;
        }
    }
</style>
