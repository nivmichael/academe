angular.module('acadb.services.jobseekerJobModal', [])
    .value('version', '0.1')
    .factory('JobseekerPost', function($uibModal, $state, $http, $stateParams, Account, Form, PostData, $q, $rootScope) {
        var allPosts = [];
        var userObj;

        return {
            openTextEditModal: function(id) {

                var modalInstance = $uibModal.open({
                    templateUrl: '../partials/jobseeker/job.html',
                    backdrop: 'static',
                    controller: function($scope, $uibModalInstance, $sce, data, $http, $stateParams, An_applyData, An_openFileData, Account) {

                        if( _.contains( data.user.posts.applied , data.post['postInfo']['id']) ){
                            $scope.applied = true;
                        }

                        $scope.jobPost  = data.post;
                        $scope.formData = data.formData;
                        $scope.postedBy = data.post['postInfo']['user_id'];
                        $scope.user     = data.user.user['personal_information'];
                        $scope.user_id  = data.user.user['personal_information']['id'];



                        Form.getAllOptionValues().then(function(options){
                            $scope.groups = options.data;
                        });
                        //An_openFileData.save(
                        //    {post:post.post, user:user.user}
                        //);
                        $scope.close = function() {
                            $uibModalInstance.dismiss('cancel');
                            $state.go('jobseeker.findajob');
                        };
                        $scope.ok = function() {
                            $uibModalInstance.dismiss('cancel');
                            $state.go('jobseeker.findajob');
                        };

                        $scope.applyForJob = function() {
                            //$scope.user    = data.user['personal_information'];
                            //$scope.user_id = data.user['personal_information']['id'];

                            //this is a sysParamValue(s) -consider using resource?!
                            $http.post('api/job/apply/' + id, {user_id: $scope.user_id}).then(function(response){
                                $scope.applied = true;
                                //update user account so filter has updated labeled posts id's
                                Account.updateProfile(data.user.user);
                                $rootScope.$broadcast('handleLabel', id, 'applied');
                                return response.data;
                            });
                            //this is an_apply using an apply resource
                            An_applyData.save({user:$scope.user, post_id:id, postedBy:$scope.postedBy});

                        };
                        $scope.unApply = function() {
                            //remove from db
                            $http.post('api/job/unApply/' + id, {user_id: $scope.user_id , docSubType: 'jobseeker'}).then(function(response){
                                $scope.applied = false;
                                //recover post
                                Account.updateProfile(data.user.user);
                                $rootScope.$broadcast('handleRemovedLabel', id, 'applied');
                                //$rootScope.$broadcast('addToPostList',  $scope.jobPost);
                                return response.data;
                            });
                            $scope.applied = false
                        }
                    },
                    size: 'lg',
                    resolve: {
                        //data: function() {
                        //            return $q.when(Account.getProfile()
                        //        .then(function(user) {
                        //            return $q.when( { post: PostData.get({id:id}), user: user } )
                        //        })
                        //        .then(function(data) {
                        //            return $q.when(data);
                        //        })
                        //    )
                        //},
                        //post: function() {
                        //    return $q.when('string 1');
                        //},
                        data: function() {
                            return $q.when(Account.getProfile()
                                .then(function(user) {

                                        postFunction = PostData.get({id:id}).$promise.then(function(post){
                                            var formData = {};
                                            formData.general = [];
                                            angular.forEach(post['general'][0], function(value, key) {
                                                if(key != 'docParamId') formData.general[value.paramName] = value.paramValue;
                                            });

                                            return $q.when( {post:post,formData:formData, user:user} );
                                        })


                                        return $q.when( postFunction )

                                }))
                        },
                        //test: [function(){
                        //      return $q.when('dorEsolved');
                        //}],
                        //test2: ['test',function(test){
                        //    console.log(test);
                        //}],
                        // post should use PostData Resource but cant get this to work..using a simple http instead..
                        //post: function($http) {
                        //	var post = $http.get('api/job/'+ id ).then(function(response){
                        //		return response.data;
                        //	})
                        //	return post;
                        //},
                        //post: function() {
                        //
                        //    if(!allPosts[id]){
                        //        allPosts[id] = PostData.get({id:id}).$promise.then(function(post){
                        //            var formData = {};
                        //            formData.general = [];
                        //            angular.forEach(post['general'][0], function(value, key) {
                        //                if(key != 'docParamId') formData.general[value.paramName] = value.paramValue;
                        //            });
                        //
                        //            return $q.when( {post:post,formData:formData} );
                        //        })
                        //
                        //    }
                        //    return $q.when( allPosts[id])
                        //},
                        //user:function(){
                        //
                        //        return Account.getProfile()
                        //
                        //},

                        //post: function() {
                        //
                        //    if(!allPosts[id]){
                        //        allPosts[id] = PostData.get({id:id}).$promise.then(function(post){
                        //            return $q.when( post );
                        //        })
                        //
                        //    }
                        //    return $q.when( allPosts[id])
                        //},



                    }
                });

            },
            close:function(){
                $uibModal.close();
            }
        };
    })
//$http.get('/isApplied', {user_id: user}).then(function(res){
//    return $q.when(user);
//})