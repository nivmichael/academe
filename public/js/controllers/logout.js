'use strict';
angular.module('acadb')
  .controller('LogoutCtrl', function($scope, $location, $auth, Account, RoleStore) {
    if (!$auth.isAuthenticated()) { return; }

      $scope.logout = function(){
        $auth.logout()
            .then(function() {
                Account.logout();
                RoleStore.clearStore();
                RoleStore
                    .defineManyRoles({
                        'guest': [],
                    });
              // toastr.info('You have been logged out');
                $location.path('/');
            });
      }


  });