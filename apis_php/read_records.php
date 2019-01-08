<?php
  include_once ('db_conn.php');

  $consulta = "SELECT * FROM socios;";

  $hacerConsulta = $conexion->query($consulta);
  $membersArray = $hacerConsulta->fetchAll(PDO::FETCH_ASSOC);
  $hacerConsulta->closeCursor();

  $memberJson = json_encode($membersArray);
  echo $memberJson;
?>
