<template>
    <!-- данный компонент скрывает страницу до его полной готовности -->
    <div class="curtain"></div>
</template>

<style lang="scss">
    .curtain {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        width: 100%;
        height: 100vh;
        background-color: white;
    }
</style>
