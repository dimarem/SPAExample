import "./index.scss";
import Vue from "vue/dist/vue.min.js";
import App from "./components/App.vue";
import ErrorComponent from "./components/global/ErrorComponent.vue";
import LoadingComponent from "./components/global/LoadingComponent.vue";
import router from "./router/router.js";
import store from "./store/store.js";
import constants from "./constants/constants.json";
import anime from "animejs/lib/anime.min.js";
import { isMobile } from "./lib/helpers.js";
import "whatwg-fetch";
import "promise-polyfill/src/polyfill";

Vue.component("ErrorComponent", ErrorComponent);
Vue.component("LoadingComponent", LoadingComponent);

Vue.prototype.constants = constants;
Vue.prototype.isMobile = isMobile;
Vue.prototype.anime = anime;

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
})
