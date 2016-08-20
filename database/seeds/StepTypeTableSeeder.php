<?php

use App\TypeStep;
use Illuminate\Database\Seeder;

class StepTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $stepType = new TypeStep();
        $stepType->name = 'Open day';
        $stepType->save();

        $stepType1 = new TypeStep();
        $stepType1->name = 'Tour';
        $stepType1->save();
    }
}
