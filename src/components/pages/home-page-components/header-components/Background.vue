<template>
    <div 
        :class="{invisible: !imgLoaded}" 
        :style="{backgroundImage: `url(${backgroundImage})`}"
        class="home-page-header-background"
    >
        <!-- чтобы сделать подгрузку фонового изображения плавным, -->
        <!-- прослушиваем загрузку изображения ниже -->
        <img 
            v-if="!imgLoaded" 
            @load="imgLoaded = true" 
            :src="backgroundImage"
        >
    </div>
</template>

<script>
    export default {
        props: {
            /**
             * Ссылка на фоновое изображение.
             */
            backgroundImage: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                imgLoaded: false
            }
        }
    }
</script>

<style lang="scss">
    .home-page-header-background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(210, 210, 210);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;

        &::after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba($color: #000, $alpha: .5);
        }

        img {
            display: none;
        }
    }

    .invisible {
        opacity: 0;
    }
</style>
