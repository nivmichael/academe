<?php

namespace App\Http\Controllers;

use App\Event;
use App\File;
use App\Invite;
use App\Repositories\InviteRepository;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Repositories\EventRepository;


class EventController extends Controller
{
    protected $eventRepo;
    protected $inviteRepo;

    public function __construct(EventRepository $eventRepository, InviteRepository $inviteRepository)
    {
        $this->middleware('jwt.auth');
        $this->eventRepo = $eventRepository;
        $this->inviteRepo = $inviteRepository;
    }

    // get all events
    public function getEvents()
    {
        return $this->eventRepo->getEvents();
    }

    // get event by id
    public function getEvent($id)
    {
        return $this->eventRepo->getEvent($id);
    }


    // create event or update
    public function postEvent(Request $eventJson, $id = null)
    {

        $this->validate($eventJson, [
            'event_subject' => 'required',
        ]);

        // create or update event
        $event = $this->eventRepo->mapFromJsonEvent($eventJson);

        $invitesArr = $eventJson->toArray()['invites'];

        // filter request invites and get only new invites
        $newInvites = array_where($invitesArr, function ($key, $value) {
            return array_has($value, 'newInvite');
        });

        // remove key from newInvites array and set timestamp for created_at and updated_at
        foreach ($newInvites as $i => $v) {
            $newInvites[$i]['created_at'] = Carbon::today();
            $newInvites[$i]['updated_at'] = Carbon::today();
            $newInvites[$i] = array_except($newInvites[$i], ['newInvite']);
        }

        // insert new invites
        $this->inviteRepo->createInvite($newInvites);

        // filter request invites for update
        $updateInvite = array_where($invitesArr, function ($key, $value) {
            return !array_has($value, 'newInvite');
        });

        // update invites
        $this->inviteRepo->updateInvite($updateInvite);

        // get invites to delete
        $deleteInvites = $this->deleteInvitesNotIn($this->inviteRepo->getInvitesByEvent($event->id), collect($invitesArr));

        if (count($deleteInvites) > 0) {
            // delete invites
            $this->inviteRepo->deleteInvite($deleteInvites, collect($invitesArr)->toArray());
        }

        // emails for new invites
        if (count($newInvites) > 0) {
            // TODO
        }

        // emails for update invite
        if (count($updateInvite) > 0) {
            // TODO
        }

        // emails for deleted invites
        if (count($deleteInvites) > 0) {
            // TODO
        }

        return $this->eventRepo->getEvent($event->id);
    }

    // get invites for delete
    public function deleteInvitesNotIn($oldInvites, $requestInvites)
    {

        if ($oldInvites->count() > 0 || $requestInvites->count() > 0) {
            $toDelete = $oldInvites->filter(function ($oldInvite) use ($requestInvites) {

                return $requestInvites->filter(function ($newInvite) use ($oldInvite) {

                    return $newInvite['user_id'] == $oldInvite->user_id;
                })->count() <= 0;

            });

            return $toDelete;
        }
    }

    // delete event
    public function deleteEvent(Request $request)
    {
        $events = new Event();
        $event = $events::where('id', $request->eventId);

        if ($event->count() > 0) {
            $event->delete();
        }
    }
}


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