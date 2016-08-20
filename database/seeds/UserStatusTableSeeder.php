<?php

use App\UserStatusType;
use Illuminate\Database\Seeder;

class UserStatusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $status = new UserStatusType();
        $status->user_status_type = 'invited';
        $status->save();

        $status2 = new UserStatusType();
        $status2->user_status_type = 'canceled';
        $status2->save();

        $status3 = new UserStatusType();
        $status3->user_status_type = 'pending';
        $status3->save();

        $status4 = new UserStatusType();
        $status4->user_status_type = 'RSVP';
        $status4->save();
    }
}
