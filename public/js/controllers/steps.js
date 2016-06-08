'use strict';
angular.module('acadb')
  .controller('StepManagerCtrl', function($scope, $http, Steps) {
    $scope.getSteps = function(){
      Steps.getAllSteps().then(function(response){
        $scope.admin_steps = response;
          console.log($scope.admin_steps);
      })
    }
    $scope.getSteps();
  });