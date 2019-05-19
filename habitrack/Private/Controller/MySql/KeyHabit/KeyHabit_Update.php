<?php

  include($_SERVER['DOCUMENT_ROOT'].'/Private/Controller/ConnectionConfig.php');
  $conn = mysqli_connect($servername, $username, $password, $dbname);

  if (!$conn) {
    die("Connection failed. Error: " . mysqli_connect_error());
  }

$date = new DateTime();
date_timezone_set($date, timezone_open('America/Sao_Paulo'));

  $sql = "update hab_keyhab set kha_name = \"" . $_POST['kha_name'] .
    "\", kha_descri = \"" . $_POST['kha_descri'] .
    "\", kha_eddate = '" . $date->format('Y-m-d H:i:s') . "' where kha_identi = " . $_POST['kha_identi'] . ";";

  if ($conn->query($sql) === TRUE) {
    echo "Habit changes saved.";
  } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
  }

  mysqli_close($conn);

 ?>
