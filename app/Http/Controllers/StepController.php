<?php

namespace App\Http\Controllers;

use App\Step;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Response;
use DB;
use Auth;

use App\Repositories\StepRepository;
use App\Repositories\TaskRepository;

class StepController extends Controller
{
    public function __construct(StepRepository $steps, TaskRepository $tasks, Request $request)
    {
        $this->middleware('jwt.auth');
        $this->steps = $steps;
        $this->tasks = $tasks;
    }
    public function index()
    {

        $stepsWithTasks = [];
        $steps = DB::table('steps')
            ->leftJoin('tasks', 'steps.id', '=', 'tasks.step_id')
            ->get();
//dd($steps);
        foreach($steps as $key => $step){
            $stepsWithTasks[$step->name]['step_id'] = $step->step_id;
            $stepsWithTasks[$step->name]['name'] = $step->name;
            $stepsWithTasks[$step->name]['tasks'][] = $step->task;
        }

        return $stepsWithTasks;


    }
}
