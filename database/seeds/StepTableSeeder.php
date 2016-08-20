<?php

use App\Step;
use Illuminate\Database\Seeder;

class StepTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $step = new Step();
        $step->name = 'appointments';
        $step->order = 0;
        $step->type_id = 1;
        $step->save();

        $step2 = new Step();
        $step2->name = 'skills';
        $step2->order = 1;
        $step2->type_id = 2;
        $step2->save();

        $step3 = new Step();
        $step3->name = 'referrals';
        $step3->order = 2;
        $step3->type_id = 1;
        $step3->save();

        $step4 = new Step();
        $step4->name = 'status';
        $step4->order = 3;
        $step4->type_id = 1;
        $step4->save();
    }
}
