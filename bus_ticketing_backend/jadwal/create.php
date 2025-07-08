<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
  http_response_code(200);
  exit();
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Content-Type: application/json");

require_once("../config.php");

$data = json_decode(file_get_contents("php://input"), true);

// Validasi input
if (
  !isset($data['id']) || $data['id'] === '' ||
  !isset($data['bus_id']) || $data['bus_id'] === '' ||
  !isset($data['tanggal']) || $data['tanggal'] === '' ||
  !isset($data['jam']) || $data['jam'] === '' ||
  !isset($data['tujuan']) || $data['tujuan'] === ''
) {
  http_response_code(400);
  echo json_encode(["message" => "Data tidak lengkap", "data_diterima" => $data]);
  exit();
}

$id = (int) $data['id'];
$bus_id = (int) $data['bus_id'];
$tanggal = $data['tanggal'];
$jam = $data['jam'];
$tujuan = $data['tujuan'];

// Cek apakah jadwal bentrok
$cek = $db->prepare("SELECT COUNT(*) FROM jadwal WHERE bus_id = ? AND tanggal = ? AND jam = ?");
$cek->bind_param("iss", $bus_id, $tanggal, $jam);
$cek->execute();
$cek->bind_result($count);
$cek->fetch();
$cek->close();

if ($count > 0) {
  http_response_code(409); // Conflict
  echo json_encode(["message" => "Jadwal bentrok. Bus sudah memiliki jadwal di waktu tersebut."]);
  exit();
}

// Tambahkan data baru
$stmt = $db->prepare("INSERT INTO jadwal (id, bus_id, tanggal, jam, tujuan) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("iisss", $id, $bus_id, $tanggal, $jam, $tujuan);

if ($stmt->execute()) {
  echo json_encode(["message" => "Data jadwal berhasil ditambahkan"]);
} else {
  http_response_code(500);
  echo json_encode(["message" => "Gagal menambahkan data", "error" => $stmt->error]);
}
?>