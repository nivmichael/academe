angular.module("acadb.components.events", [
    'datatables',
    'datatables.buttons',
    'datatables.light-columnfilter'
])

    .component('events', {
        templateUrl: 'components/events-component/events.view.html',
        controller: EventComponentCtrl
    });


/**
 * controller constructor
 * @constructor
 */
function EventComponentCtrl($state, $scope, DTOptionsBuilder, DTColumnBuilder, eventsService, $log) {

    var vm = this;

    vm.$state = $state;
    vm.$scope = $scope;
    vm.DTOptionsBuilder = DTOptionsBuilder;
    vm.DTColumnBuilder = DTColumnBuilder;
    vm.eventsService = eventsService;
    vm.$log = $log;


}

/**
 * initialize controller
 */
EventComponentCtrl.prototype.$onInit = function () {

    var vm = this;


    //events data-table conf object
    vm.eventsDT = {
        options: vm.DTOptionsBuilder.fromFnPromise(function () {
            return vm.eventsService.getEvents();
        }).withPaginationType('full_numbers')
            .withOption('order', [0, 'asc'])
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
                    html: 'input',
                    type: 'text'
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
                        value: 'active', label: 'Active'
                    }, {
                        value: 'finished', label: 'Finished'
                    }]
                }
            }),

        columns: [
            vm.DTColumnBuilder.newColumn('date').withTitle('Date'),
            vm.DTColumnBuilder.newColumn('type').withTitle('Type'),
            vm.DTColumnBuilder.newColumn('numOfGuests').withTitle('# of Guests'),
            vm.DTColumnBuilder.newColumn('status').withTitle('Status')
        ]

    };

};

/**
 * destroy controller
 */
EventComponentCtrl.prototype.$onDestroy = function () {

};


EventComponentCtrl.prototype.openEvent = function (event) {

    var vm = this;

    vm.$state.go('admin.event', {});
};


//inject the following dependencies
EventComponentCtrl.$inject = ['$state', '$scope', 'DTOptionsBuilder', 'DTColumnBuilder', 'eventsService', '$log'];
