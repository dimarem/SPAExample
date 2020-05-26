<template>
    <!-- компонент загрузки, отображаемый пока загружается асинхронный компонент -->
    <div class="error">
        <div>
            <div>В процессе запроса произошла ошибка</div>
            <div class="smile">¯\_(ツ)_/¯</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .error {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;

        div {
            text-align: center;
            color: rgb(150, 150, 150);

            .smile {
                margin-top: 1rem;
                font-size: 3rem;
            }
        }
    }
</style>
