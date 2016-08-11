<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Repositories\StepRepository;
use App\Repositories\TaskRepository;

class TaskController extends Controller
{
    protected $tasks;

    public function __construct(TaskRepository $tasks)
    {
        $this->middleware('jwt.auth');

        $this->tasks = $tasks;
    }
//    public function index(Request $request)
//    {
//
//        return  $this->tasks->forStep();
//
//
//
//
//
//    }

}
