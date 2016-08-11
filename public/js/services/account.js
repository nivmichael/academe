angular.module('acadb.services.account', []).value('version', '0.1')

.factory('Account', function($http, $rootScope, $q ) {

    var promise;
    return {
        getProfile: function() {
            if ( !promise ) {
                // $http returns a promise, which has a then function, which also returns a promise
                promise = $http.get('/api/me').then(function (response) {
                    // The then function here is an opportunity to modify the response

                    // The return value gets picked up by the then in the controller.
                    return $q.when(response.data);
                });
            }
            // Return the promise to the controller
            return $q.when(promise);
        },
        updateProfile: function(profileData) {
            return $http.post('/api/me',profileData);
        },
        broadcast: function(user) {
            $rootScope.$broadcast('handleBroadcast', user);
        },
        logout: function(){
            promise = null;
            return promise;
        }
    };

})