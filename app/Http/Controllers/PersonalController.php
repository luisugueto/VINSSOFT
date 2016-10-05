<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use App\Personal;
use Session;
use App\Http\Requests;

class PersonalController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $personal = Personal::all();
        return view('personal.personal', compact('personal'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $personal = new Personal();
        $personal->nombres = $request['nombres'];
        $personal->apellidos = $request['apellidos'];
        $personal->cargo = $request['cargo'];
        $personal->tipoced = $request['tipo_ced'];
        $personal->cedula = $request['cedula'];
        $personal->correo = $request['correo'];
        $personal->telefono = $request['telefono'];
        $personal->save();
       
        Session::flash('mensaje', 'Personal Creado Correctamente');

        $personal = Personal::all();
        return view('personal.personal', compact('personal'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


    public function nuevo()
    {
        return view('personal.nuevopersonal');
    }
}
