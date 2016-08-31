
angular.module("acadb")
    .controller("FormCtrl", function($scope, Form, $stateParams, $state, $filter, $rootScope, $auth, Account,RoleData, RoleStore) {


        console.log('FormCtrl');
        /*----------------------------------------------------------------------------------------------------------------------\
         |                                                                                                                      |
         |  user type in localStorage                                                                                           |
         |  =========================                                                                                           |
         |  app needs to know if the user chose to sign up as employer or jobseeker.                                            |
         |  this gets set in local storage when clicking on a type in welcome root menu, then, if a user refreshes or           |
         |  something, we know his type (and subtype if jobseeker), and redirect to the right state.                            |
         |  and i should really make this a service..                                                                           |
         |                                                                                                                      |
         ----------------------------------------------------------------------------------------------------------------------*/

        $scope.saved = JSON.parse(localStorage.getItem('user'));
        if($stateParams.type !== null){
            $scope.saved = {type: $stateParams.type, sub_type: $stateParams.sub_type};
        }else if( $scope.saved === null){
            $state.go('welcome');
        }

        $scope.jobseeker_type = $scope.saved.sub_type;
        $scope.steps = [];
        $scope.formData = {};

        if($scope.saved.type == 'employer'){
            $scope.toAccount = 'employer.portal';
        }else{
            $scope.toAccount = 'jobseeker.profile';
        }

        //all of that should be resolved..

        Form.getForm($scope.saved.type).then(function(form){
            $scope.form = angular.copy(form.data);
            $scope.user = angular.copy(form.data);
        /*----------------------------------------------------------------------------------------------------------------------\
         |                                                                                                                      |
         |  form steps                                                                                                          |
         |  ==========                                                                                                          |
         |  getting only the `docParam`s from the object for sideNav navigation - those are the form steps.                     |
         |  if the user is an employer, skip over the `personal information`.                                                   |
         |                                                                                                                      |
         ----------------------------------------------------------------------------------------------------------------------*/
            angular.forEach( $scope.user, function(value, key) {
                if($scope.saved.type == 'employer' && key == 'personal_information'){
                }else{
                    $scope.steps.push(key);
                }
            });

            //console.log($scope.steps);
            //$scope.user['personal_information']['status']           = 'active';
        })



        //add it to Form service
        $scope.nextForm = function(current){
            var res =false;
            angular.forEach( $scope.steps, function(value, key) {
                if(value == current) {
                    $scope.next = $scope.steps[key + 1];
                    res = $scope.next;
                }
            })
            return res;
        };

        $scope.groups = {};
        $scope.loadGroups = function() {
            Form.getAllOptionValues().then(function (options) {
                $scope.groups = options.data;
            });
        };
        //form actions
        $scope.validate = function(param) {
            Form.validate($scope.formData, param).then(function(response){
                $scope.errors = response.data;
            })
        }

        $scope.add = function(docParam,$index) {
            $scope.inserted = angular.copy($scope.form[docParam][0]);
            $scope.user[docParam].push($scope.inserted);
        };

        $scope.move = function(array, fromIndex, toIndex){
            console.log(array);
            array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] )
        };

        $scope.remove = function(array,index,user_id) {
            Form.remove(array,index,user_id);
            array.splice(index,1);
        };

        var date = function(month, year){
            console.log(month + '-' + year);
            return month + '-' + year;
        };


        /*----------------------------------------------------------------------------------------------------------------------\
         |                                                                                                                      |
         |  $scope.formData                                                                                                     |
         |  ===============                                                                                                     |
         |  $scope.formData is used for `personal_information` hardcoded html inputs.                                           |
         |  when its time to send an object for saving, iterating over the original form/user object's `personal_information`   |
         |  and setting the values from `$scope.formData`, only then we send the form with user.personal_information[0]         |
         |  populated with the values. params that werent populated are set with an empty string.                               |
         |                                                                                                                      |
         ----------------------------------------------------------------------------------------------------------------------*/

        $scope.reformat = function(){

            $scope.formData.subtype = $scope.saved.type;

            angular.forEach( $scope.user.personal_information[0], function(value, key) {

               var has = _.has($scope.formData, value.paramName);
               if (has){
                   $scope.user.personal_information[0][value.paramId].paramValue = $scope.formData[value.paramName];
                   if(value.inputType == 'date' && value.paramName != 'date_of_birth'  ){
                       value.paramValue = date($scope.formData.date_of_birth.month, $scope.formData.date_of_birth.year);
                   }
               }
            })

            if($scope.saved.type == 'employer'){
                angular.forEach( $scope.user.company[0], function(value, key) {

                    var has = _.has($scope.formData, value.paramName);
                    if (has){
                        $scope.user.company[0][value.paramId].paramValue = $scope.formData[value.paramName];
                        if(value.inputType == 'date' && value.paramName != 'date_of_birth'  ){
                            value.paramValue = date($scope.formData.date_of_birth.month, $scope.formData.date_of_birth.year);
                        }
                    }
                })
            }

        };

        $scope.proccessForm = function(){

            $scope.reformat();
            $scope.sent  = true;
            $scope.signup();

        };
        // save and sign up
        $scope.signup = function() {

            $auth.signup({user: $scope.user, stateParams: $stateParams})

                .success(function(response) {

                    $auth.setToken(response.token);

                    Account.getProfileAgain().then(function(account) {
                        var userRoles = account.roles;
                        var roles = [];
                        RoleData.query(function (data) {
                            angular.forEach(data, function (value, key) {
                                roles.push(value);
                            });
                            //checking if user has one of these roles..
                            angular.forEach(roles, function (value, key) {
                                RoleStore
                                    .defineRole(value.name, function () {
                                        return _.contains(userRoles, value.name);
                                    });
                            });
                            console.log('role defined');
                        });
                    });
                    if($scope.next){
                        $state.go('form.' + $scope.next);
                        $rootScope.$broadcast('newSignedUser', 'unrestrict');
                    }else{
                        $state.go($scope.toAccount);
                    }
                })
                .error(function(response) {
                    console.log(response);
                    $scope.errors = response;

                });
        };


        // manual options - this should really not be here...
        $scope.months = [
            {value: 'Month',  text: 'Month'},
            {value: '1',  text: '1'},
            {value: '2',  text: '2'},
            {value: '3',  text: '3'},
        ];
        $scope.years = [
            {value: 'Year',  text: 'Year'},
            {value: '1980', text: '1980'},
            {value: '1981', text: '1981'},
            {value: '1982', text: '1982'},
        ];
        $scope.educationStatuses = [
            {value: 'student',  text: 'Student'},
            {value: 'graduate', text: 'Graduate'},
            {value: 'intern',   text: 'Intern'},
        ];

        //datepicker
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }

});