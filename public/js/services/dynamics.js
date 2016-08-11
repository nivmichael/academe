angular.module('acadb.services.dynamics', []).value('version', '0.1')
.factory('Dynamics', function($q, $rootScope, $http, $urlRouter) {
    var stateList = [];
    var $state = $rootScope.$state;
    var dynamicSteps;
    return {
        getDynamics: function() {
            // here we should call a method in docParamController and get steps for jobseeker
            $http
                .get("api/jobseekerSteps")
                .success(function(data) {
                    angular.forEach(data, function (value, key) {

                        var step = {
                            "name": "form." + value.name,
                            "url": '/' + value.name,
                            //"controller":'formController as FC',
                            "value": value.name,
                            "belongsTo": 'jobseeker',
                            "position": value.position

                        }
                        stateList.push(step);


                    });

                    /* asigning the steps */
                    $rootScope.steps = stateList;

                    /*prepending personal information to steps*/
                    //$rootScope.steps.unshift({name:'register.personal_information',value:'personal_information', "belongsTo": 'jobseeker'});


                    angular.forEach(stateList, function (value, key) {

                        var getExistingState = $state.get(value.name);
                        if (getExistingState !== null) {

                            return;
                        }

                        var state = {
                            "name": "form." + value.name,
                            "url": '/' + value.value,
                            resolve: {
                                loginRequired: loginRequired,
                            },
                            params: {docParam: value.value},
                            templateUrl: 'partials/forms/registration/registration_forms.html',
                            controller:function($scope, $state, Form){
                                $scope.docParam = $state.current.params.docParam;
                            }



                        };
                        $stateProviderRef.state(value.name, state);

                    });


                    //if ( !dynamicSteps ) {
                    //
                    //    dynamicSteps = $http.get('/api/me').then(function (response) {
                    //
                    //        return response.data;
                    //    });
                    //}
                    //
                    //return dynamicSteps;
                    //console.log(stateList);
                })}}

});

//this has to be a service - duplicate of function in app.js

function loginRequired($q, $injector, $location, $auth, $timeout, $stateParams) {
    var $state = $injector.get('$state');
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
        deferred.resolve();
    } else {
        $timeout(function() {
            //redirect is in use when we paste a link and we get redirected to login so we "cache the redirect path fot after login".
            //, redirect:$location.path()
         $state.go('login',{type: $stateParams.type,  sub_type :$stateParams.sub_type})
        },0);

    }
    return deferred.promise;
}