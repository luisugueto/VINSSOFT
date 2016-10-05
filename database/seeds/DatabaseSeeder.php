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
    	DB::table('users')->insert([
            'name' => 'Luis',
            'email' => 'blink242@outlook.com',
            'password' => bcrypt('1234'),
            'roles_id' => '1',
        ]);
        // $this->call(UsersTableSeeder::class);
    }
}
