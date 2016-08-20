angular.module("acadb.components.event", [
    'datatables',
    'datatables.buttons',
    'datatables.light-columnfilter',
    'ui.tinymce'
])

    .component('event', {
        templateUrl: 'components/event-component/event.view.html',
        controller: EventComponentCtrl
    });


/**
 *
 * @param $state
 * @param $stateParams will hold the requested event id with 'id' param
 * @param $scope
 * @param DTOptionsBuilder
 * @param DTColumnBuilder
 * @param eventsService
 * @param $log
 * @constructor
 */
function EventComponentCtrl($state, $stateParams, $scope, DTOptionsBuilder, DTColumnBuilder, eventsService, $log, editEventInviteesModalService) {

    //if event id parameter was not passed, kick back to the events page
    if (!$stateParams.id || $stateParams.id <= 0) {
        $state.go('admin.events');
    }

    var vm = this;

    vm.$state = $state;
    vm.$stateParams = $stateParams;
    vm.$scope = $scope;
    vm.DTOptionsBuilder = DTOptionsBuilder;
    vm.DTColumnBuilder = DTColumnBuilder;
    vm.eventsService = eventsService;
    vm.$log = $log;
    vm.editEventInviteesModalService = editEventInviteesModalService;
}

/**
 * initialize controller
 */
EventComponentCtrl.prototype.$onInit = function () {

    var vm = this;

    vm.eventDate = moment();

    vm.datePickerOptions = {

        showWeeks: false

    };

    vm.tinymceOptions = {
        height: 200,
        theme: 'modern',
        plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen',
            'insertdatetime nonbreaking save table contextmenu directionality',
            'emoticons template paste textcolor colorpicker textpattern imagetools'
        ],
        toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        toolbar2: 'print preview | forecolor backcolor',
        image_advtab: true
    };


    vm.attachments = [{
        id: 1,
        name: "file 1"
    }, {
        id: 2,
        name: "file 2"
    }, {
        id: 3,
        name: "file 3"
    }, {
        id: 4,
        name: "file 4"
    }, {
        id: 5,
        name: "file 5"
    }, {
        id: 6,
        name: "file 6"
    }];


    //events data-table conf object
    vm.invitesDT = {
        options: vm.DTOptionsBuilder.fromFnPromise(function () {
            return vm.eventsService.getEvent(vm.$stateParams.id);
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
            .withOption('displayLength', 50)
            .withLightColumnFilter({
                '0': {
                    html: 'input',
                    type: 'text'
                },
                '1': {
                    html: 'input',
                    type: 'email'
                },
                '2': {
                    html: 'select',
                    values: [{
                        value: '', label: ''
                    }, {
                        value: 'graduate', label: 'Graduate'
                    }, {
                        value: 'student', label: 'Student'
                    }]
                },
                '3': {
                    html: 'select',
                    values: [{
                        value: '', label: ''
                    }, {
                        value: 'MSc', label: 'MSc'
                    }, {
                        value: 'BSc', label: 'BSc'
                    }, {
                        value: 'BA', label: 'BA'
                    }]
                },
                '4': {
                    html: 'select',
                    values: [{
                        value: '', label: ''
                    }, {
                        value: 'nursing', label: 'Nursing'
                    }, {
                        value: 'lifeSciences', label: 'Life Sciences'
                    }, {
                        value: 'businessAdministration', label: 'Business Administration'
                    }]
                }
            }),

        columns: [
            vm.DTColumnBuilder.newColumn('name').withTitle('Name'),
            vm.DTColumnBuilder.newColumn('email').withTitle('Email'),
            vm.DTColumnBuilder.newColumn('educationStatus').withTitle('Education Status'),
            vm.DTColumnBuilder.newColumn('degrees').withTitle('Degrees'),
            vm.DTColumnBuilder.newColumn('faculties').withTitle('Faculties')
        ]

    };


};

/**
 * destroy controller
 */
EventComponentCtrl.prototype.$onDestroy = function () {};


/**
 * edit invite's invitees
 */
EventComponentCtrl.prototype.editInvitees = function() {

    var vm = this;

    vm.editEventInviteesModalService.open();

};


//inject the following dependencies
EventComponentCtrl.$inject = ['$state', '$stateParams', '$scope', 'DTOptionsBuilder', 'DTColumnBuilder', 'eventsService', '$log', 'editEventInviteesModalService'];
