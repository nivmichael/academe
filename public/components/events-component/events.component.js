angular.module("acadb.components.events", [
    'datatables',
    'datatables.buttons',
    'datatables.light-columnfilter'
])

    .component('events', {
        templateUrl: 'components/events-component/events.view.html',
        controller: EventsComponentCtrl
    });



/**
 * controller constructor
 * @param $state
 * @param $scope
 * @param DTOptionsBuilder
 * @param DTColumnBuilder
 * @param eventsService
 * @param $log
 * @param $q
 * @constructor
 */
function EventsComponentCtrl($state, $scope, DTOptionsBuilder, DTColumnBuilder, eventsService,
                             $log, $q) {

    var vm = this;

    vm.$state = $state;
    vm.$scope = $scope;
    vm.DTOptionsBuilder = DTOptionsBuilder;
    vm.DTColumnBuilder = DTColumnBuilder;
    vm.eventsService = eventsService;
    vm.$log = $log;
    vm.$q = $q;
}

/**
 * initialize controller
 */
EventsComponentCtrl.prototype.$onInit = function () {

    var vm = this;

    vm.pageIniter = vm.$q.all({
        events: vm.eventsService.getEvents(),
        eventTypes: vm.eventsService.getEventTypes()
    }).then(function (result) {

        vm.$log.debug("successfully received all page's required data", result);

        vm.events = result.events;
        vm.eventTypes = result.eventTypes.data;


        //go over all the events and fix date property and set event type value
        vm.events.forEach(function (event) {

            //fix date property
            event.event_date = moment(event.event_date, "YYYY-MM-DD HH:mm:ss").format('DD-MM-YYYY');

            //set event type value
            event.eventType = _.first(vm.eventTypes.filter(function (eventType) {
                return eventType.id == event.event_type;
            }));

            //set status
            event.status = event.active ? "Active" : "Finished";
        });


        //set event types filter for our events datatable
        vm.eventsDT.eventTypesFilter = vm.eventTypes.map(function (eventType) {

            return {
                value: eventType.name,
                label: eventType.name
            };

        });

        //insert an empty filter value in order to deselect filtering
        vm.eventsDT.eventTypesFilter.splice(0, 0, {
            value: '',
            label: ''
        });

    }, function (reason) {
        vm.$log.error("failed to init page due to", reason);
    });

    //events data-table conf object
    vm.eventsDT = {
        options: vm.$q(function (resolve, reject) {

            vm.pageIniter.then(function () {

                resolve(vm.DTOptionsBuilder.fromFnPromise(vm.$q.when(vm.events))

                    .withPaginationType('full_numbers')
                    .withOption('order', [0, 'desc'])
                    .withOption('displayLength', 50)

                    /**
                     * on click go to event page
                     */
                    .withOption('rowCallback', function (element, event, iDisplayIndex, iDisplayIndexFull) {

                        // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
                        $('td', element).unbind('click');
                        $('td', element).bind('click', function () {

                            vm.$scope.$apply(function () {
                                vm.openEvent(event);
                            });

                        });
                        return element;

                    })
                    .withButtons([
                        'print',
                        'excel'
                    ])
                    .withLightColumnFilter({
                        '0': {
                            html: 'input',
                            type: 'text'
                        },
                        '1': {
                            html: 'select',
                            values: vm.eventsDT.eventTypesFilter
                        },
                        '2': {
                            html: 'input',
                            type: 'number'
                        },
                        '3': {
                            html: 'select',
                            values: [{
                                value: '', label: ''
                            }, {
                                value: 'Active', label: 'Active'
                            }, {
                                value: 'Finished', label: 'Finished'
                            }]
                        }
                    }));

            }, function (reason) {
                reject(reason);
            });

        }),

        columns: [
            vm.DTColumnBuilder.newColumn('event_date').withTitle('Date'),
            vm.DTColumnBuilder.newColumn('eventType.name').withTitle('Type'),
            vm.DTColumnBuilder.newColumn('numOfInvitees').withTitle('# of Guests'),
            vm.DTColumnBuilder.newColumn('status').withTitle('Status')
        ]

    };

};

/**
 * destroy controller
 */
EventsComponentCtrl.prototype.$onDestroy = function () {};


/**
 * open event page on event clicked
 * @param event
 */
EventsComponentCtrl.prototype.openEvent = function (event) {

    var vm = this;

    vm.$state.go('admin.event', {id: event.id, mode: 'read'});
};


//inject the following dependencies
EventsComponentCtrl.$inject = ['$state', '$scope', 'DTOptionsBuilder', 'DTColumnBuilder', 'eventsService',
    '$log', '$q'];
