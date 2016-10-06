@extends('layouts.inicio')

@section('content')
                    <div class="col-md-12">

                        <h2 class="titulo">
                            Solicitudes SUM
                            <br><small>Datos de solicitudes SUM.</small>
                        </h2>
                        <hr>

                        <div class="col-md-12">
                            <div class="col-md-6">
                                <button class="btn btn-primary" title="Registrar personal" onclick="window.location.href = '{{ URL::to('/nueva_solicitud_sum') }}'";>
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
                                        <td>Fecha</td>
                                        <td>Hora</td>
                                        <td>Responsable</td>
                                        <td>Estatus</td>
                                        <td>Acción</td>
                                    </tr>
                                </thead>
                                <tbody align="center">
                                @foreach($sum as $solicitudes)
                                    <tr>
                                        <td>{{$solicitudes->fecha}}</td>
                                        <td>{{$solicitudes->hora}}</td>
                                        <td>{{$solicitudes->responsable}}</td>
                                        @if($solicitudes->estatus == 0)
                                            <td>No Aprobada</td>
                                            <td><a href="/aprobar/{{$solicitudes->id}}">Aprobar</a></td>
                                        @else
                                            <td>Aprobada</td>
                                            <td></td>
                                        @endif
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                            <nav>
                              <ul class="pagination">
                                <li>{{ $sum->links() }}
                              </ul>
                            </nav>
                        </div>
                    </div>
@stop
