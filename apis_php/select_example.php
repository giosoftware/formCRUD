<?php
$servername = "127.0.0.1";
$username = "root";
$password = "972";
$dbname = "ang_http_1";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM socios";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["nombre"]. " " . $row["dni"]. "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>