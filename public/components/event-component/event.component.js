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
 * event component constructor
 * @param $state
 * @param $stateParams
 * @param $compile
 * @param $scope
 * @param DTOptionsBuilder
 * @param DTColumnBuilder
 * @param eventsService
 * @param $log
 * @param editEventInviteesModalService
 * @param $q
 * @param $timeout
 * @param instantPromise
 * @param fileDownloader
 * @constructor
 */
function EventComponentCtrl($state, $stateParams, $compile, $scope, DTOptionsBuilder,
                            DTColumnBuilder, eventsService, $log, editEventInviteesModalService, $q,
                            $timeout, instantPromise, fileDownloader) {

    var vm = this;
    vm.$stateParams = $stateParams;
    vm.$state = $state;
    vm.$compile = $compile;
    vm.$scope = $scope;
    vm.DTOptionsBuilder = DTOptionsBuilder;
    vm.DTColumnBuilder = DTColumnBuilder;
    vm.eventsService = eventsService;
    vm.$log = $log;
    vm.editEventInviteesModalService = editEventInviteesModalService;
    vm.$q = $q;
    vm.$timeout = $timeout;
    vm.instantPromise = instantPromise;
    vm.fileDownloader = fileDownloader;


    //get mode from state params
    vm.mode = vm.$stateParams.mode || FormEditor.status.READ_ONLY;

    //check if in create mode
    if (vm.mode == FormEditor.status.CREATE) {
        //if event id was passed as state param reload the state without it
        if (vm.$stateParams.id) {

            vm.$log.debug("un-needed id was passed as a state param in CREATE mode, reloading the state without it");

            vm.$state.go('admin.event', {mode: vm.mode, id: ''});
        }
    } else if (!vm.$stateParams.id) { //if not in create mode and has not event id as state param, go back to events page
        vm.$state.go('admin.events');
    } else if (vm.mode == FormEditor.status.READ_ONLY) { //if valid read only mode

        //TODO fix tinymce not getting disabled if initiated with disabled as true
    }
}

/**
 * initialize controller
 */
