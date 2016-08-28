angular.module('acadb.components.edit-event-invitees-modal', [])

    .component('editEventInvitees', {
        templateUrl: 'components/edit-event-invitees-component/edit-event-invitees-modal.html',
        controller: EditEventInviteesModal,
        bindings: {
            close: '=',
            invites: '='
        }
    })

;


/**
 * controller constructor
 * @param $log
 * @param DTOptionsBuilder
 * @param DTColumnBuilder
 * @param $q
 * @param eventsService
 * @param usersService
 * @param $scope
 * @param $compile
 * @param Form
 * @constructor
 */
function EditEventInviteesModal($log, DTOptionsBuilder, DTColumnBuilder, $q, eventsService, usersService, $scope, $compile, Form) {
    var vm = this;

    vm.$log = $log;
    vm.DTOptionsBuilder = DTOptionsBuilder;
    vm.DTColumnBuilder = DTColumnBuilder;
    vm.$q = $q;
    vm.eventsService = eventsService;
    vm.usersService = usersService;
    vm.$scope = $scope;
    vm.$compile = $compile;
    vm.Form = Form;
}

/**
 * initiate controller
 */
EditEventInviteesModal.prototype.$onInit = function () {

    var vm = this;

    //init the page with all the required data
    vm.pageIniter = vm.$q.all({
        users: vm.usersService.getUsers(),
        paramValues: vm.Form.getAllOptionValues()
    }).then(function (result) {

        vm.users = result.users;
        vm.educationStatuses = result.paramValues.data.education_status;
        vm.degrees = result.paramValues.data.degree;
        vm.faculties = result.paramValues.data.major;


        //handle users
        vm.users.forEach(function (user) {

            //set full name
            user.personal_information.full_name = concat(user.personal_information.first_name, user.personal_information.last_name);

            //handle user's degrees and faculties
            var userDegrees = [];
            var userFaculties = [];

            if (user.education) {
                user.education.forEach(function (education) {

                    for (var key in education) {

                        if (education[key].paramName == "degree") {
                            userDegrees.push(education[key].paramValue);
                        }


                        if (education[key].paramName == "major") {
                            userFaculties.push(education[key].paramValue);
                        }
                    }

                });
            }

            //set user's degrees
            user.degrees = symConcatArr(", ", userDegrees) || "";

            //set user's faculties
            user.faculties = symConcatArr(", ", userFaculties) || "";

            //mark all invited users
            vm.invites.forEach(function(invite) {

                if (user.personal_information.id == invite.user_id) {
                    user.invited = true;
                }

            });

        });


        //set education statuses data-table filter
        vm.inviteesDT.educationStatusesFilter = vm.educationStatuses.map(function (educationStatus) {
            return {
                value: educationStatus.value,
                label: educationStatus.value.capitalizeFirstLetter()
            };
        });

        //set the first option to be blank (as no filter was chosen)
        vm.inviteesDT.educationStatusesFilter.splice(0, 0, {
            value: '', label: ''
        });


        //set degrees data-table filter
        vm.inviteesDT.degreesFilter = vm.degrees.map(function (degree) {
            return {
                value: degree.value,
                label: degree.value.capitalizeFirstLetter()
            };
        });

        //set the first option to be blank (as no filter was chosen)
        vm.inviteesDT.degreesFilter.splice(0, 0, {
            value: '', label: ''
        });


        //set faculties data-table filter
        vm.inviteesDT.facultiesFilter = vm.faculties.map(function (faculty) {
            return {
                value: faculty.value,
                label: faculty.value.capitalizeFirstLetter()
            };
        });

        //set the first option to be blank (as no filter was chosen)
        vm.inviteesDT.facultiesFilter.splice(0, 0, {
            value: '', label: ''
        });


    }, function (reason) {

        vm.$log.error("failed to initialize the page due to", reason);

        //TODO notify the user initializing the page has failed

    });


    //events data-table conf object
    vm.inviteesDT = {

        dtInstance: {},

        options: vm.$q(function (resolve, reject) {

            //wait for the page to get all the data
            vm.pageIniter.then(function () { //on success

                //create
                resolve(vm.DTOptionsBuilder.fromFnPromise(function () {
                    return vm.$q.resolve(vm.users);
                }).withPaginationType('full_numbers')
                    .withOption('order', [0, 'desc'])
                    .withOption('displayLength', 50)
                    .withOption('headerCallback', function (header) {
                        if (!vm.inviteesDT.headerCompiled) {
                            // Use this headerCompiled field to only compile header once
                            vm.inviteesDT.headerCompiled = true;
                            vm.$compile(angular.element(header).contents())(vm.$scope);
                        }
                    })
                    .withOption('createdRow', function (row, data, dataIndex) {
                        // Recompiling so we can bind Angular directive to the DT
                        vm.$compile(angular.element(row).contents())(vm.$scope);
                    })

                    .withLightColumnFilter({
                        '0': {
                            html: 'select',
                            values: [{
                                label: '',
                                value: ''
                            }, {
                                label: 'Selected',
                                value: true
                            }, {
                                label: 'Not Selected',
                                value: false
                            }]
                        },
                        '1': {
                            html: 'input',
                            type: 'text'
                        },
                        '2': {
                            html: 'input',
                            type: 'email'
                        },
                        '3': {
                            html: 'select',
                            values: vm.inviteesDT.educationStatusesFilter
                        },
                        '4': {
                            html: 'select',
                            values: vm.inviteesDT.degreesFilter
                        },
                        '5': {
                            html: 'select',
                            values: vm.inviteesDT.facultiesFilter
                        }
                    }));

            });


        }),

        columns: [
            vm.DTColumnBuilder.newColumn('invited').renderWith(isUserInvitedRenderer),
            vm.DTColumnBuilder.newColumn('personal_information.full_name').withTitle('Name'),
            vm.DTColumnBuilder.newColumn('personal_information.email').withTitle('Email'),
            vm.DTColumnBuilder.newColumn('personal_information.education_status').withTitle('Education Status'),
            vm.DTColumnBuilder.newColumn('degrees').withTitle('Degrees'),
            vm.DTColumnBuilder.newColumn('faculties').withTitle('Faculties')
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

        isUserInvitedRenderer: {
            isPageInit: true,
            callNumber: 0
        }
    };


    /**
     * render invitee's comments as an input
     * @param data
     * @param type
     * @param full
     * @param meta
     * @returns {string}
     */
    function isUserInvitedRenderer(data, type, full, meta) {

        var result;

        //if in first stage pre or post page init, return a select html
        if (tableRendererHelper.isUserInvitedRenderer.callNumber == 0) {
            result = '<input ng-click="$ctrl.reloadData()" type="checkbox" ng-model="$ctrl.users[' + meta.row + '].invited">';

        } else { //in not in first stage, return selected data value

            result = !!full.invited;
        }

        //manage the renderer helper

        if (meta.row + 1 == vm.users.length) { //check if in after the last row

            //mark that stage is ended
            tableRendererHelper.isUserInvitedRenderer.callNumber++;

            //if in pre page init and at after 3rd stage, or at post page init and  after 2nd stage
            if ((tableRendererHelper.isUserInvitedRenderer.isPageInit &&
                tableRendererHelper.isUserInvitedRenderer.callNumber == 5) || (
                    !tableRendererHelper.isUserInvitedRenderer.isPageInit && tableRendererHelper.isUserInvitedRenderer.callNumber == 4
                )) {

                //if after pre page init, mark that prePage init is over
                if (tableRendererHelper.isUserInvitedRenderer.isPageInit &&
                    tableRendererHelper.isUserInvitedRenderer.callNumber == 5) {
                    tableRendererHelper.isUserInvitedRenderer.isPageInit = false;
                }

                //got to the last stage.. resetting
                tableRendererHelper.isUserInvitedRenderer.callNumber = 0;
            }
        }


        return result;
    }

};

/**
 * destroy controller
 */
EditEventInviteesModal.prototype.$onDestroy = function () {
};


/**
 * close the edit event invitees modal, if selected invitees are given, pass then to the event controller
 * @param invitees
 */
EditEventInviteesModal.prototype.close = function (invitees) {
    var vm = this;

    vm.close(invitees);
};


/**
 * save selected users as invitees
 */
EditEventInviteesModal.prototype.save = function () {

    var vm = this;

    //close the modal and pass all the selected users as invitees
    vm.close(vm.users.filter(function (user) {
        return user.invited;
    }));

};


/**
 * select all users as invitees
 */
EditEventInviteesModal.prototype.selectAllUsers = function () {

    var vm = this;

    vm.users.forEach(function (user) {
        user.invited = true;
    });

    //reload the data table data
    vm.reloadData();

};


/**
 * un-select all users as invitees
 */
EditEventInviteesModal.prototype.unSelectAllUsers = function () {

    var vm = this;

    vm.users.forEach(function (user) {
        user.invited = false;
    });

    //reload the data table data
    vm.reloadData();

};

/**
 * select the filtered user as invitees
 */
EditEventInviteesModal.prototype.selectFiltered = function () {

    var vm = this;

    vm.inviteesDT.dtInstance.DataTable.rows({filter: 'applied'})[0].forEach(function(userIndex) {
        vm.users[userIndex].invited = true;
    });

    //reload the data table data
    vm.reloadData();

};


/**
 * un-select the filtered user as invitees
 */
EditEventInviteesModal.prototype.unSelectFiltered = function () {

    var vm = this;



    vm.inviteesDT.dtInstance.DataTable.rows({filter: 'applied'})[0].forEach(function(userIndex) {
        vm.users[userIndex].invited = false;
    });

    //reload the data table data
    vm.reloadData();

};


/**
 * reload data table data, used to notify the data-table the some of it's row's columns data has changed
 */
EditEventInviteesModal.prototype.reloadData = function () {

    this.inviteesDT.dtInstance.reloadData(null, false);
};


EditEventInviteesModal.$inject = ['$log', 'DTOptionsBuilder', 'DTColumnBuilder', '$q',
    'eventsService', 'usersService', '$scope', '$compile', 'Form'];