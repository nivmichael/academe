<?php

namespace App\Http\Controllers;

use App\TypeStep;

class TypeStepController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    // get all event types
    public function getAllTypes()
    {
        $types = new TypeStep();

        $typesArr = $types->get()->toArray();

        for ($i = 0; $i < count($typesArr); $i++) {
            $typesArr[$i]['steps'] = $types::find($typesArr[$i]['id'])->steps->toArray();

        }

        return json_encode($typesArr);
    }
}