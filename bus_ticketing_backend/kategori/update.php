<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Methods: PUT, OPTIONS");
  http_response_code(200);
  exit();
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once("../config.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || !isset($data['nama_kategori'])) {
  http_response_code(400);
  echo json_encode(["message" => "Data tidak lengkap"]);
  exit();
}

$id = $data['id'];
$nama_kategori = $data['nama_kategori'];

$stmt = $db->prepare("UPDATE kategori SET nama_kategori = ? WHERE id = ?");
$stmt->bind_param("si", $nama_kategori, $id);

if ($stmt->execute()) {
  echo json_encode(["message" => "Kategori berhasil diperbarui"]);
} else {
  http_response_code(500);
  echo json_encode(["message" => "Gagal memperbarui kategori", "error" => $stmt->error]);
}
