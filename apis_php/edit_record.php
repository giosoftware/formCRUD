<?php
  include_once ('db_conn.php');

  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata, true);

  $id = $request["id"];
  $dni = $request["dni"];
  $nombre = $request["nombre"];
  $numeroDeError = "0";

  $consulta = "UPDATE socios SET ";
  $consulta .= "dni = :dni, ";
  $consulta .= "nombre = :nombre ";
  $consulta .= "WHERE id = :id;";

  $hacerConsulta = $conexion->prepare($consulta); // Se crea un objeto PDOStatement.
  $hacerConsulta->bindParam(":id", $id); // Se asigna una variable para la consulta.
  $hacerConsulta->bindParam(":dni", $dni); // Se asigna un valor para la consulta.
  $hacerConsulta->bindParam(":nombre", $nombre); // Se asigna un valor para la consulta.
  try {
    $hacerConsulta->execute(); // Se ejecuta la consulta.
  } catch (PDOException $e) {
    $numeroDeError = $hacerConsulta->errorCode();
  }
	$hacerConsulta->closeCursor(); // Se libera el recurso.

  $respuesta = json_encode($numeroDeError);
  echo $respuesta;
?>
