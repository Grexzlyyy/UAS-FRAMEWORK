<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "bus_ticketing";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$db = new mysqli($host, $user, $password, $database);

if ($db->connect_error) {
  die("Koneksi gagal: " . $db->connect_error);
}
?>
