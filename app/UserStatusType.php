<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserStatusType extends Model
{
    public $timestamps = false;
    protected $table = 'ac_event_user_status_list';

    public function invitesStatus()
    {
        return $this->hasMany('App\Invite', 'user_status');
    }
    
}
