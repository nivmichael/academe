angular.module('acadb.services.employerJobModal', [])
    .value('version', '0.1')
    .factory('ModalService', function($uibModal, $state, $http, $stateParams, Account, Form, PostData, $q) {
        var allPosts = [];
        return {
            openTextEditModal: function(id) {

                var modalInstance = $uibModal.open({
                    templateUrl: '../partials/employer/job.html',
                    backdrop: 'static',
                    controller: function($scope, $uibModalInstance, $sce, post, form, $http, $stateParams,An_searchData,options,$rootScope) {

                        $scope.jobPost  = post.post;
                        $scope.formData = post.formData;
                        $scope.groups   = options.data;

                        //whats going on here?
                        //witch is var user and wich is scope user?
                        Account.getProfile().then(function(data) {
                            $scope.user = data.user;
                        });
                        var user = post['postInfo'];

                        $scope.set_an_search = function(){
                            An_searchData.save({user:$scope.user,post_id:id});
                        };

                        $scope.close = function() {
                            $uibModalInstance.dismiss('cancel');
                            $state.go('employer.jobs');
                        };
                        $scope.save = function() {
                            $uibModalInstance.close();
                            $state.go('^');
                        };

                        //ToDo: add this to Form service or filter
                        $scope.reformat = function(){

                            angular.forEach( $scope.jobPost.general[0], function(value, key) {
                                if($scope.formData['general']) {
                                    var has = _.has($scope.formData['general'], value.paramName);
                                    if (has) {

                                        $scope.jobPost.general[0][value.paramId].paramValue = $scope.formData['general'][value.paramName];
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

                        $scope.validatePost = function() {
                            //returning a string will prevent closing of editable state;
                            $scope.reformat();
                            var errors;
                            return $http.post('api/validatePost', {post:$scope.jobPost, post_id:id}).then(function(response) {
                                $scope.savePost();
                                return errors = undefined;;
                            }, function(err) {
                                angular.forEach(err.data, function(value, key) {
                                    $scope.editableForm.$setError(key, value[0]);
                                });
                                $scope.errors = err.data;
                                return errors = 'error';
                            });
                        };

                        $scope.savePost = function() {

                            PostData.save( {post:$scope.jobPost, post_id:id} ).$promise
                                .then(function(res) {
                                    $rootScope.$broadcast('updatedPost', res);
                                    //$state.go('employer.jobs');
                                }, function(err) {
                                    $scope.errors = err.data;
                                })
                                .catch(function(err) {
                                    $scope.errors = err.data;
                                })
                        };

                        $scope.add = function(docParam,$index) {
                            $scope.inserted = angular.copy(form.data[docParam][0]);
                            $scope.jobPost[docParam].push($scope.inserted);
                        };

                        $scope.move = function(array, fromIndex, toIndex){
                            array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] )
                        };

                        $scope.remove = function(array,doc_type,index) {
                            Form.remove(array,doc_type,index,id);
                            array.splice(index,1);
                        };
                    },
                    size: 'lg',
                    resolve: {
                        post: function() {

                            if(!allPosts[id]){
                                allPosts[id] = PostData.get({id:id}).$promise.then(function(post){
                                    var formData = {};
                                    formData.general = [];
                                    angular.forEach(post['general'][0], function(value, key) {
                                        if(key != 'docParamId') formData.general[value.paramName] = value.paramValue;
                                    });

                                    return $q.when( {post:post,formData:formData} );
                                })

                            }
                            return $q.when( allPosts[id])
                        },
                        //form is for `add()` to insert new iteration
                        form:function(){
                            return Form.getForm('job');
                        },
                        options: function(){
                            return Form.getAllOptionValues();

                        }
                        //post: function($http) {
                        //
                        //	if(!allPosts[id]){
                        //		allPosts[id] = $http.get('api/job/'+ id ).then(function(response){
                        //				return response.data;
                        //			})
                        //	}
                        //	return	allPosts[id];
                        //}
                    }
                });

            },
            close:function(){
                $uibModal.close();
            }
        };
    })
