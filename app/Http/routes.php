<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});


//URLS REST
Route::resource('app', 'AppController');
Route::resource('personal', 'PersonalController');
Route::resource('tareas', 'TareasController');
Route::resource('eventos', 'EventosController');
Route::resource('asistencias', 'AsistenciasController');
Route::resource('horarios', 'HorariosController');
Route::resource('reportes', 'ReportesController');
Route::resource('usuarios', 'UsuariosController');
Route::resource('sistema', 'SistemaController');
Route::get('/nuevo', 'PersonalController@nuevo');

Route::group(['prefix'=>'/personal'], function () {
    Route::get('/nuevo', function(){
    	return "hola";
    });
});     

