@extends('layouts.inicio')

@section('content')
                    <div class="col-md-12">


                        <h2 class="titulo">
                            Nueva Solicitud
                            <br><small>Ingrese los datos para nueva solicitud.</small>
                        </h2>
                        <hr>
                        
                    <form action="{{ route('sum.store') }}" method="POST">
                        <input type="hidden" name="_token" value="{{ CSRF_TOKEN()}}">
                        <div class="col-md-12">
                                <div class="form-horizontal col-md-6">
                                    <div class="form-group">
                                        <label class="control-label col-sm-4">Fecha</label>
                                        <div class="input-group col-sm-8">
                                            <input class="form-control" type="date" name="fecha" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-4">Hora</label>
                                        <div class="input-group col-sm-8">
                                            <input class="form-control" type="time" name="hora" required>
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
                                        <label class="control-label col-sm-4">Responsable</label>
                                        <div class="input-group col-sm-8">
                                            <input class="form-control" type="text" name="responsable" required>
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
@stop