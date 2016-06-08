'use strict';
angular.module('acadb')
  .controller('CompanyCtrl', function($scope, $auth, Account, $http, $uibModal, $rootScope, $filter, Form, $stateParams,$log, ModalService, PostData) {

        console.log($stateParams);
        //$scope.initModals = function() {
        //
        //    $('.modal-trigger').leanModal({
        //        complete: function () {
        //            $('.lean-overlay').remove();
        //        }
        //    }); // Initialize the modals
        //    //$('#modal1').openModal();
        //}
        $scope.reverse = true;
        $scope.orderByFilter = 'match';
        $scope.$on('handleBroadcast', function(event, user) {
            $scope.allJobs.push(user);

            console.log(user);

        });

        $scope.getProfile = function() {
            Account.getProfile()
                .then(function(response) {
                    $scope.user  = response.user;
                    $scope.allJobs = response.posts;
                    $scope.status  = $scope.user.personal_information.status;
                })
                .catch(function(response) {
                    //toastr.error(response.data.message, response.status);
                });
        };
        $scope.save = function() {
            $scope.sent=true;
            Account.updateProfile($scope.user);
        };


            $scope.getPost = function(id){
                console.log(id);
                $http.get('api/job/'+id ).
                    success(function(data, status, headers, config) {
                        $scope.jobPost = data;
                        console.log($scope.post);
                        //$state.go(
                        //    'employer.company.job',
                        //    {
                        //        jobId:id,
                        //    } // this goes into $stateParams for
                        //    // state 'some'
                        //);
                        //console.log($state);

                    }).
                    error(function(data, status, headers, config) {

                    });
            };


        $scope.getProfile();

        $scope.openModal = ModalService.openTextEditModal;


    })
