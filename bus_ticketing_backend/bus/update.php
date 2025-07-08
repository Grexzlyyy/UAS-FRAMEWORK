<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
  http_response_code(200);
  exit();
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

require_once("../config.php");

// Pakai file_get_contents dan json_decode untuk ambil data PUT
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? null;
$nama_bus = $data['nama_bus'] ?? '';
$kapasitas = $data['kapasitas'] ?? '';
$kategori_id = $data['kategori_id'] ?? '';

if (!$id) {
  http_response_code(400);
  echo json_encode(["message" => "ID tidak boleh kosong"]);
  exit();
}

$sql = "UPDATE bus SET nama_bus=?, kapasitas=?, kategori_id=? WHERE id=?";
$stmt = $db->prepare($sql);
$stmt->bind_param("siii", $nama_bus, $kapasitas, $kategori_id, $id);

if ($stmt->execute()) {
  echo json_encode(["message" => "Data bus berhasil diperbarui"]);
} else {
  http_response_code(500);
  echo json_encode(["message" => "Gagal update data", "error" => $stmt->error]);
}
?>
