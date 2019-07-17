<html>
  <head>
    <?php
    $root = $_SERVER['DOCUMENT_ROOT'];
    $config_data = json_decode(file_get_contents($root . '/Config/config.json'), true);

    if (empty($pageTitle))
      echo "<title>kosmodev</title>";
    else 
      echo "<title>" . $pageTitle . " - kosmodev</title>";
    ?>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

    <link rel="stylesheet" href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css" media="all">
    <script src="/Components/Body/js/global.js"></script>
  </head>
  
  <body>
    <?php

      if (empty($hideHeader))
        include $root . '/Components/Header/header.php';


      include $root . '/' . $path . '/content.php';

      if (empty($hideFooter))
        include $root . '/Components/Footer/footer.php';
    ?>
  </body>
</html>