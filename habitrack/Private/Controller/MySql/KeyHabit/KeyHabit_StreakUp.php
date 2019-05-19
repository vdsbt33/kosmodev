<?php

  include($_SERVER['DOCUMENT_ROOT'].'/Private/Controller/ConnectionConfig.php');
  $conn = mysqli_connect($servername, $username, $password, $dbname);

  if (!$conn) {
    die("Connection failed. Error: " . mysqli_connect_error());
  }

$date = new DateTime();
date_timezone_set($date, timezone_open('America/Sao_Paulo'));

  $sql = "update hab_keyhab set kha_streak = kha_streak + 1 " . 
  "where kha_identi = " . $_POST['kha_identi'] . ";";
  $sql2 = "insert into hab_strlog (stl_kha_identi, stl_action, stl_streak, stl_crdate)".
  "values (".$_POST['kha_identi'].",
  'increase',
  (select kha_streak from hab_keyhab where kha_identi = ".$_POST['kha_identi']."),
  '".$date->format('Y-m-d H:i:s')."');";

  if ($conn->query($sql) === TRUE) {
    if ($conn->query($sql2) === TRUE) {
    echo "Habit changes saved.";
    } else {
      echo "Could not save to hab_strlog. Error: " . $sql . "<br>" . $conn->error;
    }
  } else {
      echo "Could not save to hab_keyhab. Error: " . $sql . "<br>" . $conn->error;
  }

  mysqli_close($conn);

 ?>
