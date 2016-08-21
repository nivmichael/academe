<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TypeStep extends Model
{
    public $timestamps = false;
    protected $table = 'type_steps';

    public function steps()
    {
        return $this->hasMany('App\Step', 'type_id');
    }
}
