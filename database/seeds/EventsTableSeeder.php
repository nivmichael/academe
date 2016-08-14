<?php

use App\Events;
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
        $event = new Events();
        $event->event_date = Carbon::today();
        $event->event_type = 'good';
        $event->event_subject = 'new event';
        $event->event_text = 'some text for event';
        $event->event_comment = 'comment for event';
        $event->active = true;
        $event->save();

        $event2 = new Events();
        $event2->event_date = Carbon::today();
        $event2->event_type = 'good';
        $event2->event_subject = 'new event';
        $event2->event_text = 'some text for event';
        $event2->event_comment = 'comment for event';
        $event2->active = true;
        $event2->save();

        $event3 = new Events();
        $event3->event_date = Carbon::today();
        $event3->event_type = 'good';
        $event3->event_subject = 'new event';
        $event3->event_text = 'some text for event';
        $event3->event_comment = 'comment for event';
        $event3->active = true;
        $event3->save();

        $event4 = new Events();
        $event4->event_date = Carbon::today();
        $event4->event_type = 'good';
        $event4->event_subject = 'new event';
        $event4->event_text = 'some text for event';
        $event4->event_comment = 'comment for event';
        $event4->active = true;
        $event4->save();
    }
}
