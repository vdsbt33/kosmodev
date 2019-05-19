<?php
  include($_SERVER['DOCUMENT_ROOT'].'/Private/Controller/ConnectionConfig.php');
  $conn = mysqli_connect($servername, $username, $password, $dbname);

  if (!$conn) {
    die("Connection failed. Error: " . mysqli_connect_error());
  }

  $sql = "select kha_identi, kha_name, kha_descri, kha_streak, kha_crdate, kha_eddate from hab_keyhab where ";

  // echo '$_GET["name"] = ' . $_GET["name"];
  if (isset($_GET["name"])) {
    $GLOBALS['sql'] = $GLOBALS['sql'] . 'kha_name like "' . $_GET["name"] . '%" and ';
  } else if (isset($_GET['description'])) {
    $GLOBALS['sql'] = $GLOBALS['sql'] . 'kha_descri like "' . $_GET["description"] . '%"  and ';
  }
  else if (isset($_GET['creationdate'])) {
    $GLOBALS['sql'] = $GLOBALS['sql'] . 'kha_crdate like "' . $_GET["creationdate"] . '%"  and ';
  } else if (isset($_GET['editdate'])) {
    $GLOBALS['sql'] = $GLOBALS['sql'] . 'kha_eddate like "' . $_GET["editdate"] . '%"  and ';
  }
  $sql = $sql . 'kha_active = true;';

  
  $result = mysqli_query($conn, $sql);
  
  echo "
  <script src='/habitrack/js/KeyHabit_SelectAll.js'></script>
  
  
  <table id='gridKeyHabit'>
    <tr>
      <th style='width: 136px;'>Action</th>
      <th style='width: 277px'>Name</th>
      <th style='width: 277px'>Description</th>
      <th style='width: 63px;'>Streak</th>
      <th style='width: 177px;'>Creation Date</th>
      <th style='width: 177px;'>Edit Date</th>
    </tr>
  ";

  if (mysqli_num_rows($result) > 0){

    while ($row = mysqli_fetch_assoc($result)){
      echo "<tr class='keyhabit_row' value='" . $row["kha_identi"] ."'><td><span class='actioncolumn'>
      <a href='javascript:void(0)' class='KeyHabit_ActionButton streakUpBtn h_accept'><i class='fa fa-thumbs-o-up' aria-hidden='true'></i></a></div>
      <a href='javascript:void(0)' class='KeyHabit_ActionButton streakResetBtn h_deny'><i class='fa fa-undo' aria-hidden='true'></i></a>
      <a href='javascript:void(0)' class='KeyHabit_ActionButton editHabitBtn'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a>
      <a href='javascript:void(0)' class='KeyHabit_ActionButton removeHabitBtn h_deny'><i class='fa fa-trash-o' aria-hidden='true'></i></a>
      <a href='javascript:void(0)' class='KeyHabit_ActionButton saveHabitBtn h_accept' style='display: none;'><i class='fa fa-floppy-o' aria-hidden='true'></i></a>
      <a href='javascript:void(0)' class='KeyHabit_ActionButton cancelHabitBtn h_deny' style='display: none;'><i class='fa fa-times' aria-hidden='true'></i></a>
      </span>
      </td>";
      echo "<td><textarea class='kha_name' readonly  readonly spellcheck='false'>". $row["kha_name"] ."</textarea></td>";
      echo "<td><textarea class='kha_descri' readonly  readonly spellcheck='false'>". $row["kha_descri"] ."</textarea></td>";
      echo "<td style='text-align: center;'>" . $row["kha_streak"] . "</td>";
      echo "<td style='text-align: center;'>" . $row["kha_crdate"] . "</td>";
      echo "<td style='text-align: center;'>" . $row["kha_eddate"] . "</td></tr>";
    };
  }
  
  // Add row
  echo "<tr class='keyhabit_row addrow'><td><span class='actioncolumn'>
  <a href='javascript:void(0)' class='KeyHabit_ActionButton addHabitBtn'><i class='fa fa-plus' aria-hidden='true'></i></a>
  <a href='javascript:void(0)' class='KeyHabit_ActionButton saveHabitBtn h_accept' style='display: none;'><i class='fa fa-floppy-o' aria-hidden='true'></i></a>
  <a href='javascript:void(0)' class='KeyHabit_ActionButton cancelHabitBtn h_deny' style='display: none;'><i class='fa fa-times' aria-hidden='true'></i></a>
  </span></td>";
  echo "<td style='width: 25%'><textarea class='newHabit_name' readonly spellcheck='false'></textarea></td>";
  echo "<td style='width: 25%'><textarea class='newHabit_descri' readonly></textarea></td>";
  echo "<td style='width: 5%'><input class='newHabit_streak' type='number' min='0' step='1' style=\"visibility: hidden;\" readonly></input></td>";
  echo "<td></td>";
  echo "<td></td></tr>";
  echo "</table>";

  mysqli_close($conn);

 ?>
