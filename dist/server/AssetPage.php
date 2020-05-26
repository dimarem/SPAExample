<?php
    /**
     * Данный скрипт производит данные для
     * страницы содержащей описанием недвижимости.
     * Возвращаемая данные определяются параметром $id.
     */
    require_once "DataBase.php";

    $id = (int) $_REQUEST["id"]; // id объекта недвижимости
    $total = 198;                // общее кол-во объектов недвижимости
    $data = null;                // описание недвижимости
    $assets = db($total);   // массив с описанием объектов недвижимости
    
    for ($i = 0; $i < count($assets); $i++) {
        if ($assets[$i]["id"] === $id) {
            $data = $assets[$i];


            $data["phone"] = "(999) 999-99-99";
            $data["adress"] = "GB, Some-city, Wartington, 61a";
            $data["vk"] = "/";
            $data["telega"] = "/";

            break;
        }
    }

    echo json_encode($data);
