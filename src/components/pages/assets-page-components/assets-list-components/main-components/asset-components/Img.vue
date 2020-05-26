<template>
    <!-- компонент формирующий область с изображением -->
    <div class="assets-list-image">
        <router-link 
            :to="url"
            :style="{backgroundImage: `url(${content.front_image})`}"
            :class="{invisible}"
        ></router-link>
        <!-- чтобы сделать подгрузку фонового изображения плавным, -->
        <!-- прослушиваем загрузку изображения ниже -->
        <img 
            v-if="invisible"
            :src="content.front_image"
            @load="invisible = false"
        >
    </div>
</template>

<script>
    export default {
        props: {
            content: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                invisible: true
            }
        },
        computed: {
            /**
             * Формирует адрес ссылки.
             * 
             * @returns {string}
             */
            url() {
                return `/assets/${this.content.id}`;
            }
        }
    }
</script>

<style lang="scss">
    .assets-list-image {
        background-color: rgb(245, 245, 245);
        overflow: hidden;

        &:hover a {
            transform: scale(1.1);
        }

        a {
            display: block;
            width: 300px;
            height: 300px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            transition: .3s;

            @media screen and (max-width: 500px) {
                width: 80vw;
                height: 80vw;
            }

            &.invisible {
                opacity: 0;
            }
        }

        img {
            display: none;
        }
    }
</style>
