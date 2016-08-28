/**
 * Created by Konstantin on 8/13/2016.
 */
angular.module("acadb.components.events")

    .service('eventsService', EventsService);


function EventsService($timeout, $q, EventData, $http) {

    var self = this;

    self.$timeout = $timeout;
    self.$q = $q;
    self.EventData = EventData;
    self.$http = $http;
}


/**
 * get all events
 */
EventsService.prototype.getEvents = function () {
    return this.EventData.list().$promise;
};


/**
 * get event by id
 * @param id the desired event id
 */
EventsService.prototype.getEvent = function (id) {
    return this.EventData.get({id: id}).$promise;
};


/**
 * get all possible event types
 * @returns {Promise}
 */
EventsService.prototype.getEventTypes = function () {
    return this.$http.get('/api/eventTypes');
};


/**
 * get all possible invite statuses
 * @returns {Promise}
 */
EventsService.prototype.getInviteStatuses = function () {
    return this.$http.get('/api/inviteStatusTypes');
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
    return this.EventData.delete({id: eventId}).$promise;
};


/**
 * save given event
 * @param event
 * @returns {*}
 */
EventsService.prototype.saveEvent = function (event) {
    return this.EventData.save(event).$promise;
};


EventsService.$inject = ['$timeout', '$q', 'EventData', '$http'];