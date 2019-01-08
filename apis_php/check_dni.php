<?php
include_once ('db_conn.php');

$dni = file_get_contents("php://input");
$consulta = "SELECT 1 FROM socios WHERE dni = '".$dni."';";

$hacerConsulta = $conexion->query($consulta);
$res = $hacerConsulta->fetchColumn();

if ($res === FALSE) {
  $dniExists = "0";
} else {
  $dniExists = "1";
}

$hacerConsulta->closeCursor(); // Se libera el recurso.
$respuesta = json_encode($dniExists);
echo $respuesta;
?>