<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    protected $table = 'ac_event';

    public function users()
    {
        return $this->belongsToMany('App\User', 'ac_event_invites', 'event_id', 'user_id')
            ->withPivot('user_id');
    }
}
