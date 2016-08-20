<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'ac_event';

    public function users()
    {
        return $this->belongsToMany('App\User', 'ac_event_invites', 'event_id', 'user_id')
            ->withTimestamps()
            ->withPivot('user_id');
    }

    public function files()
    {
        return $this->belongsToMany('App\File', 'ac_event_file', 'event_id', 'file_id');
    }

    public function Invites()
    {
        return $this->hasMany('App\Invite', 'event_id');
    }

    public function deleteInvites($oldInvites, $newInvites)
    {
        return Event::deleteInvitesNotIn($this, $oldInvites, $newInvites);
    }

    public static function mapFromJsonEvent($jsonEvent, $event = null)
    {
        if ($event === null) {

            $event = new Event();

            if ($jsonEvent->id !== null && $jsonEvent->id > 0) {
                $event = $event::find($jsonEvent->id);
            }
        }

        if ($jsonEvent->date !== null)
            $event->event_date = $jsonEvent->date;

        if ($jsonEvent->type !== null)
            $event->event_type = $jsonEvent->type;

        if ($jsonEvent->subject !== null)
            $event->event_subject = $jsonEvent->subject;

        if ($jsonEvent->text !== null)
            $event->event_text = $jsonEvent->text;

        if ($jsonEvent->comment !== null)
            $event->event_comment = $jsonEvent->comment;

        if ($jsonEvent->active !== null)
            $event->active = $jsonEvent->active;

        return $event;
    }


    public static function deleteInvitesNotIn($event, $oldInvites, $newInvites)
    {

        $toDelete = $oldInvites->filter(function ($oldInvite) use ($newInvites) {

            return $newInvites->filter(function ($newInvite) use ($oldInvite) {
                return $newInvite['userId'] == $oldInvite->user_id;
            })->count() <= 0;

        });

        return $toDelete;
    }

}
