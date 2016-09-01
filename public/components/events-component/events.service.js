/**
 * Created by Konstantin on 8/13/2016.
 */
angular.module("acadb.components.events")

    .service('eventsService', EventsService);


/**
 * service constructor
 * @param $timeout
 * @param $q
 * @param EventData
 * @param $http
 * @param $auth
 * @constructor
 */
function EventsService($timeout, $q, EventData, $http, $auth) {

    var self = this;

    self.$timeout = $timeout;
    self.$q = $q;
    self.EventData = EventData;
    self.$http = $http;
    self.$auth = $auth;
}

//set service injections
EventsService.$inject = ['$timeout', '$q', 'EventData', '$http', '$auth'];


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
        invites: [],
        notifyNew: true,
        notifyUpdated: true,
        notifyDeleted: false
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
 * @param newAttachments
 * @returns {*}
 */
EventsService.prototype.saveEvent = function (event, newAttachments) {

    var self = this;

    var fd = new FormData();

    _.forEach(newAttachments, function (file) {
        fd.append('file[]', file);
    });

    fd.append('data', angular.toJson(event));


    return self.$http.post('/api/events', fd, {
        transformRequest: angular.identity,
        headers: {
            'Content-Type': undefined,
            'Authorization': 'Bearer ' + self.$auth.getToken()
        }
    });
};