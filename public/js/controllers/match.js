
'use strict';
angular.module('acadb')
    .controller('MatchCtrl', function($scope, userMatch) {
        console.log(userMatch);
        $scope.user  = userMatch;
        $scope.oneAtATime = true;
    });