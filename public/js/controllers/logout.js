'use strict';
angular.module('acadb')
  .controller('LogoutCtrl', function($scope, $location, $auth, Account) {
    if (!$auth.isAuthenticated()) { return; }

      $scope.logout = function(){
        $auth.logout()
            .then(function() {
                Account.logout();
              // toastr.info('You have been logged out');
                $location.path('/');
            });
      }


  });