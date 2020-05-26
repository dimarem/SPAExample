/**
 * Хранилище.
 */
import Vue from "vue/dist/vue.min.js";
import Vuex from "vuex/dist/vuex.min.js";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        /**
         * Индикатор необходимости 
         * отображения окна поиска недвижимости.
         */
        searchWindowRequired: false
    },
    getters: {
        /**
         * Проверяет наличие сохраненных
         * данных для компонента HomePage.
         * 
         * @returns {boolean}
         */
        hasHomePageData(state) {
            if ("homePage" in state) return true;
            return false;
        },
        /**
         * Возвращает сохраненные ранее данные
         * компонента HomePage.
         * 
         * @returns {object}
         */
        homePageStoredData(state) {
            return state.homePage;
        },
        /**
         * Проверяет наличие сохраненных
         * данных для компонента AssetsPage.
         * 
         * @returns {boolean}
         */
        hasAssetsPageData(state) {
            if ("assetsPage" in state) return true;
            return false;
        },
        /**
         * Возвращает сохраненные ранее данные
         * компонента AssetsPage.
         * 
         * @returns {object}
         */
        assetsPageStoredData(state) {
            return state.assetsPage;
        },
        /**
         * Возвращает сохраненный порядковый номер
         * просматриваемых данных компонента AssetsPage
         * (см. storeAssetsPageDataChunk).
         * 
         * @returns {number}
         */
        assetsPageDataChunk(state) {
            return state.assetsPageChunk;
        },
        /**
         * Возвращает ранее сохраненную
         * строку представлющую собой
         * url для запроса данных по 
         * объектам недвижимости (без dataChunk).
         * 
         * @returns {string}
         */
        storedSearchURL(state) {
            return state.searchURL;
        },
        /**
         * Проверяет наличие ранее сохраненных
         * описаний объектов недвижимостей.
         * 
         * @returns {boolean}
         */
        hasAssetDescriptions(state) {
            if ("assetDescriptions" in state) return true;
            else return false;
        },
        /**
         * Возвращает объект с сохраненными
         * ранее описаниями объектов недвижимости.
         * 
         * @returns {object}
         */
        assetDescriptions(state) {
            return state.assetDescriptions;
        }
    },
    mutations: {
        /**
         * Создает окно поиска недвижимости.
         */
        createSearchWindow(state) {
            state.searchWindowRequired = true;
        },
        /**
         * Удаляет окно поиска недвижимости.
         */
        destroySearchWindow(state) {
            state.searchWindowRequired = false;
        },
        /**
         * Сохраняет полученные с сервера
         * поисковые атрибуты (варианты опций поиска)
         * объектов недвижимости.
         * 
         * @param {object} payload - объект содержащий поисковые атрибуты.
         */
        storeSearchAttributes(state, payload) {
            Vue.set(state, "searchAttributes", payload);
        },
        /**
         * Сохраняет строку представляющую собой
         * url для запроса данных по объектам недвижимости.
         * 
         * @param {string} payload - url запроса.
         * @example "/ASSETS_DATA_URL?param1=value1&param2=value2..."
         */
        storeSearchURL(state, payload) {
            if ("searchURL" in state) {
                state.searchURL = payload;
            } else {
                Vue.set(state, "searchURL", payload);
            }
        },
        /**
         * Сохраняет данные компонента HomePage.
         * 
         * @param {object} payload - объект с контентом компонента.
         */
        storeHomePageData(state, payload) {
            Vue.set(state, "homePage", payload);
        },
        /**
         * Удаляет данные компонента AssetsPage.
         */
        dropAssetsPageData(state) {
            Vue.delete(state, "assetsPage");
        },
        /**
         * Сохраняет данные компонента AssetsPage.
         * 
         * @param {object} payload - объект со следующими свойствами:
         * data - массив объектов с описанием недвижимости
         * total - общее количество объектов недвижимости
         * dataChunksAmount - суммарное количество всех частей данный сформированных сервером
         * hasMore - булевый индикатор наличия следующей части, которую можно запросить у сервера
         */
        storeAssetsPageData(state, payload) {
            if ("assetsPage" in state) {
                // объединим предыдущие данные с новыми
                payload.data = state.assetsPage.data.concat(payload.data);

                state.assetsPage = payload;
            } else {
                Vue.set(state, "assetsPage", payload);
            }
        },
        /**
         * После запроса данных у сервера, формируется
         * массив, каждый элемент которого представляет
         * собой массив объектов с описанием отдельной недвижимости.
         * Данный метод сохраняет порядковый номер такого элемента,
         * возвращенного сервером в текущий момент.
         * 
         * @param {number} payload - порядковый номер.
         */
        storeAssetsPageDataChunk(state, payload) {
            if ("assetsPageChunk" in state) {
                state.assetsPageChunk = payload;
            } else {
                Vue.set(state, "assetsPageChunk", payload);
            }
        },
        /**
         * Сохраняет описание объекта недвижимости.
         * 
         * @param {object} payload - объект содержащий id объекта недвижимости и его описание.
         */
        storeAssetDescription(state, payload) {
            if ("assetDescriptions" in state === false) Vue.set(state, "assetDescriptions", {});

            state.assetDescriptions[payload.id] = payload.description;
        }
    }
})

export default store;
