<?php

namespace App\Http\Controllers;

use App\Events;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
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

    // create event or update
    public function postEvent(Request $request)
    {
        if ($request['status'] == 'insert') { // if status is insert (create new event)

            // file

           /* if($request->hasFile('file')) {
                $path = storage_path() . '/app/events/';
                $fileName = $request->file('file')->get;
                //$request->file('file')->move($path, $fileName);
                var_dump($fileName);
            }
            return 0;*/

            $newEvent = new Events();
            $newEvent->event_date = $request['eventDate'];
            $newEvent->event_type = $request['eventType'];
            $newEvent->event_subject = $request['eventSubject'];
            $newEvent->event_text = $request['eventText'];
            $newEvent->event_comment = $request['eventComment'];
            $newEvent->active = $request['eventActive'];
            $newEvent->save();

            // test users

            $users = array(
                array('id' => '1', 'userStatus' => '1', 'comments' => 'comment of user'),
                array('id' => '2', 'userStatus' => '1', 'comments' => 'comment of user'),
                array('id' => '3', 'userStatus' => '1', 'comments' => 'comment of user'),
                array('id' => '4', 'userStatus' => '1', 'comments' => 'comment of user'),
                array('id' => '5', 'userStatus' => '1', 'comments' => 'comment of user')
            );

            // if users exist in new event add new invite
            if(count($users) > 0) {
                foreach ($users as $user) {
                    $newEvent->users()->attach($newEvent->id,
                        ['event_id' => $newEvent->id, 'user_id' => $user['id'], 'user_status' => $user['userStatus'], 'comments' => $user['comments']]);
                }
            }


        } else { // if status is update (update event)

        }
    }
}