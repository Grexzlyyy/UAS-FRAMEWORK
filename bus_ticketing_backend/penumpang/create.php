<?php
// CORS preflight handler
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
  http_response_code(200);
  exit();
}

// Header utama
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Content-Type: application/json");

require_once("../config.php");

$data = json_decode(file_get_contents("php://input"), true);

if (
  !$data ||
  !isset($data['id']) ||
  !isset($data['nama']) ||
  !isset($data['nik']) ||
  !isset($data['hp']) ||
  !isset($data['email']) ||
  !isset($data['jadwal_id'])
) {
  http_response_code(400);
  echo json_encode(["message" => "Data tidak lengkap"]);
  exit;
}

$id = $data['id'];
$nama = $data['nama'];
$nik = $data['nik'];
$hp = $data['hp'];
$email = $data['email'];
$jadwal_id = $data['jadwal_id'];

$stmt = $db->prepare("INSERT INTO penumpang (id, nama, nik, hp, email, jadwal_id) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("issssi", $id, $nama, $nik, $hp, $email, $jadwal_id);

if ($stmt->execute()) {
  echo json_encode(["message" => "Penumpang berhasil ditambahkan"]);
} else {
  http_response_code(500);
  echo json_encode(["message" => "Gagal tambah data", "error" => $stmt->error]);
}
?>
