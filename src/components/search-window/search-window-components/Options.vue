<template>
    <div class="search-window-options">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .search-window-options {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;

        @media screen and (max-width: 768px) {
            flex-direction: column;
        }
    }
</style>
