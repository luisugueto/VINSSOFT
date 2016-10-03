<!doctype html>
<html lang="es" ng-app="mainApp">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Coordinación de Vinculación Social</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="favicon" href="./images/favicon.png">
    <link rel="stylesheet" type="text/css" href="./css/styles.css">

    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    
    <script src="./js/jquery-2.2.0.min.js"></script>
    <script src="./js/angular.min.js"></script>
    <script src="./js/angular-ui-router.min.js"></script>
    <script src="./js/app.js"></script>
    <script src="./js/main.js"></script>
    <script src="./js/bootstrap.min.js"></script>

</head>
<body role="document" ng-app="appVS">
    <div class="page-header col-md-12">
        <div class="logo"></div>
        <h1><strong>Coordinación de Vinculación Social</strong></h1>
        <h2>Universidad Politécnica Territorial de Aragua "Federico Brito Figueroa"</h2>
        <div class="social col-md-12">
            <i class="fa fa-facebook"></i>
            <i class="fa fa-twitter"></i>
            <i class="fa fa-google-plus"></i>
            <i class="fa fa-wordpress"></i>
        </div>
    </div>
    
    <div class="col-md-2 blog-sidebar">
        <div class="col-md-12 menu">
            <ul>
                <li class="foto"><img src="images/av.jpg"></li>
                <li class="nombre">Yamilet Vivas</li>
                <li class="cargo">Jefa de Departamento</li>
                <li>
                    <a href="inicio.html">
                        <i class="fa fa-home fa-fw"></i>&nbsp; Inicio
                    </a>
                </li>
                <li>
                    <a href="personal.html">
                        <i class="fa fa-group fa-fw"></i>&nbsp; Personal
                    </a>
                </li>
                <li>
                    <a href="tareas.html">
                        <i class="fa fa-flag fa-fw"></i>&nbsp; Tareas
                    </a>
                </li>
                <li>
                    <a href="eventos.html">
                        <i class="fa fa-calendar-o fa-fw"></i>&nbsp; Eventos
                    </a>
                </li>
                <li>
                    <a href="asistencia.html">
                        <i class="fa fa-edit fa-fw"></i>&nbsp; Asistencia
                    </a>
                </li>
                <li>
                    <a href="horarios.html">
                        <i class="fa fa-clock-o fa-fw"></i>&nbsp; Horarios
                    </a>
                </li>
                <li>
                    <a href="reportes.html">
                        <i class="fa fa-file-pdf-o fa-fw"></i>&nbsp; Reportes
                    </a>
                </li>
                <li>
                    <a href="usuarios.html">
                        <i class="fa fa-user fa-fw"></i>&nbsp; Usuarios
                    </a>
                </li>
                <li>
                    <a href="sistema.html">
                        <i class="fa fa-cog fa-fw"></i>&nbsp; Sistema
                    </a>
                </li>
                <li>
                    <a href="index.html">
                        <i class="fa fa-power-off fa-fw"></i>&nbsp; Salir
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div class="container doc col-md-10">
        <div class="container col-md-12 main" role="main">
            <ui-view>
                <ol class="breadcrumb">
                  <li><a href="#">Vinssoft</a></li>
                  <li class="active">Inicio</li>
                </ol>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    Bienvenido, X. Tienes <span class="badge">4 tareas</span> y <span class="badge">4 mensajes</span> pendientes.
                  </div>
                </div>
                    <div class="col-md-12">

                        <h2 class="titulo">
                            Personal
                            <br><small>Datos del personal del departamento.</small>
                        </h2>
                        <hr>

                        <div class="col-md-12">
                            <div class="col-md-6">
                                <button class="btn btn-primary" title="Registrar personal" onclick="window.location.href = '{{ URL::to('/nuevo') }}'";>
                                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                    Nuevo</button>
                            </div>
                            <div class="col-md-6 text-right">
                                    <div class="form-inline">
                                        <h4 class="buscar">Buscar</h4>
                                        <div class="form-group">
                                           <div class="input-group col-md-12">
                                                <input class="form-control input-sm" placeholder="" type="text" pattern="[A-Z0-9\-]{8,32}" title="Este código sólo puede contener letras mayúsculas, dígitos o guiones." />
                                            </div>
                                        </div>
                                        <span class="fa-stack fa-lg">
                                          <i class="fa fa-circle fa-stack-2x text-primary"></i>
                                          <i class="fa fa-search fa-stack-1x fa-inverse"></i>
                                        </span>
                                    </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <hr>
                            <table class="table table-condensed table-hover">
                                <thead>
                                    <tr>
                                        <td>Nombre</td>
                                        <td>Cargo</td>
                                        <td>Correo</td>
                                        <td>Teléfono</td>
                                        <td>Acción</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="16">No se han encontrado resultados</td>
                                    </tr>
                                </tbody>
                            </table>
                            <nav>
                              <ul class="pagination">
                                <li>
                                  <a href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                  </a>
                                </li>
                                <li><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li><a href="#">5</a></li>
                                <li>
                                  <a href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                  </a>
                                </li>
                              </ul>
                            </nav>
                        </div>
                    </div>
            </ui-view>
        </div>
    </div>
    <div class="col-md-12">
        <hr>
    </div>
    <footer class="footer text-center col-md-12">
            <i class="fa fa-copyright"></i> UPT Aragua Federico Brito Figueroa. 2016. Coordinación de Vinculación Social.
    </footer>
</body>
</html>
