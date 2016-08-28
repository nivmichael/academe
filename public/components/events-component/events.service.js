/**
 * Created by Konstantin on 8/13/2016.
 */
angular.module("acadb.components.events")

    .service('eventsService', EventsService);


function EventsService($timeout, $q) {

    var self = this;

    self.$timeout = $timeout;
    self.$q = $q;
}


/**
 * get all events
 */
EventsService.prototype.getEvents = function () {

    var self = this;

    return self.$q(function (resolve, reject) {

        self.$timeout(function () {
            resolve(EventsService.mockEvents);
        }, 1000);
    });
};


/**
 * get event by id
 * @param id the desired event id
 */
EventsService.prototype.getEvent = function (id) {

    var self = this;

    return self.$q(function (resolve, reject) {

        self.$timeout(function () {

            var event = _.first(EventsService.mockEvents.filter(function (event) {
                return event.id == id;
            }));

            if (event) {
                resolve(angular.copy(event));
            } else {
                reject("Event could not be found");
            }

        }, 1000);

    });
};


/**
 * get all possible event types
 * @returns {Promise}
 */
EventsService.prototype.getEventTypes = function () {

    var self = this;

    return self.$q(function (resolve, reject) {

        self.$timeout(function () {
            resolve(angular.copy(EventsService.mockEventTypes));

        }, 1000);

    });
};


/**
 * get all possible invite statuses
 * @returns {Promise}
 */
EventsService.prototype.getInviteStatuses = function () {

    var self = this;

    return self.$q(function (resolve, reject) {

        self.$timeout(function () {
            resolve(angular.copy(EventsService.mockInviteStatuses));
        }, 1000);

    });
};


/**
 * create an empty event object with all the required initial data
 * @returns {{files: Array, invites: Array}}
 */
EventsService.prototype.createEmptyEvent = function () {

    return {
        files: [],
        invites: []
    };

};

/**
 * delete event by the given event it
 */
EventsService.prototype.deleteEvent = function (eventId) {

    var self = this;

    return self.$q(function (resolve, reject) {

        self.$timeout(function () {
            //look for the desired event
            var event = _.first(EventsService.mockEvents.filter(function (event) {
                return event.id == eventId;
            }));

            //check if it was found
            if (event) {

                //remove from the mock events list
                EventsService.mockEvents.splice(EventsService.mockEvents.indexOf(event), 1);

                resolve();

            } else {
                reject("event couldn't be found");
            }
        }, 1000);

    });

};


/**
 * save given event
 * @param event
 * @returns {*}
 */
EventsService.prototype.saveEvent = function (event) {

    var self = this;

    //check if event parameter was given
    if (event) {

        return self.$q(function (resolve, reject) {

            self.$timeout(function() {

                //look for the desired event
                var existingEvent = event.id ? _.first(EventsService.mockEvents.filter(function (_event) {
                    return _event.id == event.id;
                })) : undefined;

                //check if it was found
                if (existingEvent) {

                    //remove from the mock events list
                    EventsService.mockEvents[EventsService.mockEvents.indexOf(existingEvent)] = event;

                } else {

                    //set event's id
                    event.id = EventsService.mockEvents[EventsService.mockEvents.length - 1].id + 1;

                    //add the event to the mock events list
                    EventsService.mockEvents.push(event);
                }

                resolve(event);

            }, 1000);

        });

    } else {
        throw Error("cannot save event as not event was passed as a parameter");
    }

};


