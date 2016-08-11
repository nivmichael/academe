
'use strict';
angular.module('acadb')
    .controller('MatchesCtrl', function($scope, UserData) {

        //this should get only the matches..not all users..

        $scope.users  = UserData.query();
    });