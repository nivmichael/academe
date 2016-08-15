'use strict';
angular.module('acadb')
    .controller('SideNavCtrl', function ($scope, $http, $state, $auth, Account, $stateParams, Tables, $rootScope, TableData, An_searchData, labelFilterData, Job ) {


        //$scope.label = labelFilterData.getFilterLabel();

        $scope.setFilterLabel = function(label){
            labelFilterData.setFilterLabel(label);
            labelFilterData.broadcast(label)
        }

        $scope.labelsCounts = labelFilterData.getLabelCount();
        $scope.$on('updateBadges', function(event, labelsCounts) {
            console.log(labelsCounts);
            $scope.labelsCounts = labelsCounts;
        });
        //$scope.$on('handleLabel', function(event, post_id, move_to) {
        //    $scope.labelsCounts = labelFilterData.getLabelCount();
        //})
        //$scope.$on('handleRemovedLabel', function(event, post_id, remove_from) {
        //    $scope.labelsCounts = labelFilterData.getLabelCount();
        //});


        $scope.status = {
            isopen: false
        };

      $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
      };

      TableData.list().$promise.then(function(tables){
      	$scope.tables = tables;
      });

      $scope.getTable = function(table){
         Tables.getTable(table).then(function(table){
          $scope.table = table;
          Tables.broadcast(table);
         });
      }

      //$scope.$on('handleBroadcast', function(event, user) {
      //  //$scope.user = user.user;
      //  //$scope.allJobs = user.posts;
      //});

      // on default restricts all steps in sideNav
      $scope.restricted = true;
      $scope.isRestricted =function(){
          //return $scope.restricted;
          if( $scope.restricted ){
                return true;
            }else{
              return false;
          }
      }
      $scope.$on('newSignedUser', function(event, unrestrict) {
          $scope.restricted = false;
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
            $http.post('/setStatus',{status:$scope.currentStatus})
            .success(function(data){
              console.log(data);
            }).error(function(data){
              console.log(data);

            })
      };

      $scope.set_an_search = function(){
          An_searchData.save({user:$scope.user});
          //$.post('api/set_an_search', {user:$scope.user}).success(function(callBack){
          //
          //})
      }


      $scope.userStatuses = [
        {value: 'active', text: 'Active'},
        {value: 'inactive', text: 'Inactive'}
      ]
    })