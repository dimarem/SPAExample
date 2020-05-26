<template>
    <div class="search-window-container">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .search-window-container {
        position: relative;
        width: 1200px;
        height: 80vh;
        max-height: 700px;
        padding: 2rem 4rem;
        background-color: white;
        border-radius: 5px;
        transform: translateY(100vh);
        animation: search-window-container-show-up .3s .15s forwards;
        
        @media screen and (max-width: 1200px) {
            width: 1000px;
        }

        @media screen and (max-width: 1000px) {
            width: 100%;
            height: 100vh;
            max-height: 100vh;
            border-radius: unset;
            overflow: auto;
        }

        @media screen and (max-width: 768px) {
            padding: 2rem;
            padding-bottom: 6rem;
        }
    }

    @keyframes search-window-container-show-up {
        0% {
            transform: translateY(100vh);
        } 100% {
            transform: translateY(0);
        }
    }
</style>
