<?php
    /**
     * Данный скрипт производит данные для
     * страницы содержащей список с кратким описанием недвижимости.
     * Данные разбиваются на части с количеством $chunk_size.
     * Возвращаемая часть определяется параметром $chunk.
     */
    require_once "DataBase.php";
    require_once "Helpers.php";

    // поисковые параметры
    $search_params = [
        "dealType"  => $_REQUEST["dealType"],
        "assetType" => $_REQUEST["assetType"],
        "district"  => $_REQUEST["district"],
        "area"      => $_REQUEST["area"] === "All" ? $_REQUEST["area"] : (int) $_REQUEST["area"],
        "rooms"     => $_REQUEST["rooms"] === "All" ? $_REQUEST["rooms"] : (int) $_REQUEST["rooms"],
        "floor"     => $_REQUEST["floor"] === "All" ? $_REQUEST["floor"] : (int) $_REQUEST["floor"],
        "price"     => $_REQUEST["price"] === "All" ? $_REQUEST["price"] : (int) $_REQUEST["price"]
    ];

    /**
     * Сформируем "базу данных".
     */
    $total = 198;                          // общее кол-во объектов недвижимости
    $chunk = $_REQUEST["chunk"];           // номер части для возврата
    $chunk_size = 18;                      // количество элементов для в одной части данных
    $db = db($total);                      // массив с описанием объектов недвижимости
    $assets = filter($db, $search_params); // отфильтрованные данные в соответствии с поисковыми параметрами
    $assets = order($assets);              // отсортировать массив по возрастанию цены и степени важности его элементов

    $chunks = array_chunk($assets, $chunk_size);

    $data_chunks_amount = count($chunks);

    $has_more = $chunk < ($data_chunks_amount - 1);

    $data = [
        "data" => $chunks[$chunk],
        "total" => count($assets),
        "dataChunksAmount" => $data_chunks_amount,
        "hasMore" => $has_more
    ];

    echo json_encode($data);
