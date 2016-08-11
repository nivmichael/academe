
var $stateProviderRef = null;
var $urlRouterProviderRef = null;

var acadb = angular.module('acadb', [
    'ngRoute',
    'ui.router', 'permission', 'permission.ui',
    'ct.ui.router.extras',
    'angular-loading-bar',
    'ngAnimate',
    'ui.bootstrap',
    'acadb.controllers',
    'acadb.services',
    'acadb.filters',
    'acadb.directives',
    'xeditable',
    'ngResource',
    'angularMoment',
    //'ui.materialize',
    'angular-toArrayFilter',
    'ngSanitize',
    'satellizer',
    //'rateYo',
    'ui.bootstrap.modal',
    'ngFileUpload',
    'ngImgCrop',
    'smart-table',
    'wt.responsive',
    'lrDragNDrop',
    'ui.sortable',
    'angular.filter',
    'dndLists',
    'ui.slider',

    ])






.run(['$rootScope', '$state', '$stateParams','$http', function($rootScope, $state, $stateParams,$http) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        acadb.theme = 'bs3';

}])

.config(function($authProvider) {
    $authProvider.httpInterceptor = function() { return true; },
    $authProvider.withCredentials = true;
    $authProvider.tokenRoot = null;
    $authProvider.cordova   = false;
    $authProvider.baseUrl   = '/';
    $authProvider.loginUrl  = 'api/authenticate';
    $authProvider.signupUrl = 'api/signup';
    $authProvider.unlinkUrl = '/unlink/';
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = 'satellizer';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';
    $authProvider.storageType = 'localStorage';
})
.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider',

            function($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

                // XSRF token naming
                $httpProvider.defaults.xsrfHeaderName = 'x-dt-csrf-header';
                $httpProvider.defaults.xsrfCookieName = 'X-CSRF-TOKEN';

                //$httpProvider.interceptors.push('httpInterceptor');

                //$urlRouterProvider.otherwise( function($injector) {
                //    var $state = $injector.get("$state");
                //    $state.go('/');
                //});


                $urlRouterProvider.deferIntercept();

                var modal;
                $stateProvider

                    .state('welcome', {
                        url: '/',
                        templateUrl: '../partials/tpl/welcome.html',
                        resolve: {
                            redirectToProfileIfLogged:redirectToProfileIfLogged
                        },
                        controller: 'WelcomeCtrl'
                        //data: {
                        //    permissions: {
                        //        except: ['jobseeker','employer'],
                        //        redirectTo: function(rejectedPermission, transitionProperties){
                        //
                        //            console.log(rejectedPermission[0]);
                        //            console.log(transitionProperties);
                        //
                        //            return {
                        //                state: 'login',
                        //                params: {
                        //                    type:rejectedPermission[0],
                        //                    //sub_type: transitionProperties.toParams.sub_type,
                        //                }
                        //            };
                        //        }
                        //    }
                        //}
                    })
                    .state('login', {
                        url: '^/login',
                        params: {type: null,  sub_type : null, redirect: null},
                        resolve: {
                            skipIfLoggedIn: skipIfLoggedIn,
                            //redirectToProfileIfLogged:redirectToProfileIfLogged
                        },
                        //data: {
                        //    permissions: {
                        //        except: ['employer','jobseeker','tech_admin'],
                        //        redirectTo: {
                        //            employer: 'employer.portal',
                        //            jobseeker: 'jobseeker.profile',
                        //            tech_admin: 'admin.steps',
                        //            default:'login'
                        //        },
                        //        redirectTo: 'welcome'
                        //    }
                        //},
                        templateUrl: '../partials/tpl/login.html',
                        controller: 'LoginCtrl',

                    })
                    .state('password', {
                        abstract:true,
                        views:{
                            'main':{
                                template: '<div ui-view="main"></div>',
                            },
                            'footer':{
                                templateUrl: '../partials/tpl/footer.html'
                            }
                        }
                    })
                    .state('password_mail', {
                        url: '^/password',
                        views:{
                            '':{
                                templateUrl: '../partials/tpl/password_mail.html',
                                controller: 'PasswordCtrl'
                            }
                        }
                    })
                    .state('password_reset', {
                        url: '^/reset/:token',
                        resolve: {
                            isTokenValid: isTokenValid,
                        },
                        views:{
                            '':{
                                templateUrl: '../partials/tpl/password_reset.html',
                                controller: 'PasswordCtrl'
                            }
                        }
                    })

                    .state('admin', {
                        url:  '/',
                        resolve: {
                            loginRequired: loginRequired,
                        },
                        data: {
                            permissions: {
                                only: ['tech_admin'],
                                redirectTo: function(rejectedPermission, transitionProperties){
                                        return {
                                            state: 'login',
                                            params: {
                                                type: transitionProperties.toParams.type,
                                                redirect: 'admin.blank'
                                            }
                                        };
                                }
                            }
                        },
                        // sticky: true,
                        //deepStateRedirect: true,
                        abstract:true,
                        params: {type: 'employer',  sub_type : null},
                        templateUrl: '../partials/admin/admin.html',
                    })
                    .state('admin.blank', {
                        url:  '^/blank',
                        resolve: {
                            loginRequired: loginRequired,
                        },
                        parent: 'admin',
                        params: {type: 'employer',  sub_type : null},
                        deepStateRedirect: true,
                        views:{
                            'nav@admin':{
                                templateUrl: '../partials/admin/tpl/admin_navbar.html',
                                controller:  'SideNavCtrl as NC',
                            },
                            //'sideNav@admin':{
                            //    templateUrl: '../partials/admin/tpl/admin_sideNav.html',
                            //    controller:  'SideNavCtrl as NC',
                            //},
                            '': {
                                templateUrl: '../partials/admin/blank.html',
                                controller: 'StepManagerCtrl as SMC',
                            },
                        }

                    })
                    .state('admin.steps', {
                        url:  '^/step_management',
                        resolve: {
                            loginRequired: loginRequired,
                        },
                        parent: 'admin',
                        //sticky: true,
                        deepStateRedirect: true,
                        params: {type: 'employer',  sub_type : null, redirect:'admin.steps'},
                        views:{
                            'nav@admin':{
                                templateUrl: '../partials/admin/tpl/admin_navbar.html',
                                controller:  'SideNavCtrl as NC',
                            },
                            'sideNav@admin':{
                                templateUrl: '../partials/tpl/sideNav/employer_company_sideNav.html',
                                controller:  'SideNavCtrl as NC',
                            },
                            '': {
                                templateUrl: '../partials/admin/steps_management.html',
                                controller: 'StepManagerCtrl as SMC',
                            },
                        }

                    })
                    .state('admin.events', {
                        url:  '^/events',
                        resolve: {
                            loginRequired: loginRequired,
                        },
                        parent: 'admin',
                        //sticky: true,
                        deepStateRedirect: true,
                        params: {type: 'employer',  sub_type : null, redirect:'admin.steps'},
                        views:{
                            'nav@admin':{
                                templateUrl: '../partials/admin/tpl/admin_navbar.html',
                                controller:  'SideNavCtrl as NC',
                            },
                            '': {
                                templateUrl: '../partials/admin/events.html',
                                //controller: 'StepManagerCtrl as SMC',
                            },
                        }

                    })
                    //.state('admin.manager', {
                    //    url:  '^/manager',
                    //    resolve: {
                    //        loginRequired: loginRequired,
                    //    },
                    //    //sticky: true,
                    //    deepStateRedirect: true,
                    //    params: {type: 'employer',  sub_type : null},
                    //    views:{
                    //        'manager.nav@admin':{
                    //            templateUrl: '../partials/admin/tpl/steps_navbar.html',
                    //            controller:  'SideNavCtrl as NC',
                    //        },
                    //        'manager.sideNav@admin':{
                    //            templateUrl: '../partials/admin/tpl/admin_tables_sideNav.html',
                    //            controller:  'SideNavCtrl as NC',
                    //        },
                    //        'manager@admin': {
                    //            templateUrl: '../partials/admin/manager.html',
                    //            controller: 'ManagerCtrl as MC',
                    //        },
                    //    }
                    //
                    //})

                    .state('admin.forms', {
                        url:  '^/forms',
                        abstract:true,
                        resolve: {
                            loginRequired: loginRequired,
                        },
                        params: {type: 'employer',  sub_type : null},
                        views:{
                            'nav@admin':{
                                templateUrl: '../partials/admin/tpl/admin_navbar.html',
                                controller:  'SideNavCtrl as NC',
                            },
                            'sideNav@admin':{
                                templateUrl: '../partials/admin/tpl/admin_forms_sideNav.html',
                                controller:  'SideNavCtrl as NC',
                            },
                            '': {
                                template: '<div ui-view="form"></div>',
                                //controller: 'editFormCtrl as EFC',
                            },
                        }

                    })

                    .state('admin.forms.jobseeker', {
                        url:  '/jobseeker',
                        resolve: {
                            formFor: function(Form,  $timeout){
                                return Form.getAdminForm('jobseeker');
                            },
                            userType: function(){
                                return 'jobseeker';
                            },
                            loginRequired: loginRequired,
                        },
                        params: {type: null,  sub_type : null},
                        deepStateRedirect: true,
                        views:{
                            'form@admin.forms': {
                                templateUrl: '../partials/admin/forms.html',
                                controller: 'editFormCtrl as EFC',
                            },
                        }

                    })
                    .state('admin.forms.employer', {
                        url:  '/employer',
                        resolve: {
                            loginRequired: loginRequired,
                            formFor: function(Form , $timeout){
                                return Form.getAdminForm('employer');
                            },
                            userType: function(){
                                return 'employer';
                            },
                        },

                        params: {type: 'employer',  sub_type : null},
                        deepStateRedirect: true,
                        views:{
                            'form@admin.forms': {
                                templateUrl: '../partials/admin/forms.html',
                                controller: 'editFormCtrl as EFC',
                            },
                        }

                    })
                    .state('admin.forms.job', {
                        url:  '/job',
                        resolve: {
                            loginRequired: loginRequired,
                            formFor: function(Form,  $timeout){
                                return Form.getAdminForm('job');
                            },
                            userType: function(){
                                return 'job';
                            },
                        },
                        params: {type: 'employer',  sub_type : null},
                        deepStateRedirect: true,
                        views:{
                            'form@admin.forms': {
                                templateUrl: '../partials/admin/forms.html',
                                controller: 'editFormCtrl as EFC',
                            },
                        }

                    })

                $urlRouterProvider.otherwise('/');

                function redirectToProfileIfLogged($q, $auth, $injector, $stateParams,$timeout,$location,Account) {
                    var $state = $injector.get('$state');
                    var deferred = $q.defer();
                    if ($auth.isAuthenticated()) {
                        Account.getProfile().then(function(account) {

                            console.log('this is the welcome state, if no refferer - go to account');
                            var userRoles = account.roles;
                            $timeout(function() {
                                //
                                if (_.contains(userRoles, 'employer') ) {
                                    $state.go('employer.portal')
                                } else if (_.contains(userRoles, 'jobseeker')) {
                                    $state.go('jobseeker.profile');
                                }

                            },1000)


                        });
                    } else {
                        deferred.resolve();
                    }
                    return deferred.promise;
                }
                // this is for login only !/?
                function skipIfLoggedIn($q, $auth, $injector, $stateParams, $timeout, $location, Account) {
                    var $state = $injector.get('$state');
                    var deferred = $q.defer();

                    if ($auth.isAuthenticated()) {



                        //console.log('user authed - getting account');
                        //Account.getProfile().then(function(account) {
                        //
                        //    console.log('if no refferer - go to account');
                        //
                        //    var userRoles = account.roles;
                        //    $timeout(function() {
                        //        //
                        //        if (_.contains(userRoles, 'employer') ) {
                        //            $state.go('employer.portal')
                        //        } else if (_.contains(userRoles, 'jobseeker')) {
                        //            $state.go('jobseeker.profile');
                        //        }
                        //
                        //    },1000)
                        //
                        //
                        //});
                        //
                        deferred.reject();
                    } else {
                        deferred.resolve();
                    }
                    return deferred.promise;
                }
                function loginRequired($q, $injector, $location, $auth, $timeout, $stateParams) {
                    var $state = $injector.get('$state');
                    var deferred = $q.defer();
                    if ($auth.isAuthenticated()) {
                        deferred.resolve();
                    } else {
                        $timeout(function() {

                            //, redirect:$location.path()
                            $state.go('login',{type: $stateParams.type,  sub_type :$stateParams.sub_type})

                        },0);
                    }
                    return deferred.promise;
                }
                function isTokenValid($q, $http, $location, $auth ,$stateParams, $state,  verifyToken) {
                    var token = $stateParams.token;
                    var deferred = $q.defer();

                    $http.post("verifyToken",{token:$stateParams.token})
                        .success(function (data){
                            deferred.resolve();
                        })
                        .error(function (errors, status){
                            $scope.error  = errors.error;
                            $scope.errors = errors;
                            $state.go('login');
                        })

                    return deferred.promise;
                };

                $locationProvider.html5Mode({
                    enabled: false
                });
                $stateProviderRef = $stateProvider;
                $urlRouterProviderRef = $urlRouterProvider;

            }])

