<?php
$hostname="127.0.0.1";
$username="root";
$password="";
$database="musicpro";

// Establecer conexion
$conn = mysqli_connect($hostname, $username, $password, $database);
// conexion correcta
if (!$conn) {
    die("Conexión fallida: " . mysqli_connect_error());
}
//echo "Se establecio conexión ";
//mysqli_close($conn);
?>