<!DOCTYPE html>
<html lang="pt" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>kosmodev</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="/css/index.css">
    <link rel='stylesheet' href='/css/tables.css'>
    <link rel='stylesheet' href='/HabiTrack/Shared/Areas/KeyHabit_Add/css/KeyHabit_List_Style.css'>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="/HabiTrack/js/KeyHabit_Main.js"></script>
    <!-- <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script> -->
  </head>
  <body>
    <?php include $_SERVER['DOCUMENT_ROOT']."/Shared/header.html"; ?>
    <article class="container">
        <div id='SearchRow'>
          <label>Filter by:</label><select id='keyHabit_FilterType'>
          <option value='none'>None</option>
          <option value='name'>Name</option>
          <option value='descri'>Description</option>
          <option value='crdate'>Creation Date</option>
          <option value='eddate'>Edit Date</option>
          </select>
          <input id='keyHabit_FilterValue' type='text' readonly></input>
          <a href="javascript:void(0)" id='keyHabit_SearchBtn' class='a_btn'><i class="fa fa-search" aria-hidden="true"></i><span class='text'>Search</span></a>
        </div>
        <div style="overflow-x: auto;">
        <div id='KeyHabit_List'>
          <?php include $_SERVER['DOCUMENT_ROOT']."/HabiTrack/Private/Controller/MySql/KeyHabit/KeyHabit_SelectAll.php"; ?>
        </div>
        <br>
        <?php //include $_SERVER['DOCUMENT_ROOT']."/Shared/Areas/KeyHabit_Add/KeyHabit_Add.html" ?>
      </div>
    </article>
    <?php include $_SERVER['DOCUMENT_ROOT']."/Shared/footer.html"; ?>
  </body>
</html>