.run(['$q', '$rootScope', '$http', '$urlRouter','Dynamics', function($q, $rootScope, $http, $urlRouter, Dynamics) {

    $http.get('/layout').
        then(function(response) {
            $rootScope.layout = response.data;
            $rootScope.main_color = $rootScope.layout.main_color;
            $rootScope.logo = $rootScope.layout.logo;
        }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
}])
.run(function ($rootScope, $state, $location, AuthenticationService,$stateParams,$uibModalStack,PermissionStore,RoleStore,RoleData,PermissionData,$auth,Account, $urlRouter,Dynamics) {




       if($auth.isAuthenticated()){

           Account.getProfile().then(function(account){

              var type      = account.user.personal_information['subtype'];
              var userRoles = account.roles;

              //console.log(userRoles);


               var roles = [];
               //getting the roles
               RoleData.query(function(data) {
                   angular.forEach( data , function(value, key) {
                       roles.push(value);
                   });


                    //checking if user has one of these roles..
                   angular.forEach( roles , function(value, key) {
                       RoleStore
                           .defineRole(value.name, function () {
                               return _.contains(userRoles, value.name);
                           });
                   });


                   $urlRouter.sync();
                   $urlRouter.listen();

                   console.log('user');
               });


               var permissions = [];
               //PermissionData.query(function(data) {
               //    angular.forEach( data , function(value, key) {
               //        permissions.push(value);
               //    });
               //
               //    //checking if user has one of these roles..
               //    angular.forEach( permissions , function(value, key) {
               //        RoleStore
               //            .defineRole(value.name, function () {
               //                return  value.name == type
               //            });
               //    });
               //
               //});

               //RoleStore
               //    // Or use your own function/service to validate role
               //    .defineManyRoles({
               //        'jobseeker':function () { return type == 'jobseeker' },
               //        'employer':function ()  { return type == 'employer' },
               //    });
               //PermissionStore
               //    .defineManyPermissions(permissions, function (can_readAcc, transitionProperties) {
               //        res = _.contains(permissions, permissionName);
               //        return res;
               //    });




           });

       }else{
           Dynamics.getDynamics();
           RoleStore
               // Or use your own function/service to validate role
               .defineManyRoles({
                   'guest': [],
               });
           $urlRouter.sync();
           $urlRouter.listen();
           console.log('guest');
       }



    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        //console.log(toParams);
        if (toState.name == 'login' && toParams.type === null){
            event.preventDefault();
            $state.go('welcome');
        }
        //console.log(fromState);
        //console.log(toState);



        if(toState.name != 'login' && fromState != 'login' && !$auth.isAuthenticated()){
            $rootScope.returnToState = toState;
            $rootScope.returnToStateParams = toParams;

            //console.log($rootScope.returnToState);
        }

        if(toState.parent == 'admin'  && toState.name != 'login' && !$auth.isAuthenticated()){
            $rootScope.redirectToAdmin = toState;
            //console.log(toState);
            //console.log( $rootScope.redirectToAdmin);
        }



        //console.log(fromState);
        //console.log(toState);
        var top = $uibModalStack.getTop();
        if (top && toState.parent !=  "jobseeker.findajob.job"  ) {
            $uibModalStack.dismiss(top.key);
        }

    });
})
;