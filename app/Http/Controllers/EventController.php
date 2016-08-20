<?php

namespace App\Http\Controllers;

use App\Event;
use App\File;
use App\Invite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class EventController extends Controller
{
    // get all event or event by id if id exist
    public function getEvents($id = null)
    {
        $event = new Event();

        if (!$id) {  // if id is null return all events

            $event::all();

        } else { // if id is not null, check if event by id exist or not and return event or error

            $thisEvent = $event::find($id);

            if ($event) {

            } else {

                return 'error';

            }
        }
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

            $pivotId = $event->users()->where('user_id', $invite['userId'])->first();

            if ($invite['newInvite']) {
                $event->users()->attach($event->id,
                    ['event_id' => $event->id, 'user_id' => $invite['userId'], 'user_status' => $invite['status'], 'comments' => $invite['comments']]);
            } else {

                if ($event->users->where('user_id', $invite['userId'])->count() > 0) {

                    $event->users()->updateExistingPivot($pivotId->pivot->user_id,
                        ['event_id' => $event->id, 'user_id' => $invite['userId'], 'user_status' => $invite['status'], 'comments' => $invite['comments']]);
                }
            }
        }

        // emails
        foreach ($deleteInvites as $invite) {

            // TODO emails for delete invites
        }

        foreach ($newInvites as $invite) {
            if ($invite['newInvite']) {
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