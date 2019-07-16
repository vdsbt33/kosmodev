<html>
  <head>
    <title>kosmodev</title>
    <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="/Modules/bootstrap/css/bootstrap.min.css">
    <script src="/Modules/bootstrap/js/bootstrap.min.js"></script>
  </head>
  
  <body>
    <?php
      $root = $_SERVER['DOCUMENT_ROOT'];
      // $root = '';
      $config_data = json_decode(file_get_contents($root . '/Config/config.json'), true);

      include $root . '/Components/Header/header.php';
      
      include $root . '/' . $path . '/content.php';

      include $root . '/Components/Footer/footer.php';
    ?>
  </body>
</html>