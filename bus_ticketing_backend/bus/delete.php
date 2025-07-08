<?php
// ======= UNIVERSAL CORS HANDLER =======
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

require_once("../config.php");
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$sql = "DELETE FROM bus WHERE id='$id'";
$db->query($sql);
echo json_encode(["message" => "Data bus berhasil dihapus"]);
?>