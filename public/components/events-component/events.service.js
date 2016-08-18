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
 * get events
 */
EventsService.prototype.getEvents = function() {

    var self = this;

    var defer = self.$q.defer();

    self.$timeout(function() {
        defer.resolve(EventsService.mockEvents);

    }, 1000);

    return defer.promise;
};


/**
 * get event by id
 * @param id the desired event id
 */
EventsService.prototype.getEvent = function(id) {

    var self = this;

    var defer = self.$q.defer();

    self.$timeout(function() {
        defer.resolve(EventsService.mockEvents.filter(function(event){
            return event.id == id;
        })[0]);

    }, 1000);

    return defer.promise;
};



EventsService.mockEvents = [{
    id: 1,
    date: moment().format("LLL"),
    type: "aloo1",
    numOfGuests: 4,
    status: 'active'
}, {
    id: 2,
    date: moment().subtract(4, 'days').format("LLL"),
    type: "aloo2",
    numOfGuests: 2,
    status: 'finished'
}, {
    id: 3,
    date: moment().subtract(14, 'days').add(3, 'hours').format("LLL"),
    type: "aloo3",
    numOfGuests: 7,
    status: 'finished'
}];


EventsService.$inject = ['$timeout', '$q'];