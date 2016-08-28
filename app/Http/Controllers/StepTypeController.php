<?php

namespace App\Http\Controllers;

use App\StepType;

class StepTypeController extends Controller
{

    public function __construct()
    {
        //$this->middleware('jwt.auth');
    }

    // get all event types
    public function getAllTypes()
    {
        $types = new StepType();

        $steps = $types::find(1)->steps;

        return json_encode($steps);
    }
}