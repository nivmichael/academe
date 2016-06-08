'use strict';
angular.module('acadb')
  .controller('ProfileCtrl', function($scope, $auth, Account, $http, $rootScope, $filter, Form) {

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

               })
               .catch(function(response) {
                   //toastr.error(response.data.message, response.status);
               });
      };


      $scope.$on('handleBroadcast', function(event, user) {
         // $scope.user = user.user;
         // $scope.form = user.user;
         //$scope.allPosts = user.posts;
      });

      $scope.saveUser = function() {
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

      //$scope.add = function(docParam,$index) {
      //     $scope.inserted = angular.copy($scope.form[docParam][0]);
      //     $scope.user[docParam].push($scope.inserted);
      //};

      $scope.add = function(docParam,$index) {
           Form.add().then(function(data){
               $scope.inserted = data[docParam][0];
               $scope.user[docParam].push($scope.inserted);
           })
      };

      $scope.move = function(array, fromIndex, toIndex){
            array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] )
      };
      $scope.remove = function(array,index,user_id) {
            Form.remove(array,index,user_id);
            array.splice(index,1);

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


      $scope.showIterableGroup = function(paramKey, docParamName, index, paramName) {
            paramKey = paramKey.toString();
            if($scope.user[docParamName][index][paramKey]['paramValue'] && typeof $scope.groups[paramName] != 'undefined') {
                var selected = $filter('filter')($scope.groups[paramName], {value: $scope.user[docParamName][index][paramKey]['paramValue']});

                return selected.length ? selected[0].text : 'Not set';
            } else {
                return $scope.user[docParamName][index][paramKey]['paramValue'] || '';
            }
      };

      $scope.addWhenEdit = function(docParam,$index) {

        $http.get('api/forms/register_jobseeker')
            .success(function(data, status, headers, config) {
                $scope.inserted = data[docParam];
                console.log($scope.inserted);
                $scope.user[docParam].push($scope.inserted[0]);

            })
            .error(function(){
                alert('ERROR!!');
            });
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




        //materialize datepicker
        var currentTime = new Date();
        $scope.currentTime = currentTime;
        $scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        $scope.disable = [false, 1, 7];
        $scope.today = 'Today';
        $scope.clear = 'Clear';
        $scope.close = 'Close';
        var days = 15;
        $scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
        $scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
        $scope.onStart = function () {

        };
        $scope.onRender = function () {

        };
        $scope.onOpen = function () {

        };
        $scope.onClose = function () {

        };
        $scope.onSet = function () {

        };
        $scope.onStop = function () {

        };
        //end materialize datepicker

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


      //$scope.updateProfile = function() {
    //  Account.updateProfile($scope.user)
    //    .then(function() {
    //      //toastr.success('Profile has been updated');
    //    })
    //    .catch(function(response) {
    //      //toastr.error(response.data.message, response.status);
    //    });
    //};

    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function() {
          //toastr.success('You have successfully linked a ' + provider + ' account');
          $scope.getProfile();
        })
        .catch(function(response) {
          //toastr.error(response.data.message, response.status);
        });
    };
    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          //toastr.info('You have unlinked a ' + provider + ' account');
          $scope.getProfile();
        })
        .catch(function(response) {
          //toastr.error(response.data ? response.data.message : 'Could not unlink ' + provider + ' account', response.status);
        });
    };

    $scope.getProfile();
  });
