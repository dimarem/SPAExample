<template>
    <!-- компонент загрузки, отображаемый пока загружается асинхронный компонент -->
    <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
    </div>
</template>

<style lang="scss" scoped>
    .spinner {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 50px;
        height: 40px;
        transform: translate(-50%, -50%);
    }

    .spinner > div {
        display: inline-block;
        height: 100%;
        width: 4px;
        background-color: rgb(25, 25, 25);
        animation: scale 1.2s infinite ease-in-out;
    }

    .spinner .rect2 {
        animation-delay: -1.1s;
    }

    .spinner .rect3 {
        animation-delay: -1.0s;
    }

    .spinner .rect4 {
        animation-delay: -0.9s;
    }

    .spinner .rect5 {
        animation-delay: -0.8s;
    }

    @keyframes scale {
        0%, 40%, 100% { 
            transform: scaleY(0.4);
        } 20% { 
            transform: scaleY(1.0);
        }
    }
</style>
