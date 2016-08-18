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
function EventComponentCtrl(DTOptionsBuilder, DTColumnBuilder, $q, $timeout) {

    var vm = this;


    /////////////////


    var vm = this;


    //events data-table conf object
    vm.eventsDT = {
        options: DTOptionsBuilder.fromFnPromise(function () {
            var defer = $q.defer();

            var events = [{
                id: 1,
                date: moment().format("LLL"),
                type: "aloo1",
                numOfGuests: 4,
                status: 'active'
            }, {
                id: 1,
                date: moment().subtract(4, 'days').format("LLL"),
                type: "aloo2",
                numOfGuests: 2,
                status: 'finished'
            }, {
                id: 1,
                date: moment().subtract(14, 'days').add(3, 'hours').format("LLL"),
                type: "aloo3",
                numOfGuests: 7,
                status: 'finished'
            }];

            $timeout(function() {
                defer.resolve(events);

            }, 1000);


            return defer.promise;
        }).withPaginationType('full_numbers')
            .withOption('order', [0, 'asc'])
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
            DTColumnBuilder.newColumn('date').withTitle('Date'),
            DTColumnBuilder.newColumn('type').withTitle('Type'),
            DTColumnBuilder.newColumn('numOfGuests').withTitle('# of Guests'),
            DTColumnBuilder.newColumn('status').withTitle('Status')
        ]

    };

}

/**
 * initialize controller
 */
EventComponentCtrl.prototype.$onInit = function () {

};

/**
 * destroy controller
 */
EventComponentCtrl.prototype.$onDestroy = function () {

};

//inject the following dependencies
EventComponentCtrl.$inject = ['DTOptionsBuilder', 'DTColumnBuilder', '$q', '$timeout'];
