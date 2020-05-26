<template>
    <div class="search-window-close-button-container">
        <button class="search-window-close-button">
            <svg viewBox="0 0 413.348 413.348">
                <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 
                24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
            </svg>
        </button>
    </div>
</template>

<style lang="scss">
    .search-window-close-button-container {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 2rem;
    }

    .search-window-close-button {
        cursor: pointer;
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
