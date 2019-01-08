<?php
  include_once ('db_conn.php');

  $id = file_get_contents("php://input");

  $consulta = "DELETE FROM socios ";
  $consulta .= "WHERE id = :id;";

  $numeroDeError = "0";
  $hacerConsulta = $conexion->prepare($consulta); // Se crea un objeto PDOStatement.
  $hacerConsulta->bindParam(":id", $id); // Se asigna una variable para la consulta.
  try {
    $hacerConsulta->execute(); // Se ejecuta la consulta.
  } catch (PDOException $e) {
    $numeroDeError = $hacerConsulta->errorCode();
  }
	$hacerConsulta->closeCursor(); // Se libera el recurso.

  $respuesta = json_encode($numeroDeError);
  echo $respuesta;
?>
