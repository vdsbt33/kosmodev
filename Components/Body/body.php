<html>
  <head>
    <title>kosmodev</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link rel="stylesheet" href="/Modules/bootstrap/css/bootstrap.min.css">
    <script src="/Modules/jQuery/jquery-3.4.1.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="/Modules/bootstrap/js/bootstrap.min.js"></script>

    <link rel="stylesheet" href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css" media="all">
  </head>
  
  <body>
    <?php
      $root = $_SERVER['DOCUMENT_ROOT'];
      $config_data = json_decode(file_get_contents($root . '/Config/config.json'), true);

      if (empty($hideHeader))
        include $root . '/Components/Header/header.php';
      
      include $root . '/' . $path . '/content.php';

      if (empty($hideFooter))
        include $root . '/Components/Footer/footer.php';
    ?>
  </body>
</html>