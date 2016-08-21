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

        for($i = 0; $i < count($eventArr['invites']); $i++) {
            $statuType = new UserStatusType();
            $eventArr['invites'][$i]['statusName'] = $statuType::find($eventArr['invites'][$i]['user_status'])->toArray()['user_status_type'];
        }


        echo json_encode($eventArr);
    }

    // create new event or update
    public function createUpdateEvent($eventJson)
    {
        // create or update event
        $event = $this->mapFromJsonEvent($eventJson);
        $event->save();

       /* // files
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
        }*/

        //$toEmail = [];

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

            // check if newInvite property exist
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
    }

    public function mapFromJsonEvent($jsonEvent, $event = null)
    {
        if ($event === null) {

            $event = new Event();

            if ($jsonEvent->id !== null && $jsonEvent->id > 0) {
                $event = $event::find($jsonEvent->id);
            }
        }

        if ($jsonEvent->date !== null)
            $event->event_date = $jsonEvent->event_date;

        if ($jsonEvent->type !== null)
            $event->event_type = $jsonEvent->evet_type;

        if ($jsonEvent->subject !== null)
            $event->event_subject = $jsonEvent->event_subject;

        if ($jsonEvent->text !== null)
            $event->event_text = $jsonEvent->event_text;

        if ($jsonEvent->comment !== null)
            $event->event_comment = $jsonEvent->event_comment;

        if ($jsonEvent->active !== null)
            $event->active = $jsonEvent->active;

        return $event;
    }
}