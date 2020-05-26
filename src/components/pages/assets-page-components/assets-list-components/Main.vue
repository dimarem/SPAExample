<template>
    <main class="assets-list-main">
        <template v-if="content.length">
            <!-- краткие описания объектов недвижимости -->
            <Asset 
                v-for="item in content"
                :key="item.id"
                :content="item"
            />
        </template>
        <template v-else>
            <div class="assets-list-empty">В данный момент список пуст, воспользуйтесь меню поиска на панели сверху для поиска интересующей вас информации.</div>
        </template>
    </main>
</template>

<script>
    import Asset from "./main-components/Asset.vue";

    export default {
        props: {
            content: {
                type: Array,
                required: true
            }
        },
        components: {
            Asset
        }
    }
</script>

<style lang="scss">
    .assets-list-main {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        max-width: 1200px;
        min-height: 100vh;
        margin: auto;
        padding-top: 4rem;
    }

    .assets-list-empty {
        max-width: 600px;
        padding: 1rem;
        color: rgb(150, 150, 150);
        text-align: center;
    }
</style>
