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

        // create or update event
        $event = Event::mapFromJsonEvent($eventJson);
        $event->save();

        // files
        if ($eventJson->hasFile('file')) {

            $path = storage_path() . '/app/events/'; // upload path

            foreach ($eventJson->file('file') as $file) {

                $filename = File::generateFileName($file);

                $file->move($path, $filename);

                $newFile = new File();
                $newFile->path = '/app/events/';
                $newFile->filename = $filename;
                $newFile->choises = 'event-attachment';
                $newFile->save();

                $event->files()->attach($newFile->id,
                    ['event_id' => $newFile->id, 'event_id' => $event->id]);
            }
        }

        $oldInvites = $event->invites; // invites from db
        $newInvites = collect($eventJson->invites); // invites from request

        // invite list for delete
        $deleteInvites = $event->deleteInvites($oldInvites, $newInvites);

        // delete invites
        foreach ($deleteInvites as $invite) {
            $invites = new Invite();
            $invites::where('user_id', $invite->user_id)->delete();
        }

        // if Invite (param newInvite = true) create new invite else update invite
        foreach ($newInvites->toArray() as $invite) {

            $pivotId = $event->users()->where('user_id', $invite['user_id'])->first();

            if (array_key_exists('newInvite', $invite)) {

                if ($event->users()->where('user_id', $invite['user_id'])->count() < 1) {

                    $event->users()->attach($event->id,
                        ['event_id' => $event->id, 'user_id' => $invite['user_id'], 'user_status' => $invite['user_status'], 'comments' => $invite['comments']]);
                }

            } else {

                if ($event->users()->where('user_id', $invite['user_id'])->count() > 0) {

                    $event->users()->updateExistingPivot($pivotId->pivot->user_id,
                        ['event_id' => $event->id, 'user_id' => $invite['user_id'], 'user_status' => $invite['user_status'], 'comments' => $invite['comments']]);
                }
            }
        }

        // emails
        foreach ($deleteInvites as $invite) {

            // TODO emails for delete invites
        }

        foreach ($newInvites as $invite) {
            if (array_key_exists('newInvite', $invite)) {
                // TODO email for new invites
            } else {
                // TODO emails for update invites
            }
        }
    }

    public function deleteEvent()
    {

    }
}