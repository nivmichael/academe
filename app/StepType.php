<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StepType extends Model
{
    public $timestamps = false;
    protected $table = 'step_type';

    public function steps()
    {
        return $this->hasMany('App\Step', 'type_id');
    }
}
