<?php
    /**
     * Функция фильтрации данных по
     * объектам недвижимости в соответствии с
     * поисковыми параметрами.
     * 
     * @param {array} $assets - данные для фильтрации.
     * @param {array} $search_params - параметры фильтрации.
     * @return {array}
     */
    function filter($assets, $search_params)
    {
        $result = [];

        foreach ($assets as $assets_item) {
            if (
                ($search_params["dealType"] === "All" || $assets_item["deal_type"] === $search_params["dealType"]) &&
                ($search_params["assetType"] === "All" || $assets_item["asset_type"] === $search_params["assetType"]) &&
                ($search_params["district"] === "All" || $assets_item["district"] === $search_params["district"]) &&
                ($search_params["area"] === "All" || $assets_item["area"] <= $search_params["area"]) &&
                ($search_params["rooms"] === "All" || $assets_item["rooms"] <= $search_params["rooms"]) &&
                ($search_params["floor"] === "All" || $assets_item["floor"] <= $search_params["floor"]) &&
                ($search_params["price"] === "All" || $assets_item["price"] <= $search_params["price"])
            ) $result[] = $assets_item;
        }

        return $result;
    }

    /**
     * Сравнивает элементы массива 
     * по наличию отметки "hot" и цене
     * объекта недвижимости.
     * 
     * @param {array} $a - элемент массива один.
     * @param {array} $b - элемент массива два.
     * @return {integer}
     */
    function orderSortFunc($a, $b)
    {
        if ($a["hot"] && !$b["hot"]) return -1;

        if (!$a["hot"] && $b["hot"]) return 1;

        if (!$a["hot"] && !$b["hot"]) {
            if ($a["price"] === $b["price"]) return 0;

            return ($a["price"] < $b["price"]) ? -1 : 1;
        }

        if ($a["hot"] && $b["hot"]) {
            if ($a["price"] === $b["price"]) return 0;

            return ($a["price"] < $b["price"]) ? -1 : 1;
        }
    }

    /**
     * Данная функция сортирует
     * переданный массив по возрастанию цены
     * (по-ум., данные и так созданы в таком порядке,
     * но данная функциональность всеравно реализована),
     * при этом выставляя объекты недвижимости с 
     * пометкой "hot" в начале массива.
     * 
     * @param {array} $assets - данные для сортировки.
     * @return {array}
     */
    function order($assets)
    {
        if (!count($assets)) return [];

        usort($assets, "orderSortFunc");

        return $assets;
    }
