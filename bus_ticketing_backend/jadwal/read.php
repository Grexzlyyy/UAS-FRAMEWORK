<?php
require_once("../config.php");

header("Content-Type: application/json"); // TAMBAHKAN HEADER

$result = $db->query("SELECT * FROM jadwal");
$data = [];

while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}

echo json_encode($data);
?>
