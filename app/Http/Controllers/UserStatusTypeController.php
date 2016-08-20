<?php

namespace App\Http\Controllers;

use App\UserStatusType;

class UserStatusTypeController extends Controller
{
    public function getStatusType()
    {
        $status = new UserStatusType();
        return $status->all()->toJson();
    }
}