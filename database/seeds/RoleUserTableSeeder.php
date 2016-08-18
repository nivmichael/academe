<?php

use App\RoleUser;
use Illuminate\Database\Seeder;

class RoleUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roleUser = new RoleUser();
        $roleUser->user_id = 109;
        $roleUser->role_id = 1;
        $roleUser->save();
    }
}
