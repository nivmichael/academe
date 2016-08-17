<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    protected $table = 'ac_event';

    public function users()
    {
        return $this->belongsToMany('App\User', 'ac_event_invites', 'user_id', 'event_id')
            ->withPivot('event_id');
    }
}
