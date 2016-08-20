<?php

namespace App\Repositories;

use App\Event;
use App\User;

class EventRepository
{
    // get all events
    public function getEvents()
    {
        $events = new Event();

        $eventsArr = $events->all()->toArray();

        for ($i = 0; $i < count($eventsArr); $i++) {

            $thisEvent = $events->find($eventsArr[$i]['id']);

            $eventsArr[$i]['numOfInvitees'] = $thisEvent->users()->count();
        }

        return collect($eventsArr)->toJson();

    }

    // get event by id
    public function getEvent($id)
    {

        $events = new Event();
        $event = $events::find($id);
        $event->numOfInvitees = $event->invites()->count();
        $event->invites->toArray();
        $event->files->toArray();

        $eventArr = $event->toArray();

        for ($i = 0; $i < count($eventArr['invites']); $i++) {

            $user = new User();
            $thisUser = $user::find($eventArr['invites'][$i]['user_id']);
            $eventArr['invites'][$i]['user'] = $thisUser->toArray();

        }

        return collect($eventArr)->toJson();
    }
}