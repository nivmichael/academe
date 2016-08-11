
var $stateProviderRef = null;
var $urlRouterProviderRef = null;

var acadb = angular.module('acadb', [
    'ngRoute',
    'ui.router', 'permission', 'permission.ui',
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
    'dndLists',
    'ui.slider'
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
                        //resolve: {
                        //    redirectToProfileIfLogged:redirectToProfileIfLogged
                        //},
                        data: {
                            permissions: {
                                except: ['jobseeker','employer'],
                                redirectTo: function(rejectedPermission, transitionProperties){

                                    console.log(rejectedPermission);
                                    console.log(transitionProperties);

                                    return {
                                        state: 'login',
                                        params: {
                                            type:rejectedPermission,
                                            //sub_type: transitionProperties.toParams.sub_type,

                                        }
                                    };




                                }
                            }
                        }
                        //data: {
                        //    permissions: {
                        //        except: ['employer','jobseeker'],
                        //        redirectTo: {
                        //            employer:  {
                        //                state: 'employer.portal',
                        //                params: {
                        //                    type: 'employer'
                        //                },
                        //            },
                        //            jobseeker: {
                        //                state: 'jobseeker.profile',
                        //                params: {
                        //                    type: 'jobseeker'
                        //                },
                        //            },
                        //            admin: 'admin.steps',
                        //            default:'login'
                        //        }
                        //    }
                        //}
                    })
                    .state('login', {
                        url: '^/login',
                        params: {type: null,  sub_type : null, redirect: null},
                        resolve: {
                            skipIfLoggedIn: skipIfLoggedIn,
                        },
                        data: {
                            permissions: {
                                except: ['employer','jobseeker','admin'],
                                redirectTo: {
                                    employer: 'employer.portal',
                                    jobseeker: 'jobseeker.profile',
                                    admin: 'admin.steps',
                                    default:'login'
                                }
                            }
                        },
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

                    .state('form', {
                        url: '/signup/:type/:sub_type',
                        resolve: {
                            skipIfLoggedIn: skipIfLoggedIn,
                            redirectToProfileIfLogged:redirectToProfileIfLogged
                        },

                        //params are super important!
                        params: {type: null,  sub_type : null},

                        views:{
                            'navbar@form':{
                                templateUrl: 'partials/forms/registration/jobseeker/form-navbar.html',
                            },
                            'sideNav@form':{
                                templateUrl: 'partials/forms/registration/jobseeker/form-steps-sidenav.html',
                                controller: 'SideNavCtrl',
                            },
                            '':{
                                templateUrl: 'partials/forms/registration/jobseeker/form.html',
                                controller: 'FormCtrl',
                            }
                        }
                    })
                    .state('form.personal_information', {
                        url: '/personal_information',
                        params: {docParam: 'personal_information'},
                        templateUrl: 'partials/forms/registration/registration_forms.html',
                        controller:function($scope, $state, Form){
                            $scope.docParam = $state.current.params.docParam;
                        }
                    })
                    .state('form.education', {
                        resolve: {
                            loginRequired: loginRequired,
                        },
                        url: '/education',
                        params: {docParam: 'education'},
                        templateUrl: 'partials/forms/registration/registration_forms.html',
                        controller:function($scope, $state, Form){
                            $scope.docParam = $state.current.params.docParam;
                        }
                    })
                    .state('form.employment', {
                        resolve: {
                            loginRequired: loginRequired,
                        },
                        url: '/employment',
                        params: {docParam: 'employment'},
                        templateUrl: 'partials/forms/registration/registration_forms.html',
                        controller:function($scope, $state, Form){
                            $scope.docParam = $state.current.params.docParam;
                        }
                    })
                    .state('form.career_goals', {
                        resolve: {
                            loginRequired: loginRequired,
                        },
                        url: '/career_goals',
                        params: {docParam: 'career_goals'},
                        templateUrl: 'partials/forms/registration/registration_forms.html',
                        controller:function($scope, $state, Form){
                            $scope.docParam = $state.current.params.docParam;
                        }
                    })
                    .state('form.files', {
                        resolve: {
                            loginRequired: loginRequired,
                        },
                        url: '/files',
                        params: {docParam: 'files'},
                        templateUrl: 'partials/forms/registration/registration_forms.html',
                        controller:function($scope, $state, Form){
                            $scope.docParam = $state.current.params.docParam;
                        }
                    })
                    .state('form.company', {
                        url: '/company',
                        params: {docParam: 'company'},
                        templateUrl: 'partials/forms/registration/registration_forms.html',
                        controller:function($scope, $state, Form){
                            $scope.docParam = $state.current.params.docParam;
                        }
                    })

                    .state('jobseeker', {
                        url:  '/',
                        abstract:true,
                        sticky: true,
                        deepStateRedirect: true,
                        templateUrl: '../partials/tpl/jobseeker.html',
                        resolve: {
                            loginRequired: loginRequired,
                        },
                        params: {type: null,  sub_type : null},
                        data: {
                            permissions: {
                                only: ['jobseeker'],

                                redirectTo: function(rejectedPermission, transitionProperties){
                                    console.log(rejectedPermission);
                                    console.log(transitionProperties);
                                    //if(rejectedPermission == 'jobseeker') {
                                    //    return 'employer.portal';
                                    //}

                                    //}else{
                                        return {
                                            state: 'login',
                                            params: {
                                                type:transitionProperties.toParams.type,
                                                sub_type: transitionProperties.toParams.sub_type,

                                            }
                                        };
                                    //}



                                }
                            }
                        }
                    })
                    .state('jobseeker.profile', {
                        url:  '^/my_profile',

                        resolve: {
                            loginRequired: loginRequired,
                        },
                        //sticky: true,
                        //deepStateRedirect: true,
                        params: {type: null,  sub_type : null},
                        views:{
                            'profile.nav@jobseeker':{
                                templateUrl: '../partials/tpl/navbar/jobseeker_profile_navbar.html',
                                controller:  'SideNavCtrl as NC',
                            },
                            'profile.sideNav@jobseeker':{
                                templateUrl: '../partials/tpl/sideNav/jobseeker_profile_sideNav.html',
                                controller:  'SideNavCtrl as NC',
                            },
                            'profile@jobseeker': {
                                templateUrl: '../partials/jobseeker/profile.html',
                                controller: 'ProfileCtrl as PC',
                            },
                        }

                    })
                    .state('jobseeker.findajob', {
                        url:  '^/jobs',

                        resolve: {
                            loginRequired: loginRequired,
                        },
                        //sticky: true,
                        //deepStateRedirect: true,
                        params: {type: null,  sub_type : null},
                        views:{
                            'findajob.nav@jobseeker':{
                                templateUrl: '../partials/tpl/navbar/jobseeker_profile_navbar.html',
                                controller:  'SideNavCtrl as NC',
                            },
                            'findajob.sideNav@jobseeker':{
                                templateUrl: '../partials/tpl/sideNav/jobseeker_findajob_sideNav.html',
                                controller:  'SideNavCtrl as NC',
                            },
                            'findajob@jobseeker': {
                                templateUrl: '../partials/jobseeker/findajob.html',
                                controller: 'FindajobController as FJC',
                            },
                        }

                    })
                    .state('jobseeker.findajob.job', {
                        abstract:true,
                        url:  '/:jobId',
                        params: {type: null,  sub_type : null},
                        resolve: {
                            loginRequired: loginRequired,
                        },
                        //sticky: true,
                        deepStateRedirect: true,
                        onEnter: ["$state","JobseekerPost","$stateParams","Account", function($state, JobseekerPost, $stateParams,Account) {
                            modal =  JobseekerPost.openTextEditModal($stateParams.jobId);
                        }],
                        onExit: ["$state","JobseekerPost", function($state,JobseekerPost) {
                            console.log('onExit')
                        }]
                    })
                    .state('general', {
                        url: '/general',
                        parent: 'jobseeker.findajob.job',
                        views: {
                            'job@': {
                                templateUrl: '/partials/job/general.html',
                            }
                        }
                    })
                    .state('the_company', {
                        url: '/the_company',
                        parent: 'jobseeker.findajob.job',
                        views: {
                            'job@': {
                                templateUrl: '/partials/job/company.html'
                            }
                        }
                    })
                    .state('company_video', {
                        url: '/company_video',
                        parent: 'jobseeker.findajob.job',
                        views: {
                            'job@': {
                                templateUrl: '/partials/job/company_video.html'
                            }
                        }
                    })
                    .state('company_site', {
                        url: '/company_site',
                        parent: 'jobseeker.findajob.job',
                        views: {
                            'job@': {
                                templateUrl: '/partials/job/company_site.html'
                            }
                        }
                    })
                    .state('employer', {
                        //
                        resolve: {
                            loginRequired: loginRequired,
                        },
                        abstract:true,
                        //params are extremely important for referer/redirect
                        params: {type: null,  sub_type : null, redirect:null},
                        data: {
                            permissions: {
                                only: ['employer'],
                                redirectTo: function(rejectedPermission, transitionProperties){
                                    console.log(transitionProperties.toParams);
                                    return {
                                        state: 'login',
                                        params: {
                                            type:transitionProperties.toParams.type,
                                            sub_type: transitionProperties.toParams.sub_type,
                                        }
                                    };
                                }
                            }
                        },
                        views:{
                            'navbar@employer':{
                                templateUrl: '../partials/tpl/navbar/employer_company_navbar.html',
                                controller:  'SideNavCtrl as NC'
                            },
                            'sideNav@employer':{
                                templateUrl: '../partials/tpl/sideNav/employer_portal_sideNav.html',
                                controller:  'SideNavCtrl as NC'

                            },
                            '':{
                                templateUrl: '../partials/employer/employer.html',
                                controller: 'CompanyCtrl as PC',
                            }
                        }

                    })
                    .state('employer.portal', {
                        url:  '^/portal',
                        templateUrl: '../partials/employer/portal.html',
                    })
                    .state('employer.jobs', {
                        url:  '^/my_jobs',
                        templateUrl: '../partials/employer/jobs.html',
                    })
                    .state('employer.new_job', {
                        url:  '/new_job',
                        params: {type: null,  sub_type : null},
                        onEnter: ["$state","newJobModalService","$stateParams", function($state, newJobModalService, $stateParams) {
                            console.log('onEnter')
                            modal =  newJobModalService.openTextEditModal();
                        }],
                        onExit: ["$state","newJobModalService", function($state,newJobModalService) {
                            console.log('onExit')
                        }],
                        views:{
                            'modal@employer':{

                            }
                        }

                    })
                    .state('employer.jobs.job', {
                        url:  '/:jobId',

                        params: {type: null,  sub_type : null},
                        onEnter: ["$state","ModalService","$stateParams", function($state, ModalService, $stateParams) {
                            console.log('onEnter')
                            modal =  ModalService.openTextEditModal($stateParams.jobId);
                        }],
                        onExit: ["$state","ModalService", function($state) {
                            console.log('onExit')
                        }],
                    })
                    .state('employer.jobs.matches', {
                        url:  '/:jobId/matches',
                        //sticky: true,
                        params: {type: null,  sub_type : null},
                        onEnter: ["$state","ModalService","$stateParams", function($state, ModalService, $stateParams) {
                            console.log('onEnter matches')
                        }],
                        onExit: ["$state","ModalService", function($state) {
                            console.log('onExit matches')
                        }],
                        views:{
                            '@employer':{
                                templateUrl: '../partials/employer/matches.html',
                                controller: 'MatchesCtrl as MC'
                            },
                        }
                    })
                    .state('employer.jobs.matches.match', {
                        url:  '/:matchUserId',
                        //sticky: true,
                        params: {type: null,  sub_type : null, matchUserId:null},
                        resolve: {
                            userMatch: function (UserData, $stateParams) {
                                return UserData.get({ id: $stateParams.matchUserId });
                            },
                        },
                        views:{
                            '@employer':{
                                templateUrl: '../partials/employer/match.html',
                                controller: 'MatchCtrl as MC'
                            },
                        }
                    })

                    .state('employer.edit', {
                        url: '^/edit',
                        resolve: {
                            loginRequired: loginRequired,
                        },
                        //sticky: true,
                        //deepStateRedirect: true,
                        params: {type: 'employer',  sub_type : null},
                        views:{
                            'nav@employer':{

                                templateUrl: '../partials/tpl/navbar/employer_company_navbar.html',
                                controller:  'SideNavCtrl as NC',
                            },
                            'sideNav@employer':{
                                templateUrl: '../partials/tpl/sideNav/employer_edit.html',
                                controller:  'SideNavCtrl as SNC',
                            },
                            '@employer':{
                                templateUrl: '../partials/tpl/edit.html',
                                controller: 'CompanyCtrl as CC'
                            },

                        }
                    })
                    .state('employer.company_preview', {
                        url: '^/company_preview',
                        resolve: {
                            loginRequired: loginRequired,
                        },
                        sticky: true,
                        deepStateRedirect: true,
                        params: {type: 'employer',  sub_type : null},
                        views:{
                            'company_preview.nav@employer':{

                                templateUrl: '../partials/tpl/navbar/employer_company_navbar.html',
                                controller:  'SideNavCtrl as NC',
                            },
                            'company_preview.sideNav@employer':{
                                templateUrl: '../partials/tpl/sideNav/employer_company_sideNav.html',
                                controller:  'SideNavCtrl as NC',
                            },
                            'company_preview@employer':{
                                templateUrl: '../partials/employer/preview.html',
                                controller: 'CompanyCtrl as PC'
                            },

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
                                                type: transitionProperties.fromParams.type,
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
                    .state('admin.steps', {
                        url:  '^/step_management',
                        resolve: {
                            loginRequired: loginRequired,
                        },
                        //sticky: true,
                        deepStateRedirect: true,
                        params: {type: null,  sub_type : null},
                        views:{
                            'nav@admin':{
                                templateUrl: '../partials/admin/tpl/steps_navbar.html',
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

                    //.state('admin.forms', {
                    //    url:  '^/forms',
                    //    abstract:true,
                    //    resolve: {
                    //        loginRequired: loginRequired,
                    //    },
                    //    params: {type: 'employer',  sub_type : null},
                    //    views:{
                    //        'forms.nav@admin':{
                    //            templateUrl: '../partials/tpl/navbar/employer_company_navbar.html',
                    //            controller:  'SideNavCtrl as NC',
                    //        },
                    //        'forms.sideNav@admin':{
                    //            templateUrl: '../partials/admin/tpl/admin_forms_sideNav.html',
                    //            controller:  'SideNavCtrl as NC',
                    //        },
                    //        'forms@admin': {
                    //            template: '<div ui-view="form"></div>',
                    //            //controller: 'editFormCtrl as EFC',
                    //        },
                    //    }
                    //
                    //})
                    //.state('admin.forms.jobseeker', {
                    //    url:  '/jobseeker',
                    //    resolve: {
                    //        formFor: function(Form,  $timeout){
                    //            return Form.getAdminForm('jobseeker');
                    //        },
                    //        userType: function(){
                    //            return 'jobseeker';
                    //        },
                    //        loginRequired: loginRequired,
                    //    },
                    //    params: {type: 'employer',  sub_type : null},
                    //    deepStateRedirect: true,
                    //    views:{
                    //        'form@admin.forms': {
                    //            templateUrl: '../partials/admin/forms.html',
                    //            controller: 'editFormCtrl as EFC',
                    //        },
                    //    }
                    //
                    //})
                    //.state('admin.forms.employer', {
                    //    url:  '/employer',
                    //    resolve: {
                    //        loginRequired: loginRequired,
                    //        formFor: function(Form , $timeout){
                    //            return Form.getAdminForm('employer');
                    //        },
                    //        userType: function(){
                    //            return 'employer';
                    //        },
                    //    },
                    //
                    //    params: {type: 'employer',  sub_type : null},
                    //    deepStateRedirect: true,
                    //    views:{
                    //        'form@admin.forms': {
                    //            templateUrl: '../partials/admin/forms.html',
                    //            controller: 'editFormCtrl as EFC',
                    //        },
                    //    }
                    //
                    //})
                    //.state('admin.forms.job', {
                    //    url:  '/job',
                    //    resolve: {
                    //        loginRequired: loginRequired,
                    //        formFor: function(Form,  $timeout){
                    //            return Form.getAdminForm('job');
                    //        },
                    //        userType: function(){
                    //            return 'job';
                    //        },
                    //    },
                    //    params: {type: 'employer',  sub_type : null},
                    //    deepStateRedirect: true,
                    //    views:{
                    //        'form@admin.forms': {
                    //            templateUrl: '../partials/admin/forms.html',
                    //            controller: 'editFormCtrl as EFC',
                    //        },
                    //    }
                    //
                    //})

                $urlRouterProvider.otherwise('/');

                function redirectToProfileIfLogged($q, $auth, $injector, $stateParams,$timeout,$location) {
                    var $state = $injector.get('$state');
                    var deferred = $q.defer();
                    if ($auth.isAuthenticated()) {
                        var saved = JSON.parse(localStorage.getItem('user'));
                        $timeout(function() {

                                if (saved.type == 'employer') {
                                    $state.go('employer.portal',{type: $stateParams.type,  sub_type :$stateParams.sub_type, redirect: $location.path()})
                                } else if (saved.type == 'jobseeker') {
                                    $state.go('jobseeker.profile',{type: $stateParams.type,  sub_type :$stateParams.sub_type, redirect: $location.path()})
                                }

                        },1000)
                    } else {
                        deferred.resolve();
                    }
                    return deferred.promise;
                }
                // this is for login only !/?
                function skipIfLoggedIn($q, $auth, $injector,  $stateParams,$timeout,$location) {
                    var $state = $injector.get('$state');
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


                            $state.go('login',{type: $stateParams.type,  sub_type :$stateParams.sub_type, redirect:$location.path()})

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
              var sub_type  = account.user.personal_information['education_status'];
              var userRoles = account.roles;
              console.log(userRoles);


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
                   //RoleStore
                   //    // Or use your own function/service to validate role
                   //    .defineManyRoles({
                   //        'admin':function () { return true },
                   //    });

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





        //PermissionStore
        //    .definePermission('can_read', function () {
        //        return true;
        //    });
        //
        //RoleStore
        //    // Or use your own function/service to validate role
        //    .defineRole('ADMIN', function () {
        //        return true;
        //    });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.name == 'login' && toParams.type === null){
            event.preventDefault();
            $state.go('welcome');
        }

        var top = $uibModalStack.getTop();
        if (top) {
            $uibModalStack.dismiss(top);
        }
    });
})
;