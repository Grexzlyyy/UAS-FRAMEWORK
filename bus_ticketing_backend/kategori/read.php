<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once("../config.php");

$result = $db->query("SELECT * FROM kategori ORDER BY id ASC");

$data = [];
while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}

echo json_encode($data);
