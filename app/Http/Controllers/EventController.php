<?php

namespace App\Http\Controllers;

use App\Event;
use App\File;
use App\Invite;
use App\Repositories\InviteRepository;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

    /**
     * return all events
     * type json
     * 
     * @return string
     */
    
    public function getEvents()
    {
        return $this->eventRepo->getEvents()->toJson();
    }

    /**
     * return event by id
     * type json
     * 
     * @param $id
     * @return string
     */
    
    public function getEvent($id)
    {
        return json_encode($this->eventRepo->getEvent($id));
    }



    /**
     * create event or update
     *
     * @param Request $request
     * @param null $id
     */
    public function postEvent(Request $request, $id = null)
    {
        $eventJson = json_decode($request->data);

        // create or update event
        $event = $this->eventRepo->mapFromJsonEvent($eventJson);
        
        $invitesArr = [];

        foreach ($eventJson->invites as $invite) { // insert all event invites in $inviteArr
            $invitesArr[] = collect($invite)->toArray();
        }
        
        // filter request invites for update
        $updateInvite = array_where($invitesArr, function ($key, $value) {
            return !array_has($value, 'newInvite');
        });

        // update invites
        if (count($updateInvite) > 0) {
            $this->inviteRepo->updateInvite($updateInvite);
        }
        
        // get invites to delete
        $deleteInvites = $this->deleteInvitesNotIn($this->inviteRepo->getInvitesByEvent($event->id), collect($invitesArr));

        if (count($deleteInvites) > 0) {
            // delete invites
            $this->inviteRepo->deleteInvite($deleteInvites, collect($invitesArr)->toArray());
        }


        // filter request invites and get only new invites
        $newInvites = array_where($invitesArr, function ($key, $value) {
            return array_has($value, 'newInvite');
        });


        // remove newInvite key and set created_at and updated for new invites
        foreach ($newInvites as $i => $v) {
            $newInvites[$i]['created_at'] = Carbon::today();
            $newInvites[$i]['updated_at'] = Carbon::today();

            $newInvites[$i]['event_id'] = $event['id'];

            $newInvites[$i] = array_except($newInvites[$i], ['newInvite']);
        }

        // insert new invites
        $this->inviteRepo->createInvite($newInvites);


        $filesArr = $eventJson->files;

        // get files to delete
        $filesToDelete = $this->deleteFilesNotIn(collect($this->eventRepo->getEventFiles($event->id)), collect($filesArr));

        foreach ($filesToDelete as $file) {

            $files = new File();
            $files = $files::find($file['id']);

            \Storage::delete('/events/' . $file['filename']);

            $files->delete();
        }

        if ($request->hasFile('file')) {

            $path = storage_path() . '/app/events/'; // upload path

            foreach ($request->file('file') as $file) {

                $filename = File::generateFileName($file);

                $file->move($path, $filename);

                $newFile = new File();
                $newFile->path = '/app/events/';
                $newFile->filename = $filename;
                $newFile->originalName = $file->getClientOriginalName();
                $newFile->choises = 'event-attachment';
                $newFile->save();

                $event->files()->attach($newFile->id,
                    ['event_id' => $newFile->id, 'event_id' => $event->id]);
            }
        }


        if($newInviteEmail) {

            // email for new invites
            if (count($newInvites) > 0) {
                // TODO
            }
        }

        if($updateInviteEmail) {

            // email for update invite
            if (count($updateInvite) > 0) {
                // TODO
            }
        }

        if($deleteInviteEmail) {

            // email for deleted invites
            if (count($deleteInvites) > 0) {
                // TODO
            }
        }

        return $this->eventRepo->getEvent($event->id);
    }


    /**
     * get invites for delete
     *
     * @param $oldInvites
     * @param $requestInvites
     * @return mixed
     */
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

    /**
     * filtring old files and new files and get files to delete
     *
     * @param $oldFiles
     * @param $requestFiles
     * @return array
     */
    public function deleteFilesNotIn($oldFiles, $requestFiles)
    {

        if ($oldFiles->count() > 0 || $requestFiles->count() > 0) {

            $toDelete = $oldFiles->filter(function ($oldFiles) use ($requestFiles) {

                return $requestFiles->filter(function ($newFiles) use ($oldFiles) {

                    return $newFiles->id == $oldFiles['id'];
                })->count() <= 0;

            });

            return $toDelete;
        }

        return [];
    }

    // delete event

    /**
     *
     *
     * @param $id
     */
    public function deleteEvent($id)
    {
        $events = new Event();
        $event = $events::where('id', $id);

        if ($event->count() > 0) {
            $event->delete();
        }
    }
}
