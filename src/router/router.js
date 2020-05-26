/**
 * Маршрутизатор приложения.
 */
import Vue from "vue/dist/vue.min.js";
import VueRouter from "vue-router/dist/vue-router.min.js";
import LoadingComponent from "../components/global/LoadingComponent.vue";
import ErrorComponent from "../components/global/ErrorComponent.vue";

Vue.use(VueRouter);

const HomePage = () => ({
    component: import(/* webpackChunkName: "home-page" */ "../components/pages/HomePage.vue"),
    loading: LoadingComponent,
    error: ErrorComponent
})

const AssetsPage = () => ({
    component: import(/* webpackChunkName: "assets-page" */ "../components/pages/AssetsPage.vue"),
    loading: LoadingComponent,
    error: ErrorComponent
})

const AssetsList = () => ({
    component: import(/* webpackChunkName: "assets-list" */ "../components/pages/assets-page-components/AssetsList.vue"),
    loading: LoadingComponent,
    error: ErrorComponent
})

const AssetDescription = () => ({
    component: import(/* webpackChunkName: "asset-description" */ "../components/pages/assets-page-components/AssetDescription.vue"),
    loading: LoadingComponent,
    error: ErrorComponent
})

const routes = [
    {path: "/", component: HomePage},
    {path: "/assets", component: AssetsPage,
        children: [
            {path: "", components: {
                    "assets-list": AssetsList
                }
            },
            {path: ":id", components: {
                    "assets-list": AssetsList,
                    "asset-description": AssetDescription
                }
            }
        ]
    },
    {path: "*", component: HomePage}
]

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {x: 0, y: 0};
        }
    }
})

export default router;
