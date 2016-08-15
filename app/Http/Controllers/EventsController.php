<?php

namespace App\Http\Controllers;

use App\Events;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\EventDispatcher\Event;

class EventsController extends Controller
{
    // get all event or event by id if id exist
    public function getEvents($id = null)
    {
        $events = new Events();

        if (!$id) {  // if id is null return all events

            return $events::all()->toJson();

        } else { // if id is not null, check if event by id exist or not and return event or error


            $event = $events::where('id', $id)->first();

            if ($event) {
                return $event->toJson();
            } else {
                return 'error';
            }
        }
    }

    // create event
    public function createEvent(Request $request)
    {
        $event = new Events();
        $event->event_date = Carbon::today();
        $event->event_type = $request['type'];
        $event->event_subject = $request['subject'];
        $event->event_text = $request['text'];
        $event->event_comment = $request['comment'];
        $event->active = $request['isActive'];
        $event->save();
    }

    // add user to event
    public function addUsersToEvent(Request $request)
    {
        $list = array(
            'eventId' => 1,
            'users' => array(
                ['id' => 1, 'status' => 'On Hold', 'comments' => 'comment text'],
                ['id' => 2, 'status' => 'On Hold', 'comments' => 'comment text'],
                ['id' => 3, 'status' => 'On Hold', 'comments' => 'comment text'],
                ['id' => 4, 'status' => 'On Hold', 'comments' => 'comment text'],
                ['id' => 5, 'status' => 'On Hold', 'comments' => 'comment text'],
            )
        );

        $events = new Events();

        $event = $events::find(1)->users();
    }
}