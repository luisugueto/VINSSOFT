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
    <ui-view>
        <!--[if lt IE 8]>
    <p class="alert">Usted está usando un navegador <strong>obsoleto</strong>. Por favor <a href="http://browsehappy.com/">actualice su navegador</a> para mejorar su experiencia.</p>
    <![endif]-->
            <div class="col-md-12 menubar">
                <a href="#inicio" aria-controls="inicio" role="tab" data-toggle="tab">
                    <i class="fa fa-home fa-fw"></i>&nbsp; Inicio
                </a>
                <a href="#mv" aria-controls="mv" role="tab" data-toggle="tab">
                    <i class="fa fa-flag fa-fw"></i>&nbsp; Misión y Visión
                </a>
                <a href="#horarios" aria-controls="horarios" role="tab" data-toggle="tab">
                    <i class="fa fa-clock-o fa-fw"></i>&nbsp; Horarios
                </a>
                <a href="#eventos" aria-controls="eventos" role="tab" data-toggle="tab">
                    <i class="fa fa-calendar fa-fw"></i>&nbsp; Eventos
                </a>
                <a href="#personal" aria-controls="personal" role="tab" data-toggle="tab">
                    <i class="fa fa-group fa-fw"></i>&nbsp; Personal
                </a>
            </div>
            <div class="container doc col-md-12">
                <div class="container col-md-12" role="main">
                    <div class="blog-main col-md-9">
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane active" id="inicio">
                                <legend>
                                    <i class="fa fa-calendar"></i>
                                    Próximo Evento</legend>
                                <div class="col-md-12 eventos">
                                    <div class="evento">
                                        <div class="col-md-12">
                                            <i class="fa fa-bookmark fa-2x"></i>
                                            <div class="titulo">
                                                Taller de Proyectos SocioProductivos
                                            </div>
                                        </div>
                                        <div class="fecha">
                                            <strong><i class="fa fa-flag"></i>Fecha:</strong> 22-03-16 2:00pm
                                        </div>
                                        <div class="lugar">
                                            <strong><i class="fa fa-map-marker"></i>Lugar:</strong> Salón de Usos Múltiples
                                        </div>
                                        <div class="descripcion">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis iure eius voluptatum, placeat aspernatur inventore aliquam quasi, vitae accusamus, quae nobis adipisci dolorum numquam. Dicta dolorem debitis dignissimos vel veniam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam reprehenderit, vitae repellendus, animi consequuntur qui, quod iusto sunt mollitia fugiat eum dolorem accusamus necessitatibus deleniti officiis eos, doloribus numquam dignissimos?
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-4 relacionados">
                                        <legend class="text-center sub">Enlaces Relacionados</legend>
                                        <ul>
                                            <li>
                                                <i class="fa fa-caret-square-o-right"></i>
                                                <a href="#">Página principal UPTA</a>
                                            </li>
                                            <hr>
                                            <li>
                                                <i class="fa fa-caret-square-o-right"></i>
                                                <a href="#">SARAVIS - Sistema de Gestión de Eventos del Dpto. de Vinculación Social</a>
                                            </li>
                                            <hr>
                                            <li>
                                                <i class="fa fa-caret-square-o-right"></i>
                                                <a href="#">Comunidad de Programadores Arrau</a>
                                            </li>
                                            <hr>
                                            <li>
                                                <div class="fb-like" data-href="https://www.facebook.com/UPT-Aragua-Federico-Brito-Figueroa-110653905698765/" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>
                                            </li>
                                            <hr>
                                            <li>
                                                <a href="https://twitter.com/uptaoficial" class="twitter-follow-button" data-show-count="false" data-lang="es" data-size="large">Seguir a @uptaoficial</a>
                                                <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
                                            </li>
                                        </ul>

                                    </div>
                                    <div class="col-md-8 text-center">
                                        <a class="twitter-timeline"  href="https://twitter.com/Uptaoficial" data-widget-id="712522970879684608">Tweets por el @Uptaoficial.</a>
                                        <script>
                                            !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
                                        </script>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane text-center" id="mv">
                                <legend>Misión</legend>
                                <div class="col-md-12 text-justify">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi fugiat ea, perferendis distinctio. Molestias natus nihil quaerat atque, temporibus, unde maxime odit distinctio sunt voluptas excepturi officia? Eveniet aliquam, quia! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui quia iste fugit sequi minima harum alias quas explicabo aperiam reprehenderit facilis veniam architecto mollitia commodi asperiores, atque eveniet! Saepe, delectus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate tenetur sunt qui totam excepturi blanditiis voluptatum distinctio, sed perspiciatis aliquam, repudiandae voluptate laboriosam eligendi maxime minima nemo laborum. Odio, rem.
                                <br><br><br>
                                </div>
                                <legend>Visión</legend>
                                <div class="col-md-12 text-justify">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eos fuga sed explicabo necessitatibus nostrum, molestias, corporis eligendi consequuntur nemo obcaecati sequi accusantium odit sunt omnis sapiente, dicta in, beatae? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis unde ducimus, aliquid, soluta optio molestiae eum doloribus esse minima autem non, repellat officiis tempore ipsam architecto porro magni! Vel, unde! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum non expedita quidem, quo assumenda fugit. Illo, animi, modi? Ipsam ea dolorem animi aut doloribus eius tempora laborum voluptates molestiae nesciunt.
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane text-center" id="horarios">
                                <legend>Horarios</legend>
                            </div>
                            <div role="tabpanel" class="tab-pane text-center" id="eventos">
                                <legend>Eventos</legend>
                            </div>
                            <div role="tabpanel" class="tab-pane text-center" id="personal">
                                <div class="col-md-12">
                                    <legend>Personal</legend>
                                    <div class="personal">
                                        <div class="foto" style="background: url(images/av.jpg); background-size: 100% auto;"></div>
                                        <div class="nombre">Yamilet Vivas</div>
                                        <div class="cargo">Jefa de Coordinación</div>
                                    </div>
                                    <div class="personal">
                                        <div class="foto" style="background: url(images/gv.jpeg); background-size: 100% auto;"></div>
                                        <div class="nombre">Gabriel Vastag</div>
                                        <div class="cargo">Coordinador de Protocolo</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div class="col-md-3 blog-sidebar right-sidebar">
                    <div class="col-md-11">
                        <div class="login">
                            <legend>
                                <i class="fa fa-user"></i>
                                Iniciar Sesión
                            </legend>
                        <form action="{{ route('login.store') }}" method="POST">
                            <input type="hidden" name="_token" value="{{ CSRF_TOKEN() }}">
                            <div class="form-horizontal">
                                <div class="form-group col-md-12 col-sm-4">
                                    <!-- <label for="user" class="control-label col-md-4">Correo</label> -->
                                    <div>
                                        <input type="email" class="form-control" placeholder="Correo" name="email">
                                    </div>
                                </div>
                                <div class="form-group col-md-12 col-sm-4">
                                    <!-- <label for="user" class="control-label col-md-4">Contraseña</label> -->
                                    <div>
                                        <input type="password" class="form-control" placeholder="Contraseña" name="password">
                                    </div>
                                </div>
                                <div class="form-group col-md-12 col-sm-4 text-center">
                                   <!-- <a ui-sref="inicio" href="{{ route('app.index') }}"><button class="btn btn-primary">Ingresar</button></a> -->
                                   <input type="submit" class="btn btn-primary" value="Ingresar">
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                    <div class="col-md-11">
                        <br><br>
                        <legend class="sub">
                            <i class="fa fa-info-circle"></i>
                            Acerca de...
                        </legend>
                        <p class="text-justify">
                            <small>
                                Este software funciona como parte de las actividades del Departamento de Vinculación Social, ubicado en la Universidad Politécnica Territorial de Aragua "Federico Brito Figueroa", Sede Administrativa, Av. Universidad (al lado comando FAN-Peaje). El contenido del portal principal está dirigido al público en general. El acceso como usuario está restringido al personal del Departamento de Vinculación Social.
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </ui-view>
    <div class="col-md-12">
        <hr>
    </div>
    <footer class="footer text-center col-md-12">
            <i class="fa fa-copyright"></i> UPT Aragua Federico Brito Figueroa. 2016. Coordinación de Vinculación Social.
    </footer>

    <div id="fb-root"></div>
    <script>(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.5";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>
</body>
</html>