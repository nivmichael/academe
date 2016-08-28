<?php

namespace App\Http\Controllers;

use App\UserStatusType;

class UserStatusTypeController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    public function getStatusType()
    {
        $status = new UserStatusType();
        return $status->all()->toJson();
    }
}