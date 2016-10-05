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
                    <a href="{{ URL::to('/') }}">
                        <i class="fa fa-home fa-fw"></i>&nbsp; Inicio
                    </a>
                </li>
                <li>
                    <a href="{{ route('personal.index') }}">
                        <i class="fa fa-group fa-fw"></i>&nbsp; Personal
                    </a>
                </li>
                <li>
                    <a href="{{ route('tareas.index') }}">
                        <i class="fa fa-flag fa-fw"></i>&nbsp; Tareas
                    </a>
                </li>
                <li>
                    <a href="{{ route('eventos.index') }}">
                        <i class="fa fa-calendar-o fa-fw"></i>&nbsp; Eventos
                    </a>
                </li>
                <li>
                    <a href="{{ route('asistencias.index') }}">
                        <i class="fa fa-edit fa-fw"></i>&nbsp; Asistencia
                    </a>
                </li>
                <li>
                    <a href="{{ route('horarios.index') }}">
                        <i class="fa fa-clock-o fa-fw"></i>&nbsp; Horarios
                    </a>
                </li>
                <li>
                    <a href="{{ route('reportes.index') }}">
                        <i class="fa fa-file-pdf-o fa-fw"></i>&nbsp; Reportes
                    </a>
                </li>
                <li>
                    <a href="{{ route('usuarios.index') }}">
                        <i class="fa fa-user fa-fw"></i>&nbsp; Usuarios
                    </a>
                </li>
                <li>
                    <a href="{{ route('sistema.index') }}">
                        <i class="fa fa-cog fa-fw"></i>&nbsp; Sistema
                    </a>
                </li>
                <li>
                    <a href="{{ URL::to('/logout') }}">
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
                        Bienvenido,  {{Auth::user()->name}}. Tienes <span class="badge">4 tareas</span> y <span class="badge">4 mensajes</span> pendientes.
                      </div>
                    </div>
                <!--    <div class="blog-main col-md-12">
                        <div class="jumbotron">
                          <h1>¡Bienvenido de vuelta!</h1>
                          <br>
                          <div class="alert alert-danger" role="alert">Ayer no asististe a el horario establecido.</div>
                        </div>
                    </div> -->

                    @yield('content')
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
