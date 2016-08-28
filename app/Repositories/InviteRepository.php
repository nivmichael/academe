<?php

namespace App\Repositories;

use App\Invite;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class InviteRepository
{
    // insert multiple invites
    public function createInvite($invitesArr)
    {
        Invite::insert($invitesArr);
    }

    // update multiple invites
    public function updateInvite($invitesArr)
    {
        $invites = new Invite();
        $today = Carbon::today();

        foreach ($invitesArr as $invite) {
            $invites->where('event_id', $invite['event_id'])->where('user_id', $invite['user_id'])->update([
                'created_at' => $today,
                'updated_at' => $today,
                'user_status' => $invite['user_status'],
                'comments' => $invite['comments']
            ]);
        }
    }

    // delete multiple invites
    public function deleteInvite($invitesArr)
    {
        $ids_to_delete = array_map(function ($item) {
            return $item['user_id'];
        }, $invitesArr);

        DB::table('ac_event_invites')->whereIn('user_id', $ids_to_delete)->delete();
    }
    
    // get al invites by event id
    public function getInvitesByEvent($eventId)
    {
        $invites = new Invite();

        return $invites->all()->where('event_id', $eventId);
    }

}