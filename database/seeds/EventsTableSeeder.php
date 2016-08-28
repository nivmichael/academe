<?php

use App\Event;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class EventsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $event = new Event();
        $event->event_date = Carbon::today();
        $event->event_type = 1;
        $event->event_subject = 'new event';
        $event->event_text = 'some text for event';
        $event->event_comment = 'comment for event';
        $event->active = true;
        $event->save();

        $event2 = new Event();
        $event2->event_date = Carbon::today();
        $event2->event_type = 3;
        $event2->event_subject = 'new event';
        $event2->event_text = 'some text for event';
        $event2->event_comment = 'comment for event';
        $event2->active = true;
        $event2->save();

        $event3 = new Event();
        $event3->event_date = Carbon::today();
        $event3->event_type = 4;
        $event3->event_subject = 'new event';
        $event3->event_text = 'some text for event';
        $event3->event_comment = 'comment for event';
        $event3->active = true;
        $event3->save();

        $event4 = new Event();
        $event4->event_date = Carbon::today();
        $event4->event_type = 1;
        $event4->event_subject = 'new event';
        $event4->event_text = 'some text for event';
        $event4->event_comment = 'comment for event';
        $event4->active = true;
        $event4->save();
    }
}
