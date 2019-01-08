<?php
  include_once ('db_conn.php');

  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata, true);
  
  $id = md5(uniqid());

  $consulta = "INSERT INTO socios (";
  $consulta .= "id, dni, nombre";
  $consulta .= ") VALUES (";
  $consulta .= ":id, :dni, :nombre);";

  $numeroDeError = "0";
  $hacerConsulta = $conexion->prepare($consulta); // Se crea un objeto PDOStatement.
  $hacerConsulta->bindParam("id", $id); // Se asigna una variable para la consulta.
  $hacerConsulta->bindParam("dni", $request['dni']); // Se asigna un valor para la consulta.
  $hacerConsulta->bindParam("nombre", $request['nombre']); // Se asigna un valor para la consulta.
  try {
    $hacerConsulta->execute(); // Se ejecuta la consulta.
  } catch (PDOException $e) {
    $numeroDeError = $hacerConsulta->errorCode();
  }
	$hacerConsulta->closeCursor(); // Se libera el recurso.

  $respuesta = json_encode($numeroDeError);
  echo $respuesta;
?>
