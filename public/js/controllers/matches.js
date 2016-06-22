
'use strict';
angular.module('acadb')
    .controller('MatchesCtrl', function($scope, UserData) {
        $scope.users  = UserData.query();
    });