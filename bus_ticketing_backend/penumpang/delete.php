<?php
// CORS preflight handler
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Methods: DELETE, OPTIONS");
  http_response_code(200);
  exit();
}

// Header utama
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Content-Type: application/json");

require_once("../config.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
  http_response_code(400);
  echo json_encode(["message" => "ID diperlukan"]);
  exit;
}

$id = $data['id'];

$stmt = $db->prepare("DELETE FROM penumpang WHERE id=?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
  echo json_encode(["message" => "Data berhasil dihapus"]);
} else {
  http_response_code(500);
  echo json_encode(["message" => "Gagal hapus", "error" => $stmt->error]);
}
?>