EventComponentCtrl.prototype.$onInit = function () {

    var vm = this;

    //create form editor
    vm.eventFormEditor = new FormEditor(vm.mode);

    //assign save button listener
    vm.eventFormEditor.setOnSaveListener(saveEvent);

    //assign delete button listener
    vm.eventFormEditor.setOnDeleteListener(deleteEvent);

    //TODO add on cancel listener (don't forget about the rollback problem - it also uses the cancel event)


    //get all needed data for out page: the requested event (if not in creating mode), event possible types, and event possible statuses
    vm.pageIniter = vm.$q.all({
        event: vm.eventFormEditor.isCreating() ? null : vm.eventsService.getEvent(vm.$stateParams.id),
        eventTypes: vm.eventsService.getEventTypes(),
        inviteStatuses: vm.eventsService.getInviteStatuses()
    }).then(function (result) {
        vm.eventTypes = result.eventTypes;
        vm.inviteStatuses = result.inviteStatuses;


        //create invite statuses filter for our datatable out of all possible invite statuses
        vm.inviteesDT.inviteStatusesFilter = vm.inviteStatuses.map(function (inviteStatus) {
            return {
                value: inviteStatus.name,
                label: inviteStatus.name
            };
        });

        //set the first invite statuses filter to be empty filter
        vm.inviteesDT.inviteStatusesFilter.splice(0, 0, {
            id: 0,
            value: ''
        });


        initEventData(result.event);

    }, function (reason) {

        vm.$log.error("failed to init page due to", reason);

        //TODO show error

    });


    //set date picker options
    vm.datePickerOptions = {
        showWeeks: false
    };

    //set tinymce editor options
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


    //events data-table conf object
    vm.inviteesDT = {

        dtInstance: {},

        options: vm.$q(function (resolve, reject) {

            //wait for the page to get all the data
            vm.pageIniter.then(function () { //on success

                //create
                resolve(vm.DTOptionsBuilder
                    .fromFnPromise(function () {
                        return vm.instantPromise(vm.invites);
                    })
                    .withPaginationType('full_numbers')
                    .withOption('order', [0, 'asc'])
                    .withOption('displayLength', 50)
                    .withOption('createdRow', createdRow)
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
                            html: 'input',
                            type: 'tel'
                        },
                        '3': {
                            html: 'select',
                            values: vm.inviteesDT.inviteStatusesFilter
                        },
                        '4': {
                            html: 'input',
                            type: 'text'
                        }
                    }));

            }, function (reason) {
                reject(reason);
            });

        }),

        columns: [
            vm.DTColumnBuilder.newColumn('user.fullName').withTitle('Name'),
            vm.DTColumnBuilder.newColumn('user.email').withTitle('Email'),
            vm.DTColumnBuilder.newColumn('user.mobile').withTitle('Phone Number'),
            vm.DTColumnBuilder
                .newColumn('user_status').withTitle('Status')
                .renderWith(inviteeStatusRenderer),
            vm.DTColumnBuilder.newColumn('comments')
                .withTitle('Comments')
                .renderWith(inviteeCommentsRenderer)
        ]

    };


    //helper object that will detect the renderer call number to be able to render a select with option that is filterable
    //on page init the renderer will be called 4 times, and we want to return the view on the first time
    //and the data on the 2nd, 3nd and 4th times, or else the data-tables lib will evaluate the data as all of the
    //select's option combined (concatenated by "")
    //however after the page has been already initialized, and we change the value of col's select
    //we need to reload the data of the data-table (to update the data of the select column),
    //and then the renderer will be called only 3 times
    //so again we want to return the select html on the first call and on the second and third call return the data
    //the isPageInit responsible for tell us if what type of calls we are getting, pre or post page init
    //and the callNumber value will tell us at what stage we are (1, 2, 3, 4 for pre page init, and 1, 2, 3 for post page init)
    var tableRendererHelper = {

        inviteeStatusRendered: {
            isPageInit: true,
            callNumber: 0
        }
    };

    /**
     * invitee status renderer
     * NOTICE! read tableRendererHelper's documentation to learn what is going on here
     * @param data
     * @param type
     * @param full
     * @param meta
     * @returns {*}
     */
    function inviteeStatusRenderer(data, type, full, meta) {

        var result;

        //if in first stage pre or post page init, return a select html
        if (tableRendererHelper.inviteeStatusRendered.callNumber == 0) {
            var select = '<select class = "fill-w" gt-editor-input="$ctrl.eventFormEditor" ng-change = "$ctrl.inviteesDT.dtInstance.reloadData(null, false);" ng-model = "$ctrl.invites[' + meta.row + '].user_status">';

            //populate options
            vm.inviteStatuses.forEach(function (inviteStatus) {
                select += '<option value = "' + inviteStatus.name + '">' + inviteStatus.name + '</option>';
            });

            select += '</select>';

            result = select;
        } else { //in not in first stage, return selected data value

            result = vm.invites[meta.row].user_status;
        }

        //manage the renderer helper

        if (meta.row + 1 == vm.invites.length) { //check if in after the last row

            //mark that stage is ended
            tableRendererHelper.inviteeStatusRendered.callNumber++;

            //if in pre page init and at after 3rd stage, or at post page init and  after 2nd stage
            if ((tableRendererHelper.inviteeStatusRendered.isPageInit &&
                tableRendererHelper.inviteeStatusRendered.callNumber == 4) || (
                    !tableRendererHelper.inviteeStatusRendered.isPageInit && tableRendererHelper.inviteeStatusRendered.callNumber == 3
                )) {

                //if after pre page init, mark that prePage init is over
                if (tableRendererHelper.inviteeStatusRendered.isPageInit &&
                    tableRendererHelper.inviteeStatusRendered.callNumber == 4) {
                    tableRendererHelper.inviteeStatusRendered.isPageInit = false;
                }

                //got to the last stage.. resetting
                tableRendererHelper.inviteeStatusRendered.callNumber = 0;
            }
        }


        return result;
    }

    /**
     * render invitee's comments as an input
     * @param data
     * @param type
     * @param full
     * @param meta
     * @returns {string}
     */
    function inviteeCommentsRenderer(data, type, full, meta) {

        var value = vm.invites[meta.row].comments;

        return '<input class = "fill-w" gt-editor-input="$ctrl.eventFormEditor" ng-model = "$ctrl.invites[' + meta.row + '].comments" placeholder = "Add Comment" value = "' + value + '"/>';
    }


    /**
     * use to compile created row
     * NOTICE!! without it, will not be able to use angular directives when using customer row renderer!!
     * @param row
     * @param data
     * @param dataIndex
     */
    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        vm.$compile(angular.element(row).contents())(vm.$scope);
    }


    /**
     * initialize all event data
     */
    function initEventData(event) {

        if (!vm.eventFormEditor.isCreating()) {
            vm.event = event;

            //set event date
            vm.eventDate = moment(vm.event.event_date, "YYYY-MM-DD HH:mm:ss");

            //set selected event type by event's type id
            vm.selectedEventType = _.first(vm.eventTypes.filter(function (eventType) {
                return eventType.id == vm.event.event_type_id;
            }));

            //for every invite the event has, set user status by user status id
            vm.event.invites.forEach(function (invite) {

                //set invite's user status
                invite.user_status = _.first(
                    vm.inviteStatuses.filter(function (inviteStatus) {
                        return inviteStatus.id == invite.user_status_id;
                    })
                ).name;

                //set full name
                invite.user.fullName = concat(invite.user.first_name, invite.user.last_name);
            });
        } else {
            //create empty event as we are in create mode
            vm.event = vm.eventsService.createEmptyEvent();
        }

        vm.invites = vm.event.invites;

        //create rollback function
        vm.eventFormEditor.setRollbackFunction({
            event: vm.event,
            date: vm.eventDate,
            eventType: vm.selectedEventType
        }, function (data) {

            vm.event = data.event;
            vm.invites = vm.event.invites;
            vm.eventDate = data.date;
            vm.selectedEventType = data.eventType;
        });

    }


    /**
     * save current event
     */
    function saveEvent(callback) {

        //copy current event
        var saveEvent = angular.copy(vm.event);

        //handle event type
        saveEvent.event_type_id = vm.selectedEventType.id;

        //handle event date
        saveEvent.event_date = moment(vm.eventDate).format("YYYY-MM-DD HH:mm");

        //handle event's invites
        saveEvent.invites = angular.copy(vm.invites);
        saveEvent.invites.forEach(function (invite) {

            //set user status id
            invite.user_status_id = _.first(vm.inviteStatuses.filter(function(inviteStatus) {
                return inviteStatus.name == invite.user_status;
            })).id;

            delete invite.user_status;
        });


        //try saving current event
        vm.eventsService.saveEvent(saveEvent).then(function (event) {

            vm.$log.debug("successfully saved the event", event);

            //TODO notify the user that saving the event was a success

            //check if the event was created or updated
            if (vm.event.id) { //updated

                (callback || angular.noop)();

                //init event data
                initEventData(event);

            } else { //created
                vm.$state.go('admin.event', {id: event.id, mode: FormEditor.status.READ_ONLY});
            }


        }, function (reason) {

            vm.$log.error("failed to save the event due to", reason);

            //TODO notify the user that saving the event failed

        });

    }


    /**
     * delete current event
     */
    function deleteEvent() {

        //try deleting current event
        vm.eventsService.deleteEvent(vm.event.id).then(function () {

            vm.$log.debug("successfully deleted current event");

            //TODO notify the user that deleting the event was successful

            vm.$state.go('admin.events');

        }, function (reason) {

            vm.$log.error("failed to delete current event due to", reason);

            //TODO notify the user that deleting the event failed

        });

    }
};


/**
 * destroy controller
 */
EventComponentCtrl.prototype.$onDestroy = function () {
};


/**
 * edit event's invitees
 */
EventComponentCtrl.prototype.editInvitees = function () {

    var vm = this;

    //open edit invitees modal
    vm.editEventInviteesModalService.open(vm.invites);

};


/**
 * remove attachment from event
 * @param attachment
 */
EventComponentCtrl.prototype.removeAttachment = function (attachment) {

    var vm = this;

    //filter the removed attachment
    vm.event.files = vm.event.files.filter(function (_attachment) {
        return attachment.id != _attachment.id;
    });

};


/**
 * download given attachment
 */
EventComponentCtrl.prototype.downloadAttachment = function (attachment) {

    var vm = this;

    vm.fileDownloader(attachment.filename, attachment.path);

};


//inject the following dependencies
EventComponentCtrl.$inject = ['$state', '$stateParams', '$compile', '$scope', 'DTOptionsBuilder',
    'DTColumnBuilder', 'eventsService', '$log', 'editEventInviteesModalService', '$q',
    '$timeout', 'instantPromise', 'fileDownloader'];
