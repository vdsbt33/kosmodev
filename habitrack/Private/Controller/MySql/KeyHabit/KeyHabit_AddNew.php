<?php

  include($_SERVER['DOCUMENT_ROOT'].'/Private/Controller/ConnectionConfig.php');
  $conn = mysqli_connect($servername, $username, $password, $dbname);

  if (!$conn) {
    die("Connection failed. Error: " . mysqli_connect_error());
  }

$date = new DateTime();

  $sql = "insert into hab_keyhab (
    kha_name,
    kha_descri,
    kha_streak,
    kha_crdate
  ) values (
    \"" . $_POST['kha_name'] ."\",
    \"" . $_POST['kha_descri'] . "\",
    \"" . $_POST['kha_streak'] ."\",
    '" . $date->format('Y-m-d H:i:s') ."'
  );";
  $sql2 = "insert into hab_strlog (stl_kha_identi, stl_action, stl_streak, stl_crdate)".
  "values (".$_POST['kha_identi'].",
  'increase',
  (select kha_streak from hab_keyhab where kha_identi = ".$_POST['kha_identi']."),
  '".$date->format('Y-m-d H:i:s')."');";

  $error = "";
  if ($conn->query($sql) === TRUE) {
    if ($_POST['kha_streak'] > 0) {
      if ($conn->query($sql2) === TRUE){
        echo "Habit changes saved.";
      }
    }
  }

  if ($error != "") {
    echo $error;
  }

  mysqli_close($conn);

 ?>
