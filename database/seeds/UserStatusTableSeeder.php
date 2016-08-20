<?php

use App\UserStatusEvent;
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
        $status = new UserStatusEvent();
        $status->user_status_type = 'invited';
        $status->save();

        $status2 = new UserStatusEvent();
        $status2->user_status_type = 'canceled';
        $status2->save();

        $status3 = new UserStatusEvent();
        $status3->user_status_type = 'pending';
        $status3->save();

        $status4 = new UserStatusEvent();
        $status4->user_status_type = 'RSVP';
        $status4->save();
    }
}
