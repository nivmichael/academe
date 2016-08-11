'use strict';
angular.module('acadb')
  .controller('CompanyCtrl', function($scope, $auth, Account, $http, $uibModal, $rootScope, $filter, Form, $stateParams,$log, ModalService, PostData,$location, Job) {



        $scope.reverse = true;
        $scope.orderByFilter = 'match';
        //this is the former attempt to broadcast a new job to the all jobs array
        //$scope.$on('handleBroadcast', function(event, user) {
        //    $scope.allJobs.push(user);
        //});

        //new post
        $scope.$on('newPost', function(event, post) {
            $scope.allJobs.push(post);
        });
        //edit/updated post
        $scope.$on('updatedPost', function(event, post) {
            /*
            need to update system matches too
             */
            console.log('updatedPost');
            console.log(post)
            angular.forEach($scope.allJobs, function(value, key) {
                if(value.postInfo.id == post.id){
                    console.log(post);
                    console.log($scope.allJobs[key]);
                    $scope.allJobs[key].postInfo = post;
                }
            });
        });
        $scope.groups = {};
        $scope.loadGroups = function() {
            Form.getAllOptionValues().then(function (options) {
                $scope.groups = options.data;
            });
        };
        Job.getJobs().then(function(posts){
            $scope.allJobs = posts;
        });
        $scope.formData = {};
        $scope.getProfile = function() {
            Account.getProfile()
                .then(function(response) {
                    $scope.user  = response.user;
                    //$scope.allJobs = response.posts;
                    $scope.status  = $scope.user.personal_information.status;
                            var formData = [];
                            angular.forEach($scope.user['personal_information'][0], function(value, key) {
                                if(key != 'docParamId') $scope.formData[value.paramName] = value.paramValue;
                            });
                            angular.forEach($scope.user['company'][0], function(value, key) {
                                if(key != 'docParamId') $scope.formData[value.paramName] = value.paramValue;
                            });
                            //$scope.formData = formData;
                            //console.log($scope.formData);
                })
                .catch(function(response) {
                    //toastr.error(response.data.message, response.status);
                });
        };
        $scope.reformat = function() {
            angular.forEach($scope.user.personal_information[0], function (value, key) {
                var has = _.has($scope.formData, value.paramName);
                if (has) {
                    $scope.user.personal_information[0][value.paramId].paramValue = $scope.formData[value.paramName];
                }
            })
            angular.forEach( $scope.user.company[0], function(value, key) {
                var has = _.has($scope.formData, value.paramName);
                if (has){
                    $scope.user.company[0][value.paramId].paramValue = $scope.formData[value.paramName];
                }
            })
        };
        $scope.save = function() {
            $scope.reformat();
            //console.log($scope.formData);
            //console.log($scope.user);
            $scope.sent=true;
            Account.updateProfile($scope.user);
        };


            //$scope.getPost = function(id){
            //    console.log(id);
            //    $http.get('api/job/'+id ).
            //        success(function(data, status, headers, config) {
            //            $scope.jobPost = data;
            //            console.log($scope.post);
            //            //$state.go(
            //            //    'employer.company.job',
            //            //    {
            //            //        jobId:id,
            //            //    } // this goes into $stateParams for
            //            //    // state 'some'
            //            //);
            //            //console.log($state);
            //
            //        }).
            //        error(function(data, status, headers, config) {
            //
            //        });
            //};

        $scope.loadGroups();
        $scope.getProfile();

        $scope.openModal = ModalService.openTextEditModal;


    })
