<?php

namespace App\Http\Controllers;

use App\Event;
use App\File;
use App\Invite;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Repositories\EventRepository;


class EventController extends Controller
{
    protected $events;

    public function __construct(EventRepository $events)
    {
        $this->middleware('jwt.auth');
        $this->events = $events;
    }

    // get all event or event by id if id exist
    public function getEvents()
    {
        $this->events->getEvents();
    }

    public function getEvent($id)
    {
        $this->events->getEvent($id);
    }


    // create event or update
    public function postEvent(Request $eventJson)
    {

        $this->events->createUpdateEvent($eventJson);

        /*// emails
        foreach ($deleteInvites as $invite) {

            // TODO emails for delete invites
        }

        foreach ($newInvites as $invite) {
            if (array_key_exists('newInvite', $invite)) {
                // TODO email for new invites
            } else {
                // TODO emails for update invites
            }
        }*/
    }

    public function deleteEvent(Request $request)
    {
        $events = new Event();
        $event = $events::where('id', $request->eventId);

        if($event->count() > 0) {
            $event->delete();
        }
    }
}