<template>
    <span class="confirm-button-spinner">
        <span class="dot-1"></span>
        <span class="dot-2"></span>
        <span class="dot-3"></span>
    </span>
</template>

<style lang="scss">
    .confirm-button-spinner > span {
        display: inline-block;
        width: 6px;
        height: 6px;
        margin-right: 3px;
        background-color: #fff;
        border-radius: 50%;
        animation: dot-bounce 1.4s infinite ease-in-out;
    }

    .confirm-button-spinner .dot-1 {
        animation-delay: -0.32s;
    }

    .confirm-button-spinner .dot-2 {
        animation-delay: -0.16s;
    }

    @keyframes dot-bounce {
        0%, 80%, 100% { 
            transform: scale(0);
        } 40% { 
            transform: scale(1.0);
        }
    }
</style>
