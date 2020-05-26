<template>
    <header class="home-page-header">
        <Main 
            :h1="content.h1" 
            :h2="content.h2" 
        />
        <Contacts 
            :contacts="content.contacts" 
        />
        <Background 
            :background-image="content.backgroundImage" 
        />
    </header>
</template>

<script>
    import Main from "./header-components/Main.vue";
    import Background from "./header-components/Background.vue";
    import Contacts from "./header-components/Contacts.vue";

    export default {
        props: {
            content: {
                type: Object,
                required: true
            }
        },
        components: {
            Main,
            Background,
            Contacts
        }
    }
</script>

<style lang="scss">
    .home-page-header {
        position: relative;
        height: 50vh;
        min-height: 600px;
        background-color: rgb(250, 250, 250);
        overflow: hidden;
        
        @media screen and (max-width: 768px) {
            min-height: 400px;
        }
    }
</style>
