@extends('layouts.inicio')

@section('content')
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
@stop