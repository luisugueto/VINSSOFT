<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'nombre' => 'Administrador',
            'descripcion' => 'Administrador',
        ]);
        DB::table('roles')->insert([
            'nombre' => 'Secretaria',
            'descripcion' => 'asfas',
        ]);
        DB::table('roles')->insert([
            'nombre' => 'Becario',
            'descripcion' => 'asfasf',
        ]);
        DB::table('personal')->insert([
            'nombres' => 'Luis',
            'apellidos' => 'Ugueto',
            'cargo' => 'Programador',
            'tipoced' => 'V',
            'cedula' => '24388425',
            'correo' => 'blink242@outlook.com',
            'telefono' => '12412412412',

        ]);
    	DB::table('users')->insert([
            'name' => 'Luis',
            'email' => 'blink242@outlook.com',
            'password' => bcrypt('1234'),
            'roles_id' => '1',
            'id_personal' => '1',
        ]);
        // $this->call(UsersTableSeeder::class);
    }
}
