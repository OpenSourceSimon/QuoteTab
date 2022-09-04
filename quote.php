<?php

$json = file_get_contents('https://raw.githubusercontent.com/StopmotionSimonYT/QuoteTab/quote/main.json');
$arr = json_decode($json, true);
$element = $arr[mt_rand(0, count($arr) - 1)];

$json = json_encode($element);
echo $json;
?>
