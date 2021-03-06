'use strict';
angular.module('acadb')
  .controller('ProfileCtrl', function($scope, $auth, Account, $http, $rootScope, $filter, Form,$log, colorpicker) {


      //console.log('profileCtrl');

      $scope.user    = {};
      $scope.groups  = {};
      $scope.isArray = angular.isArray;

      $scope.getProfile = function() {
           Account.getProfile()
               .then(function(response) {

                   $scope.user  = response.user;
                   $scope.posts = response.posts;
                   $scope.status  = $scope.user.personal_information.status;
                   Account.broadcast(response);

                   //why did i need this next line!?maybe i dont
                   //Form.getForms($scope.user.personal_information.subtype).then(function(form){
                   //    $scope.form = angular.copy(form);
                   //})

               })
               .catch(function(response) {
                   //toastr.error(response.data.message, response.status);
               });
      };



      $scope.$on('handleBroadcast', function(event, user) {
         //$scope.user = user.user;
         // $scope.form = user.user;
         //$scope.allPosts = user.posts;
      });

      $scope.saveUser = function() {
          var date = $scope.user.personal_information.date_of_birth;
          $scope.user.personal_information.date_of_birth = $filter('date')(date,'yyyy-MM-dd');
          Account.updateProfile($scope.user)
            .then(function(response) {
              Account.broadcast(response.data);
            })
            .catch(function(response) {
            });
      };
      $scope.loadGroups = function() {
           Form.getAllOptionValues().then(function(options){
               $scope.groups = options.data;
           });
      };

      Form.getForm('jobseeker').then(function(form){
         $scope.form = form.data;
      });

      $scope.add = function(docParam,$index) {
           $scope.inserted = angular.copy($scope.form[docParam][0]);
           $scope.user[docParam].push($scope.inserted);
      };

      $scope.move = function(array, fromIndex, toIndex){
            array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] )
      };
      $scope.remove = function(array,docParamName,index) {
          array.splice(index,1);
          Form.remove(array,docParamName,index);
      };

      //$scope.saveUser = function(user) {
      //
      //      return $http.post('/users',{user:user})
      //      .success(function(v){
      //
      //
      //      }).error(function(err) {
      //          if(err.field && err.msg) {
      //              // err like {field: "name", msg: "Server-side error for this username!"}
      //              $scope.editableForm.$setError(err.field, err.msg);
      //          } else {
      //              // unknown error
      //              $scope.editableForm.$setError('name', 'Unknown error!');
      //          }
      //      });
      //};
      $scope.changeThis = function(data, param){
          param.paramValue = data;
          return param;

      };

      $scope.showIterableGroup = function(paramKey, docParamName, index, paramName) {
            paramKey = paramKey.toString();
            if($scope.user[docParamName][index][paramKey]['paramValue'] && typeof $scope.groups[paramName] != 'undefined') {
                //var selected = $filter('filter')($scope.groups[paramName], {value: $scope.user[docParamName][index][paramKey]['paramValue']});
                var selected = $filter('filter')($scope.groups[paramName], {id: $scope.user[docParamName][index][paramKey]['paramValue']});

                return selected.length ? selected[0].text : 'Not set';
            } else {
                return $scope.user[docParamName][index][paramKey]['paramValue'] || '';
            }
      };


      $scope.showChecklistGroup = function(paramKey, docParamName) {
        if (typeof $scope.user[docParamName][paramKey]['paramValue'] !== 'undefined' && $scope.user[docParamName][paramKey]['paramValue'] !== null) {
          if($scope.user[docParamName][paramKey]['paramValue'].length > 0) {
            return  $scope.user[docParamName][paramKey]['paramValue'].join(', ');
          }
          return  $scope.user[docParamName][paramKey]['paramValue'];
        }
        var	selected = [];
        angular.forEach($scope.groups[paramKey], function(option) {
          if ($scope.user[docParamName][paramKey]['paramValue'].indexOf(option.value) >= 0) {
            selected.push(option.text);
          }
        });
        return selected.length ? selected.join(', ') : 'Not set';
      };

      $scope.showIterableChecklistGroup = function(paramKey, docParamName, index) {


        if (typeof $scope.user[docParamName][index][paramKey]['paramValue'] !== 'undefined' && $scope.user[docParamName][index][paramKey]['paramValue'] !== null) {
          return  $scope.user[docParamName][index][paramKey]['paramValue'] ?  $scope.user[docParamName][index][paramKey]['paramValue'].join(', ') : ' ';
        }
        var	selected = [];


        angular.forEach($scope.groups[paramKey], function(option) {
          if ($scope.user[docParamName][index][paramKey]['paramValue'].indexOf(option.value) >= 0) {
            selected.push(option.text);
          }
        });

        return selected.length ? selected.join(', ') : 'Not set';
      };




        $scope.opened = {};
        $scope.open = function($event, elementOpened) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened[elementOpened] = !$scope.opened[elementOpened];
        };


        $scope.genders = [
        {value: 'male', text: 'Male'},
        {value: 'female', text: 'Female'},

      ];


     $scope.martialStatuses = [
        {value: 'married', text: 'Marrired'},
        {value: 'single', text: 'Single'},
        {value: 'divorced', text: 'Divorced'},
        {value: 'widdowed', text: 'Widdowed'},

     ];
     $scope.footerNavlis = [
          {id: '1', tag:'Resumes'},
          {id: '2', tag:'Certifications'},
          {id: '3', tag:'References '},
          {id: '4', tag:'Gallery '},
          {id: '5', tag:'Cover '},
     ];
     $scope.educationStatuses = [
            {value: 'student', text: 'Student'},
            {value: 'graduate', text: 'Graduate'},
            {value: 'intern', text: 'Intern'},


     ];
     $scope.oneAtATime = true;


        function refreshSwatch(ev, ui) {
            var red = $scope.colorpicker.red,
                green = $scope.colorpicker.green,
                blue = $scope.colorpicker.blue;
            colorpicker.refreshSwatch(red, green, blue);
        }
        // Slider options with event handlers
        $scope.slider = {
            'options': {
                start: function(event, ui) {
                    $log.info('Event: Slider start - set with slider options', event);
                },
                stop: function(event, ui) {
                    $log.info('Event: Slider stop - set with slider options', event);
                }
            }
        };
        $scope.demoVals = {
            sliderExample3: 14,
            sliderExample4: 14,
            sliderExample5: 50,
            sliderExample8: 0.34,
            sliderExample9: [-0.52, 0.54],
            sliderExample10: -0.37,
            sliderExample14a: 50,
            sliderExample14b: 50,
            sliderExample15: [30, 60],
            sliderExample16: 21,
            sliderExample17: 70
        };
        $scope.colorpicker = {
            red: 255,
            green: 140,
            blue: 60,
            options: {
                orientation: 'horizontal',
                min: 0,
                max: 255,
                range: 'min',
                change: refreshSwatch,
                slide: refreshSwatch
            }
        };

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

        $scope.datepickers = [];
        $scope.open = function($event,paramKey,index) {
            $scope.datepickers[index] = []
            $scope.datepickers[index][paramKey] = true;
        };

        //$scope.open = function($event, which) {
        //    $event.preventDefault();
        //    $event.stopPropagation();
        //
        //    $scope.datepickers[which]= true;
        //};
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







      //$scope.updateProfile = function() {
    //  Account.updateProfile($scope.user)
    //    .then(function() {
    //      //toastr.success('Profile has been updated');
    //    })
    //    .catch(function(response) {
    //      //toastr.error(response.data.message, response.status);
    //    });
    //};


    $scope.getProfile();
  });
