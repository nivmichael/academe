<?php

namespace App\Repositories;

use App\Step;
use App\Task;

use DB;
use Schema;
use response;


class TaskRepository
{

    public function forStep($step)
    {
        return Task::where('step_id', $step->id)->get();
    }




}