
var $stateProviderRef = null;
var $urlRouterProviderRef = null;

var acadb = angular.module('acadb', [
    'ngRoute',
    'ui.router',
    'ct.ui.router.extras',
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
    'rateYo',
    'ui.bootstrap.modal',
    'ngFileUpload',
    'ngImgCrop',
    'smart-table',
    'wt.responsive',
    'lrDragNDrop',
    'ui.sortable',
    'angular.filter',
    'dndLists'
])


.run(['$rootScope', '$state', '$stateParams','$http', function($rootScope, $state, $stateParams,$http) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        acadb.theme = 'bs3';
            console.log( acadb.theme);
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
      $urlRouterProvider.otherwise("/");

        var modal;
        $stateProvider

            .state('welcome', {
                url: '/',
                views:{
                    'main':{
                        templateUrl: '../partials/tpl/welcome.html',
                    },
                    'footer':{
                        templateUrl: '../partials/tpl/footer.html'
                    }
                }
            })
            .state('login', {
                url: '^/login',
                params: {type: null,  sub_type : null},
                resolve: {
                    skipIfLoggedIn: skipIfLoggedIn,
                },
                views:{
                    'main':{
                        templateUrl: '../partials/tpl/login.html',
                        controller: 'LoginCtrl',

                    },
                    'footer':{
                        templateUrl: '../partials/tpl/footer.html'
                    }
                }
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
                    'main':{
                        templateUrl: '../partials/tpl/password_mail.html',
                        controller: 'PasswordCtrl'
                    },
                    'footer':{
                        templateUrl: '../partials/tpl/footer.html'
                    }
                }
            })
            .state('password_reset', {
                url: '^/reset/:token',
                resolve: {
                    isTokenValid: isTokenValid,
                },
                views:{
                    'main':{
                        templateUrl: '../partials/tpl/password_reset.html',
                        controller: 'PasswordCtrl'
                    },
                    'footer':{
                        templateUrl: '../partials/tpl/footer.html'
                    }
                }
            })
            .state('register', {
                url: '^/register',
                abstract:true,
                //sticky: true,
                //deepStateRedirect: true,
                resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                },
                params: {type: null,  sub_type : null},
                views:{
                    'nav':{
                        templateUrl: '../partials/tpl/navbar/jobseeker_register_steps_navbar.html',
                    },
                    'sideNav':{
                        templateUrl: '../partials/tpl/sideNav/jobseeker_register_steps_sideNav.html',
                        controller:  'SideNavController',
                    },
                    'main':{
                        template: "<div ui-view='main'></div>",
                        controller:  'SignupCtrl',

                    },
                    'footer':{
                        templateUrl: '../partials/tpl/footer.html'
                    }
                }
            })
            .state('jobseeker', {
                url:  '/',
                abstract:true,
               // sticky: true,
                deepStateRedirect: true,
                templateUrl: '../partials/tpl/jobseeker.html',
                resolve: {
                    loginRequired: loginRequired,
                },
                params: {type: null,  sub_type : null},

            })
            .state('jobseeker.profile', {
                url:  '^/my_profile',

                resolve: {
                    loginRequired: loginRequired,
                },
                sticky: true,
                deepStateRedirect: true,
                params: {type: null,  sub_type : null},
                views:{
                    'profile.nav@jobseeker':{
                        templateUrl: '../partials/tpl/navbar/jobseeker_profile_navbar.html',
                        controller:  'SideNavController as NC',
                    },
                    'profile.sideNav@jobseeker':{
                        templateUrl: '../partials/tpl/sideNav/jobseeker_profile_sideNav.html',
                        controller:  'SideNavController as NC',
                    },
                    'profile@jobseeker': {
                        templateUrl: '../partials/tpl/profile.html',
                        controller: 'ProfileCtrl as PC',
                    },
                }

            })
            .state('jobseeker.findajob', {
                url:  '^/jobs',
                resolve: {
                    loginRequired: loginRequired,
                },
                sticky: true,
                deepStateRedirect: true,
                //params: {type: null,  sub_type : null},
                views:{
                    'findajob.nav@jobseeker':{
                        templateUrl: '../partials/tpl/navbar/jobseeker_profile_navbar.html',
                        controller:  'SideNavController as NC',
                    },
                    'findajob.sideNav@jobseeker':{
                        templateUrl: '../partials/tpl/sideNav/jobseeker_profile_sideNav.html',
                        controller:  'SideNavController as NC',
                    },
                    'findajob@jobseeker': {
                        templateUrl: '../partials/tpl/findajob.html',
                        controller: 'FindajobController as FJC',
                    },
                }

            })
            .state('employer', {
                resolve: {
                    loginRequired: loginRequired,
                },
               // sticky: true,
                abstract:true,
                deepStateRedirect: true,
                params: {type: null,  sub_type : null},
                templateUrl: '../partials/tpl/employer.html',

            })
            .state('employer.company', {
                url:  '^/my_company',
                resolve: {
                    loginRequired: loginRequired,
                },
                //sticky: true,
                //deepStateRedirect: true,
                params: {type: null,  sub_type : null},
                views:{
                    'company.nav@employer':{
                        templateUrl: '../partials/tpl/navbar/employer_company_navbar.html',
                        controller:  'SideNavController as NC',
                    },
                    'company.sideNav@employer':{
                        templateUrl: '../partials/tpl/sideNav/employer_company_sideNav.html',
                        controller:  'SideNavController as NC',
                    },
                    'company@employer': {
                        templateUrl: '../partials/tpl/jobs.html',
                        controller: 'CompanyCtrl as PC',
                    },
                }

            })


            .state('employer.company.job', {

                url:  '/:jobId',
                params: {type: null,  sub_type : null},
                resolve: {
                    loginRequired: loginRequired,

                },
                //sticky: true,
                deepStateRedirect: true,
                onEnter: ["$state","ModalService","$stateParams", function($state, ModalService, $stateParams) {
                    modal =  ModalService.openTextEditModal($stateParams.jobId);
                }],
                onExit: ["$state","ModalService", function($state) {

                }],

                views:{
                    'company.nav@employer':{
                        templateUrl: '../partials/tpl/navbar/employer_company_navbar.html',
                        controller:  'SideNavController as NC',
                    },
                    'company.sideNav@employer':{
                        templateUrl: '../partials/tpl/sideNav/employer_company_sideNav.html',
                        controller:  'SideNavController as NC',
                    },
                    //'company@employer': {
                    //    templateUrl: '../partials/tpl/jobs.html',
                    //    controller: 'CompanyCtrl as PC',
                    //},
                }

            })

            .state('employer.edit', {
                url: '^/edit',
                resolve: {
                    loginRequired: loginRequired,
                },
                sticky: true,
                deepStateRedirect: true,
                //params: {type: null,  sub_type : null},
                views:{
                    'edit.nav@employer':{

                        templateUrl: '../partials/tpl/navbar/employer_company_navbar.html',
                        controller:  'SideNavController as NC',
                    },
                    'edit.sideNav@employer':{
                        templateUrl: '../partials/tpl/sideNav/employer_company_sideNav.html',
                        controller:  'SideNavController as NC',
                    },
                    'edit@employer':{
                        templateUrl: '../partials/tpl/edit.html',
                        controller: 'CompanyCtrl as PC'
                    },

                }
            })
            .state('employer.postajob', {
                url: '^/new_job',
                resolve: {
                    loginRequired: loginRequired,
                },
                //sticky: true,
                deepStateRedirect: true,
                //params: {type: null,  sub_type : null},
                views:{
                    'postajob.nav@employer':{

                        templateUrl: '../partials/tpl/navbar/employer_company_navbar.html',
                        controller:  'SideNavController as NC',
                    },
                    'postajob.sideNav@employer':{
                        templateUrl: '../partials/tpl/sideNav/employer_company_sideNav.html',
                        controller:  'SideNavController as NC',
                    },
                    'postajob@employer':{
                        templateUrl: '../partials/tpl/jobPost.html',
                        controller: 'PostCtrl as PC'
                    },

                }
            })
            .state('admin', {
                url:  '/',
                resolve: {
                    loginRequired: loginRequired,
                },
                // sticky: true,
                abstract:true,
                deepStateRedirect: true,
                params: {type: null,  sub_type : null},
                templateUrl: '../partials/admin/admin.html',
            })
            .state('admin.manager', {
                url:  '^/manager',
                resolve: {
                    loginRequired: loginRequired,
                },
                sticky: true,
                deepStateRedirect: true,
                //params: {type: null,  sub_type : null},
                views:{
                    'manager.nav@admin':{
                        templateUrl: '../partials/admin/tpl/steps_navbar.html',
                        controller:  'SideNavController as NC',
                    },
                    'manager.sideNav@admin':{
                        templateUrl: '../partials/admin/tpl/admin_tables_sideNav.html',
                        controller:  'SideNavController as NC',
                    },
                    'manager@admin': {
                        templateUrl: '../partials/admin/manager.html',
                        controller: 'ManagerCtrl as MC',
                    },
                }

            })
            .state('admin.steps', {
                url:  '^/step_management',
                resolve: {
                    loginRequired: loginRequired,
                },
                sticky: true,
                deepStateRedirect: true,
                //params: {type: null,  sub_type : null},
                views:{
                    'steps.nav@admin':{
                        templateUrl: '../partials/admin/tpl/steps_navbar.html',
                        controller:  'SideNavController as NC',
                    },
                    'steps.sideNav@admin':{
                        templateUrl: '../partials/admin/tpl/steps_sideNav.html',
                        controller:  'SideNavController as NC',
                    },
                    'steps@admin': {
                        templateUrl: '../partials/admin/steps_management.html',
                        controller: 'StepManagerCtrl as SMC',
                    },
                }

            })
            .state('admin.forms', {
                url:  '^/forms',
                abstract:true,
                resolve: {
                    loginRequired: loginRequired,
                },
                sticky: true,
                //deepStateRedirect: true,
                //params: {type: null,  sub_type : null},
                views:{
                    'forms.nav@admin':{
                        templateUrl: '../partials/admin/tpl/steps_navbar.html',
                        controller:  'SideNavController as NC',
                    },
                    'forms.sideNav@admin':{
                        templateUrl: '../partials/admin/tpl/admin_forms_sideNav.html',
                        controller:  'SideNavController as NC',
                    },
                    'forms@admin': {
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
                    loginRequired: loginRequired,
                },
                sticky: true,
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
                },

                sticky: true,
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
                },
                sticky: true,
                deepStateRedirect: true,
                views:{
                    'form@admin.forms': {
                        templateUrl: '../partials/admin/forms.html',
                        controller: 'editFormCtrl as EFC',
                    },
                }

            })

            function skipIfLoggedIn($q, $auth) {
                var deferred = $q.defer();
                if ($auth.isAuthenticated()) {
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





.run(['$q', '$rootScope', '$http', '$urlRouter', function($q, $rootScope, $http, $urlRouter) {
    var stateList = [];
    var $state = $rootScope.$state;
    //$rootScope.steps = {
    //    jobseeker_steps: {},
    //    employer_steps:  {},
    //};
    /*
     * this func here gets the docParam steps for registration.
     *
     * stateList is for the ui router
     * steps is for the navbar in the view
     *
     * */
    $http
        .get("api/jobseekerSteps")
        .success(function(data) {

            angular.forEach(data, function(value, key) {

                var step = {
                    "name":"register."+value.name,
                    "url": '^/'+value.name,
                    "templateUrl":'../../partials/tpl/registration_forms.html',
                    //"controller":'formController as FC',
                    "value":value.name,
                    "belongsTo": 'jobseeker',
                    "position": value.position

                }
                stateList.push(step);


            });
            //console.log(stateList);
            /*asigning the steps*/
            $rootScope.steps = stateList;
            /*prepending personal information to steps*/
            //$rootScope.steps.unshift({name:'register.personal_information',value:'personal_information', "belongsTo": 'jobseeker'});


            angular.forEach(stateList, function(value, key) {

                var getExistingState = $state.get(value.name);
                if(getExistingState !== null){

                    return;
                }

                var state = {
                    "name":"register."+value.name,
                    "url": '^/'+value.value,
                   // sticky: true,
                    deepStateRedirect: true,
                    "reloadOnSearch": false,
                    params: {type: null,  sub_type : null, doc:value.value },
                    resolve:{
                        docParam: function(){
                            return {docParam: value.value};
                        }
                    },

                    views:{
                        'nav':{
                            templateUrl: '../partials/tpl/navbar/jobseeker_register_steps_navbar.html',
                        },
                        'sideNav':{
                            templateUrl: '../partials/tpl/sideNav/jobseeker_register_steps_sideNav.html',
                            controller:  'SideNavController',
                        },
                        'main@register':{
                            "templateUrl":'../../partials/tpl/signup.html'  ,
                            "controller":function($scope, docParam, Form, $stateParams){
                               //this is for the ng-repeat in the html example: "(docParamName, iteration) in user[docParam]".
                               $scope.docParam = docParam.docParam;
                               //$scope.next_keys = Form.next_form();
                               $scope.nextDoc  = Form.nextDoc();
                            }
                        },
                        'footer':{
                            templateUrl: '../partials/tpl/footer.html'
                        }
                    }



                };
                $stateProviderRef.state(value.name, state);

            });


            $http
                .get("api/employerSteps")
                .success(function(data) {

                    angular.forEach(data, function(value, key) {

                        var step = {
                            "name":"register."+value.name,
                            "url": '^/'+value.name,
                            "templateUrl":'../../partials/tpl/employer_registration_forms.html'  ,
                            //"controller":'formController',
                            "value":value.name,
                            "belongsTo": 'employer'

                        }

                        stateList.push(step);
                        // console.log(stateList);
                    });

                    // $rootScope.steps = stateList;
                    //$rootScope.steps.unshift({name:'register.personal_information',value:'personal_information'});


                    angular.forEach(stateList, function(value, key) {


                        var getExistingState = $state.get(value.name);

                        if(getExistingState !== null){

                            return;
                        }

                        var state = {
                            "name":"register."+value.name,
                            "url": '^/'+value.value,
                            sticky: true,
                            deepStateRedirect: true,
                            "reloadOnSearch": false,
                            params: {type: null,  sub_type : null , doc:value.value},
                            resolve:{
                                docParam: function(){
                                    return {docParam: value.value};
                                }
                            },

                            views:{
                                'nav':{
                                    templateUrl: '../partials/tpl/navbar/jobseeker_register_steps_navbar.html',
                                },
                                'sideNav':{
                                    templateUrl: '../partials/tpl/sideNav/jobseeker_register_steps_sideNav.html',
                                    controller:  'SideNavController',
                                },
                                'main@register':{
                                    "templateUrl":'../../partials/tpl/employer_registration_forms.html'  ,
                                    "controller":function($scope, docParam, Form){
                                        $scope.docParam = docParam.docParam;
                                        $scope.nextDoc  = Form.nextDoc();
                                    }
                                },
                                'footer':{
                                    templateUrl: '../partials/tpl/footer.html'
                                }
                            }

                        };

                        //angular.forEach(value.views, function(view) {
                        //  state.views[view.name] = {
                        //    templateUrl: view.templateUrl,
                        //  	controller: view.controller,
                        //  };
                        //});

                        $stateProviderRef.state(value.name, state);
                    });

                    // Configures $urlRouter's listener *after* your custom listener
                    // console.log($stateProviderRef);
                });
        });

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
.run(function ($rootScope, $state, $location, AuthenticationService,$stateParams,$uibModalStack) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.name === 'login' && toParams.type === null){
            event.preventDefault();
            $state.go('welcome');
        }

        var top = $uibModalStack.getTop();
        if (top) {
            $uibModalStack.dismiss(top.key);
        }

    });
})
;