<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
  http_response_code(200);
  exit();
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");

require_once("../config.php");

$data = json_decode(file_get_contents("php://input"), true);
echo json_encode(["isi_data" => $data]);

// Validasi input
if (
  !isset($data['id']) || 
  !isset($data['nama_bus']) ||
  !isset($data['kapasitas']) ||
  !isset($data['kategori_id'])
) {
  http_response_code(400);
  echo json_encode(["message" => "Data tidak lengkap"]);
  exit();
}

$id = $data['id'];
$nama_bus = $data['nama_bus'];
$kapasitas = $data['kapasitas'];
$kategori_id = $data['kategori_id'];

$stmt = $db->prepare("INSERT INTO bus (id, nama_bus, kapasitas, kategori_id) VALUES (?, ?, ?, ?)");
$stmt->bind_param("isii", $id, $nama_bus, $kapasitas, $kategori_id);

if ($stmt->execute()) {
  echo json_encode(["message" => "Data bus berhasil ditambahkan"]);
  exit();
} else {
  http_response_code(500);
  echo json_encode(["message" => "Gagal menambahkan data", "error" => $stmt->error]);
  exit();
}

?>