EventsService.mockEvents = [{
    "id": 1,
    "created_at": "2016-08-20 12:00:51",
    "updated_at": "2016-08-20 17:29:24",
    "event_date": "2016-08-28 12:00:51",
    "event_type_id": 1,
    "event_subject": "event subject",
    "event_text": "event text",
    "event_comment": "event comment",
    "active": 1,
    "numOfInvitees": 4,
    "invites": [{
        "created_at": "2016-08-20 17:12:57",
        "updated_at": "2016-08-20 17:12:57",
        "event_id": 1,
        "user_id": 21,
        "user_status_id": 1,
        "comments": "comments",
        "user": {
            "id": 21,
            "role": "admin",
            "type": "user",
            "subtype": "employer",
            "status": "active",
            "email": "dorshoham88@gmail.com",
            "password_new": null,
            "first_name": "Dor",
            "last_name": "Shoham",
            "gender": "",
            "martial_status": "",
            "education_status": null,
            "street_1": "hahashmonaim 84",
            "city": "",
            "state": "Georgia",
            "zipcode": "48489995",
            "country": "",
            "phone_1": "",
            "mobile": "",
            "date_of_birth": "0000-00-00",
            "registration": null,
            "last_login": "2016-06-09 13:58:29",
            "send_newsletters": 0,
            "send_notifications": 0,
            "created_at": "2016-05-08 13:08:45",
            "updated_at": "2016-06-09 13:58:29"
        }
    }, {
        "created_at": "2016-08-20 17:12:57",
        "updated_at": "2016-08-20 17:12:57",
        "event_id": 1,
        "user_id": 25,
        "user_status_id": 1,
        "comments": "comments",
        "user": {
            "id": 25,
            "role": "admin",
            "type": "user",
            "subtype": "jobseeker",
            "status": "inactive",
            "email": "dor@acade-me.co.il",
            "password_new": null,
            "first_name": "Dor",
            "last_name": "Shoham",
            "gender": "male",
            "martial_status": "single",
            "education_status": "student",
            "street_1": "",
            "city": "atlanta",
            "state": "Georgia",
            "zipcode": "",
            "country": "USA",
            "phone_1": "",
            "mobile": "0542037641",
            "date_of_birth": "0000-00-00",
            "registration": null,
            "last_login": "2016-06-19 07:33:53",
            "send_newsletters": 0,
            "send_notifications": 0,
            "created_at": "2016-05-09 12:20:01",
            "updated_at": "2016-06-20 10:51:44"
        }
    }, {
        "created_at": "2016-08-20 14:11:39",
        "updated_at": "2016-08-20 17:29:24",
        "event_id": 1,
        "user_id": 108,
        "user_status_id": 1,
        "comments": "comments fddfds dfd",
        "user": {
            "id": 108,
            "role": "admin",
            "type": "user",
            "subtype": "jobseeker",
            "status": "active",
            "email": "dorshoham808@gmail.com",
            "password_new": null,
            "first_name": "Dor",
            "last_name": "Shoham",
            "gender": "male",
            "martial_status": "single",
            "education_status": "student",
            "street_1": "Hahashmonaim 84 tel-aviv last floor",
            "city": "Tel-aviv",
            "state": "Please select region, sta",
            "zipcode": "4725212",
            "country": "\u05d9\u05e9\u05e8",
            "phone_1": null,
            "mobile": "542037641",
            "date_of_birth": "2016-06-13",
            "registration": "0000-00-00 00:00:00",
            "last_login": "2016-06-19 08:07:48",
            "send_newsletters": 0,
            "send_notifications": 0,
            "created_at": "2016-06-19 08:05:47",
            "updated_at": "2016-06-19 08:07:48"
        }
    }, {
        "created_at": "2016-08-20 14:11:40",
        "updated_at": "2016-08-20 14:11:40",
        "event_id": 1,
        "user_id": 109,
        "user_status_id": 1,
        "comments": "comments",
        "user": {
            "id": 109,
            "role": "admin",
            "type": "tech-admin",
            "subtype": "employer",
            "status": "inactive",
            "email": "sergei@gotime.it",
            "password_new": null,
            "first_name": "Sergei",
            "last_name": "Safrigin",
            "gender": "male",
            "martial_status": "maried",
            "education_status": "student",
            "street_1": "Rothschild 15, Tel-Aviv",
            "city": "Tel-Aviv",
            "state": "Israel",
            "zipcode": null,
            "country": "Israel",
            "phone_1": null,
            "mobile": "0525978957",
            "date_of_birth": "1992-07-25",
            "registration": null,
            "last_login": null,
            "send_newsletters": 1,
            "send_notifications": 1,
            "created_at": "2016-06-19 08:05:47",
            "updated_at": "2016-08-14 00:12:46"
        }
    }],
    "files": [{
        "id": 6,
        "created_at": "2016-08-20 12:12:14",
        "updated_at": "2016-08-20 12:12:14",
        "path": "\/app\/events\/",
        "filename": "doc1.xlsx",
        "choises": "event-attachment",
        "pivot": {"event_id": 1, "file_id": 6}
    }, {
        "id": 7,
        "created_at": "2016-08-20 12:12:14",
        "updated_at": "2016-08-20 12:12:14",
        "path": "\/app\/events\/",
        "filename": "doc2.docx",
        "choises": "event-attachment",
        "pivot": {"event_id": 1, "file_id": 7}
    }, {
        "id": 8,
        "created_at": "2016-08-20 12:12:14",
        "updated_at": "2016-08-20 12:12:14",
        "path": "\/app\/events\/",
        "filename": "myImage.png",
        "choises": "event-attachment",
        "pivot": {"event_id": 1, "file_id": 8}
    }]
}];


EventsService.mockEventTypes = [{
    id: 1,
    name: "Happenong"
}, {
    id: 2,
    name: "Lecture"
}, {
    id: 3,
    name: "Ceremony"
}];


EventsService.mockInviteStatuses = [{
    id: 1,
    name: "On Hold"
}, {
    id: 2,
    name: "Confirmed"
}, {
    id: 3,
    name: "Not Attending"
}, {
    id: 4,
    name: "Participated"
}, {
    id: 5,
    name: "Canceled"
}];


EventsService.$inject = ['$timeout', '$q'];