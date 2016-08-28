<?php

use App\StepType;
use Illuminate\Database\Seeder;

class TypeStepTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $stepType = new StepType();
        $stepType->name = 'event type';
        $stepType->save();

        $stepType2 = new StepType();
        $stepType2->name = 'steps';
        $stepType2->save();
    }
}
