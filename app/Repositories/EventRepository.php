<?php

namespace App\Repositories;

use App\Event;
use App\Invite;
use App\User;
use App\UserStatusType;

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

        // insert user to invite
        for ($i = 0; $i < count($eventArr['invites']); $i++) {

            $user = new User();
            $thisUser = $user::find($eventArr['invites'][$i]['user_id']);
            $eventArr['invites'][$i]['user'] = $thisUser->toArray();

        }

        echo json_encode($eventArr);
    }


    // create or update event
    public function mapFromJsonEvent($jsonEvent, $event = null)
    {
        if ($event === null) {

            $event = new Event();

            if (isset($jsonEvent->id) && $jsonEvent->id > 0) {
                $event = $event::find($jsonEvent->id);
            }
        }

        if (isset($jsonEvent->event_date))
            $event->event_date = $jsonEvent->event_date;

        if (isset($jsonEvent->event_type))
            $event->event_type = $jsonEvent->event_type;

        if (isset($jsonEvent->event_subject))
            $event->event_subject = $jsonEvent->event_subject;

        if (isset($jsonEvent->event_text))
            $event->event_text = $jsonEvent->event_text;

        if (isset($jsonEvent->event_comment))
            $event->event_comment = $jsonEvent->event_comment;

        if (isset($jsonEvent->active))
            $event->active = $jsonEvent->active;

        $event->save();

        return $event;
    }

    public function getEventFiles($id)
    {
        $event = new Event();
        $event = $event::find($id);

        return $event->files->toArray();
    }
}