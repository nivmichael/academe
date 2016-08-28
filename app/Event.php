<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'ac_event';

    public function users()
    {
        return $this->belongsToMany('App\User', 'ac_event_invites', 'event_id', 'user_id')
            ->withTimestamps()
            ->withPivot('user_id');
    }

    public function files()
    {
        return $this->belongsToMany('App\File', 'ac_event_file', 'event_id',  'file_id');
    }

    public function Invites()
    {
        return $this->hasMany('App\Invite', 'event_id');
    }

}
