'use strict';
angular.module('acadb')
    .controller('SideNavController', function ($scope, $http, $state, $auth, Account, $stateParams, Tables, $rootScope, TableData) {

      TableData.list().$promise.then(function(tables){
      	$scope.tables = tables;
      });

      $scope.getTable = function(table){
         Tables.getTable(table).then(function(table){
          $scope.table = table;
          Tables.broadcast(table);
         });
      }

      $scope.$on('handleBroadcast', function(event, user) {
        $scope.user = user.user;
        //$scope.allJobs = user.posts;
      });


      $scope.type = $stateParams.type;
      $scope.sub_type = $stateParams.sub_type;
      if ($auth.isAuthenticated()) {
        Account.getProfile().then(function (response) {

          $scope.user = response.user;
          $scope.currentStatus = response.user.personal_information.status;
        })
      }
      $scope.ToolbarModel = {
        IsVisible: true,
        ViewUrl: null,
      };
      $scope.ToolbarModel.close = function () {
        this.IsVisible = false;
        this.ViewUrl = null;
      }
      $scope.isAuthenticated = function () {
        return $auth.isAuthenticated();
      };
      $scope.changeStatus = function(status){
        //$.post('/setStatus', {status:status,_token:CSRF_TOKEN,from:'tables'}).success(function(callBack){
        //	$scope.user.status = status;
        //	console.log(callBack);
        //})
        $http.post('/setStatus',{status:$scope.currentStatus})
            .success(function(data){
              console.log(data);
            }).error(function(data){
              console.log(data);

            })
      };

      $scope.userStatuses = [
        {value: 'active', text: 'Active'},
        {value: 'inactive', text: 'Inactive'}
      ]
    })