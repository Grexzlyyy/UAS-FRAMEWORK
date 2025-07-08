<?php
require_once("../config.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$result = $db->query("SELECT * FROM penumpang");
$data = [];

while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}

echo json_encode($data);
?>
