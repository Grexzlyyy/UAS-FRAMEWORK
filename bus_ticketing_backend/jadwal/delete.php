<?php
require_once("../config.php");
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$sql = "DELETE FROM jadwal WHERE id='$id'";
$db->query($sql);
echo json_encode(["message" => "Data jadwal berhasil dihapus"]);
?>