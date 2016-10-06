<?php
use App\SUM;
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
    return view('layouts.index');
});

Route::get('/logout', 'LoginController@logout');


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
Route::resource('login', 'LoginController');
Route::resource('sum', 'SumController');

Route::get('/aprobar/{id}', function($id){
	$sum = SUM::find($id);
	$sum->estatus = 1;
	$sum->save();
	return "listo";
});

Route::get('/nuevo_personal', 'PersonalController@nuevo');
Route::get('/nuevo_usuario', 'UsuariosController@nuevo');
Route::get('/nueva_solicitud_sum', 'SumController@nuevo');
