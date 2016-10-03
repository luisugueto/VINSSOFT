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
                            Nuevo Personal
                            <br><small>Ingrese los datos de la persona a registrar.</small>
                        </h2>
                        <hr>
                    <form action="{{ route('personal.store') }}" method="POST">
                        <input type="hidden" name="_token" value="{{ CSRF_TOKEN()}}">
                        <div class="col-md-12">
                                <div class="form-horizontal col-md-6">
                                    <div class="form-group">
                                        <label class="control-label col-sm-4">Cargo</label>
                                        <div class="input-group col-sm-8">
                                            <input class="form-control" type="text" name="cargo">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-4">Cédula</label>
                                        <div class="input-group col-sm-8">
                                            <select class="form-control consonante" name="tipo_ced">
                                                <option>V</option>
                                                <option>E</option>
                                                <option>J</option>
                                                <option>G</option>
                                            </select>
                                            <input class="form-control" type="text" name="cedula" placeholder="Ejm: 123456789">
                                        <!--    <select class="form-control ult" >
                                                <option></option>
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                            </select> -->
                                        </div>
                                    </div>
                                </div>
                                <div class="form-horizontal col-md-6">
                                    <div class="form-group">
                                        <label class="control-label col-sm-4">Nombres</label>
                                        <div class="input-group col-sm-8">
                                            <input class="form-control" type="text" name="nombres">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-4">Apellido</label>
                                        <div class="input-group col-sm-8">
                                            <input class="form-control" type="text" name="apellidos">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-4">Correo</label>
                                        <div class="input-group col-sm-8">
                                            <input class="form-control" type="email" name="correo">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-4">Telefono</label>
                                        <div class="input-group col-sm-8">
                                            <input class="form-control" type="text" name="telefono">
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div align="center">
                                    <div class="form-group">
                                        <input class="btn btn-primary" type="submit" value="Aceptar">
                                    </div>
                            </div>
                        </form>
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
