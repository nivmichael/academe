angular.module('acadb.services.newJobModal', [])
    .value('version', '0.1')
    /*--------------------------------------------------------------------------------------------------\
     |                                                                                                  |
     |  new job controller                                                                              |
     |  ===================                                                                             |
     |  this is the new job modal service.                                                              |
     |  i really should seperate the whole controller and just reference it the regular way..           |
     |  we resolve the form using `Form` service.                                                       |
     |  we have all the form functions using `Form` service.                                            |
     |  we save the job using `PostData` resource service                                               |
     |                                                                                                  |
     --------------------------------------------------------------------------------------------------*/

    .factory('newJobModalService', function($uibModal, $state, $http, $stateParams, Account, Form, PostData) {

        return {
            openTextEditModal: function(id) {

                var modalInstance = $uibModal.open({
                    templateUrl: '../partials/employer/newJob.html',
                    backdrop: 'static',
                    controller: function($scope, $uibModalInstance, $sce, $http, $stateParams, form, $rootScope) {
                        $scope.formData= {};
                        $scope.form    = angular.copy(form.data);
                        $scope.jobPost = angular.copy(form.data);

                        Form.getAllOptionValues().then(function(options){
                            $scope.groups = options.data;
                        });

                        $scope.add = function(docParam,$index) {
                            $scope.inserted = angular.copy($scope.jobPost[docParam][0]);
                            $scope.form[docParam].push($scope.inserted);
                        };

                        $scope.move = function(array, fromIndex, toIndex){
                            array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] )
                        };

                        $scope.remove = function(array,docParamName,index) {
                            array.splice(index,1);
                        };

                        $scope.close = function() {
                            $uibModalInstance.dismiss('cancel');
                            $state.go('employer.jobs');
                        };

                        $scope.ok = function() {
                            $uibModalInstance.dismiss('cancel');
                            $state.go('employer.jobs');
                        };
                        $scope.reformat = function(){

                            angular.forEach( $scope.form.general[0], function(value, key) {
                                if($scope.formData['general']) {
                                    var has = _.has($scope.formData['general'], value.paramName);
                                    if (has) {

                                        $scope.form.general[0][value.paramId].paramValue = $scope.formData['general'][value.paramName];
                                        //date exeption
                                        if (value.inputType == 'date' && value.paramName != 'date_of_birth') {
                                            value.paramValue = date($scope.formData.date_of_birth.month, $scope.formData.date_of_birth.year);
                                        }
                                    } else {
                                        //console.log('');
                                    }
                                }
                            })
                        };
                        $scope.savePost = function() {

                            $scope.reformat();

                            PostData.save( {post:$scope.form} ).$promise
                                .then(function(res) {
                                    $rootScope.$broadcast('newPost', res);
                                    $uibModalInstance.dismiss('saved');
                                    $state.go('employer.jobs.job',{jobId:res.id});
                                })
                                .catch(function(err) {
                                    $scope.errors = err.data;
                                    //Account.broadcast(err.data);
                                })
                        };
                        $scope.proccessForm = function(){
                            $scope.reformat();
                            $scope.sent  = true;
                            $scope.savePost();
                        };
                    },
                    size: 'lg',
                    resolve: {
                        form:function(){
                            return Form.getForm('job');
                        }
                    }
                });

            },
            close:function(){
                $uibModal.close();
            }
        };
    })