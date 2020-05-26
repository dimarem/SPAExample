<?php
    /**
     * Данная функция производит массив,
     * каждый элемент которого представляет собой
     * описание объекта недвижимости имитируя базу данных.
     * 
     * @param {number} $total - общее количество элементов для создания.
     * @return {array}
     */
    function db($total)
    {
        $assets = [];
        $id = 1;
        $asset = "apartment";
        $deal_type = "Аренда";
        $price = 999;
        $area = 30;
        $rooms = 3;
        $floor = 2;
        $district = 1;
        $description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum modi, quidem quis sed sapiente laborum et voluptatibus praesentium error vitae numquam exercitationem, asperiores est consequuntur facilis, laboriosam ipsa blanditiis sunt. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus quas iusto hic! Illum qui harum necessitatibus aut ab assumenda voluptas, quia fuga est, cupiditate nobis, placeat vel sequi? Illo, similique?";
        
        for($i = 0; $i < $total; $i++) {
            $assets[$i] = [
                "id"          => $i + 1,
                "front_image" => "/images/assets/$asset/asset-$id.jpg",
                "images"      => ["/images/assets/$asset/asset-$id.jpg", "/images/assets/$asset/asset-$id.jpg", "/images/assets/$asset/asset-$id.jpg"],
                "price"       => $price,
                "currency"    => "$",
                "deal_type"   => $deal_type,
                "adress"      => "NY, some-street, 61a",
                "district"    => "District $district",
                "asset_type"  => $asset === "apartment" ? "Квартира" : "Дом",
                "area"        => $area,
                "rooms"       => $rooms,
                "floor"       => $asset === "apartment" ? $floor : "",
                "description" => $description,
                "hot"         => $i % 10 ? false : true
            ];

            if ($asset === "apartment") {
                $floor === 10 ? $floor = 3 : $floor++;
            }
            
            if ($id === 10) {
                $id = 1;
                $asset === "apartment" ? $asset = "house" : $asset = "apartment";
            } else {
                $id++;
            }

            $deal_type === "Аренда" ? $deal_type = "Продажа" : $deal_type = "Аренда";
            
            $price += 55;

            $area === 60 ? $area = 30 : $area += 5;

            $rooms === 6 ? $rooms = 3 : $rooms++;

            if ($district === 10) {
                $district = 1;
            } else {
                $district++;
            }
        }

        return $assets;
    }
