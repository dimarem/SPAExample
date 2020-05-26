<template>
    <div class="home-page-contacts">
        <div>
            <div class="phone">
                <span v-html="contacts.phone.svg"></span>
                {{ contacts.phone.number }}
            </div>
            <div class="adress">
                <span v-html="contacts.adress.svg"></span>
                {{ contacts.adress.content }}
            </div>    
        </div>
        <div class="socials">
            <a :href="contacts.vk.href">
                <span v-html="contacts.vk.svg"></span>
            </a>
            <a :href="contacts.telega.href">
                <span v-html="contacts.telega.svg"></span>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            /**
             * Объект содержащий
             * контактную информацию.
             */
            contacts: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss">
    .home-page-contacts {
        position: absolute;
        bottom: 0;
        z-index: 1;
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0 1rem 1rem;
        font-size: .9rem;

        .adress, .phone, .socials {
            color: white;

            svg {
                fill: white;
            }
        }

        .adress, .phone {
            svg {
                width: 1rem;
                height: 1rem;
                margin-right: .5rem;
            }
        }

        .phone {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
        }

        .socials {
            display: flex;
            align-items: flex-end;

            a:not(:last-of-type) {
                margin-right: 1rem;
            }

            svg {
                width: 1.2rem;
                height: 1.2rem;
            }
        }
    }
</style>
