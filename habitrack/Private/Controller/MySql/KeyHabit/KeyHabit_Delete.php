<?php

  include($_SERVER['DOCUMENT_ROOT'].'/Private/Controller/ConnectionConfig.php');
  $conn = mysqli_connect($servername, $username, $password, $dbname);

  if (!$conn) {
    die("Connection failed. Error: " . mysqli_connect_error());
  }

  $sql = "update hab_keyhab set kha_active = false where kha_identi = " . $_POST['kha_identi'] . ";";

  if ($conn->query($sql) === TRUE) {
    echo "Habit removed.";
  } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
  }

  mysqli_close($conn);

 ?>
