<?php
// Tangani preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Content-Type: application/json");
  http_response_code(200);
  exit();
}

// Header untuk semua metode (GET, POST, dll)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");

require_once("../config.php");

// Ambil data JSON dari body
$data = json_decode(file_get_contents("php://input"), true);

// Validasi input
if (!isset($data['id']) || !isset($data['nama_kategori'])) {
  http_response_code(400);
  echo json_encode(["message" => "Data tidak lengkap"]);
  exit();
}

$id = $data['id'];
$nama_kategori = $data['nama_kategori'];

// Simpan ke database
$stmt = $db->prepare("INSERT INTO kategori (id, nama_kategori) VALUES (?, ?)");
$stmt->bind_param("is", $id, $nama_kategori);

if ($stmt->execute()) {
  echo json_encode(["message" => "Kategori berhasil ditambahkan"]);
} else {
  http_response_code(500);
  echo json_encode(["message" => "Gagal menambahkan kategori", "error" => $stmt->error]);
}
?>
