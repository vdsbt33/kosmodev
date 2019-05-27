<?php
  include($_SERVER['DOCUMENT_ROOT'].'/Private/Controller/ConnectionConfig.php');
  $conn = mysqli_connect($servername, $username, $password, $dbname);

  if (!$conn) {
    die("Connection failed. Error: " . mysqli_connect_error());
  }

  $sql = "select stl_identi, stl_kha_identi, stl_action, stl_streak, stl_crdate from hab_strlog where stl_kha_identi = " . $_GET["identi"] . " order by stl_crdate desc;";
  
  $result = mysqli_query($conn, $sql);
  
  echo "<div id='habitLog'>
  <table id='gridHabitLog' style='width: 100%;'>
    <tr>
      <th style='width: 33.33%'>Action</th>
      <th style='width: 33.33%'>New Streak</th>
      <th style='width: 33.33%'>Date</th>
    </tr>
  ";

  if (mysqli_num_rows($result) > 0){

    while ($row = mysqli_fetch_assoc($result)){
      echo "<td style='text-align: center;'>" . $row["stl_action"] . "</td>";
      echo "<td style='text-align: center;'>" . $row["stl_streak"] . "</td>";
      echo "<td style='text-align: center;'>" . $row["stl_crdate"] . "</td></tr>";
    };
  } else {
    echo "<td colspan=\"3\">No streak logs avaible to display.</td>";
  }
  echo "</tr>";
  echo "</table></div>";

  mysqli_close($conn);

 ?>
