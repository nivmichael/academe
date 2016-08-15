


angular.module('acadb.services', ['acadb.services.resources','acadb.services.form','acadb.services.account','acadb.services.jobseekerJobModal','acadb.services.newJobModal','acadb.services.employerJobModal','acadb.services.dynamics','acadb.services.RolesAndPermissions','acadb.services.job']).
  value('version', '0.1')



.factory('labelFilterData', function($http, $q, $rootScope, $stateParams, Account, $filter, Job ) {
	var filter;
	var labelsCount = [];
	var posts;

	return {
		getFilterLabel: function(){
			if(!filter){
				filter = $stateParams.labeled;
			}
			return filter;
			//return $q.when(filter);
		},
		setFilterLabel: function(label){

			filter = label;
			return filter;
			//return $q.when(filter);
		},
		getLabelCount: function(){

			Account.getProfile().then(function(user){
				posts = user.posts;
				//console.log(posts);

				angular.forEach(posts, function(value, key) {
					console.log(posts.index)
					labelsCount[key] = value.length;
				});

				//console.log(posts);
				//console.log(labelsCount);
			});
			return labelsCount;
		},
		broadcast: function(){
			$rootScope.$broadcast('filter', filter);
		}



	};

})



.factory('colorpicker', function() {
	function hexFromRGB(r, g, b) {
		var hex = [r.toString(16), g.toString(16), b.toString(16)];
		angular.forEach(hex, function(value, key) {
			if (value.length === 1)
				hex[key] = "0" + value;
		});
		return hex.join('').toUpperCase();
	}
	return {
		refreshSwatch: function(r, g, b) {
			var color = '#' + hexFromRGB(r, g, b);
			angular.element('#swatch').css('background-color', color);
		}
	};
})
.factory('Tables', function($http, TableData, $q, $rootScope ) {
		var tables = [];
		var table_name;

		return {
			getTable: function(table){
				table_name = table;
				var defer= $q.defer();

				if ( !tables[table] ) {
					tables[table] = TableData.list({table:table});
					defer.resolve(tables[table]);
				}else if(tables[table]){
					defer.resolve(tables[table]);
				}else{
					defer.reject();
				}

				return defer.promise;
			},
			broadcast: function(tables) {
				console.log(tables);
				$rootScope.$broadcast('table', tables, table_name);
			},

		};

	})
.factory('Steps', function($http, $rootScope ) {

		var steps;
		return {
			getAllSteps: function() {
				if ( !steps ) {
					// $http returns a promise, which has a then function, which also returns a promise
					steps = $http.get('api/steps').then(function (response) {
						// The then function here is an opportunity to modify the response

						// The return value gets picked up by the then in the controller.
						return response.data;
					});
				}
				// Return the promise to the controller
				return steps;
			}

		};

	})



.factory('verifyToken', function($http) {
		return {
			verify: function(stateParams){
				console.log('verifyToken');
				var verify = $http.post('verifyToken',{token:token});
					verify.success()
					verify.error()
			}
		};
	})
.factory("FlashService", function($rootScope) {
		return {
			show: function(message) {
				$rootScope.flash = message;
			},
			clear: function() {
				$rootScope.flash = "";
			}
		};
	})

.factory("SessionService", function() {
		return {
			get: function(key) {
				return sessionStorage.getItem(key);
			},
			set: function(key, val) {
				return sessionStorage.setItem(key, val);
			},
			unset: function(key) {
				return sessionStorage.removeItem(key);
			}
		};
	})

	.factory("AuthenticationService", function($http, $q, $timeout, $sanitize, SessionService, FlashService, CSRF_TOKEN ) {
		var _identity = undefined, _authenticated = false;

		var cacheSession   = function() {
			SessionService.set('authenticated', true);
		};

		var uncacheSession = function() {
			SessionService.unset('authenticated');
		};

		var loginError = function(response) {
			FlashService.show(response.flash);
		};
		/* not sure this sanitation is necessary, but it d'oesnt hurt*/
		var sanitizeCredentials = function(credentials) {
			return {
				email: $sanitize(credentials.email),
				password: $sanitize(credentials.password),
				_token :CSRF_TOKEN
			};
		};

		return {
			login: function(credentials) {
				var login = $http.post("/auth/login", angular.extend(sanitizeCredentials(credentials , CSRF_TOKEN)) );
				login.success(cacheSession);
				login.success(FlashService.clear);
				login.error(loginError);

				return login;
			},
			logout: function() {
				var logout = $http.get("/auth/logout");
				logout.success(uncacheSession);
				return logout;
			},
			isLoggedIn: function() {
				return SessionService.get('authenticated');
			},
			isIdentityResolved: function() {
				return angular.isDefined(_identity);
			},
			isAuthenticated: function() {
				return _authenticated;
			},
			isInRole: function(role) {
				if (!_authenticated || !_identity.roles) return false;

				return _identity.roles.indexOf(role) != -1;
			},
			isInAnyRole: function(roles) {
				if (!_authenticated || !_identity.roles) return false;

				for (var i = 0; i < roles.length; i++) {
					if (this.isInRole(roles[i])) return true;
				}

				return false;
			},
			authenticate: function(identity) {
				_identity = identity;
				_authenticated = identity != null;
			},
			identity: function(force) {
				var deferred = $q.defer();

				if (force === true) _identity = undefined;

				// check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
				if (angular.isDefined(_identity)) {
					deferred.resolve(_identity);

					return deferred.promise;
				}

				 //otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
				 //                  $http.get('/svc/account/identity', { ignoreErrors: true })
				 //                       .success(function(data) {
				 //                           _identity = data;
				 //                           _authenticated = true;
				 //                           deferred.resolve(_identity);
				 //                       })
				 //                       .error(function () {
				 //                           _identity = null;
				 //                           _authenticated = false;
				 //                           deferred.resolve(_identity);
				 //                       });

				// for the sake of the demo, fake the lookup by using a timeout to create a valid
				// fake identity. in reality,  you'll want something more like the $http request
				// commented out above. in this example, we fake looking up to find the user is
				// not logged in

				//var self = this;
				//$timeout(function() {
				//	//self.authenticate({
				//	//	user:{personal_information:{first_name:'dor'}},
				//	//	roles: ['user']
				//	//});
                //
				//	deferred.resolve(_identity);
				//	console.log('identity: '+_identity);
				//	//console.log(_identity);
				//}, 1000);
                //
				deferred.resolve(_identity);
				return deferred.promise;
			}
		};

	})

	//.factory('authorization', ['$rootScope', '$state', 'AuthenticationService',
	//	function($rootScope, $state, AuthenticationService) {
	//		return {
    //
	//			handle: function(){
    //
	//				return AuthenticationService.isLoggedIn();
	//			},
    //
	//			authorize: function() {
    //
    //
	//				return AuthenticationService.identity()
    //
	//					.then(function() {
	//						var isAuthenticated = AuthenticationService.isAuthenticated();
    //
    //
    //
	//						if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !AuthenticationService.isInAnyRole($rootScope.toState.data.roles)) {
	//							if (isAuthenticated) $state.go('401'); // user is signed in but not authorized for desired state
	//							else {
	//								// user is not authenticated. stow the state they wanted before you
	//								// send them to the signin state, so you can return them when you're done
	//								$rootScope.returnToState = $rootScope.toState;
	//								$rootScope.returnToStateParams = $rootScope.toStateParams;
    //
	//								// now, send them to the signin state so they can log in
	//								$state.go('login');
	//							}
	//						}
    //
	//					});
	//			}
	//		};
	//	}
	//]);

	//.factory('principal', ['$q', '$http', '$timeout',
	//	function($q, $http, $timeout) {
	//		var _identity = undefined,
	//			_authenticated = false;
    //
	//		return {
	//			isIdentityResolved: function() {
	//				return angular.isDefined(_identity);
	//			},
	//			isAuthenticated: function() {
	//				return _authenticated;
	//			},
	//			isInRole: function(role) {
	//				if (!_authenticated || !_identity.roles) return false;
    //
	//				return _identity.roles.indexOf(role) != -1;
	//			},
	//			isInAnyRole: function(roles) {
	//				if (!_authenticated || !_identity.roles) return false;
    //
	//				for (var i = 0; i < roles.length; i++) {
	//					if (this.isInRole(roles[i])) return true;
	//				}
    //
	//				return false;
	//			},
	//			authenticate: function(identity) {
	//				_identity = identity;
	//				_authenticated = identity != null;
	//			},
	//			identity: function(force) {
	//				var deferred = $q.defer();
    //
	//				if (force === true) _identity = undefined;
    //
	//				// check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
	//				if (angular.isDefined(_identity)) {
	//					deferred.resolve(_identity);
    //
	//					return deferred.promise;
	//				}
    //
	//				// otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
	//				//                   $http.get('/svc/account/identity', { ignoreErrors: true })
	//				//                        .success(function(data) {
	//				//                            _identity = data;
	//				//                            _authenticated = true;
	//				//                            deferred.resolve(_identity);
	//				//                        })
	//				//                        .error(function () {
	//				//                            _identity = null;
	//				//                            _authenticated = false;
	//				//                            deferred.resolve(_identity);
	//				//                        });
    //
	//				// for the sake of the demo, fake the lookup by using a timeout to create a valid
	//				// fake identity. in reality,  you'll want something more like the $http request
	//				// commented out above. in this example, we fake looking up to find the user is
	//				// not logged in
	//				var self = this;
	//				$timeout(function() {
	//					self.authenticate(null);
	//					deferred.resolve(_identity);
	//				}, 1000);
    //
	//				return deferred.promise;
	//			}
	//		};
	//	}
	//])

///*--------------------------------------------------------------------------------------------------\
// |                                                                                                  |
// |  new job controller                                                                              |
// |  ===================                                                                             |
// |  this is the new job modal service.                                                              |
// |  i really should seperate the whole controller and just reference it the regular way..           |
// |  we resolve the form using `Form` service.                                                       |
// |  we have all the form functions using `Form` service.                                            |
// |  we save the job using `PostData` resource service                                               |
// |                                                                                                  |
// --------------------------------------------------------------------------------------------------*/
//
//	.factory('newJobModalService', function($uibModal, $state, $http, $stateParams, Account, Form, PostData) {
//
//		return {
//			openTextEditModal: function(id) {
//
//				var modalInstance = $uibModal.open({
//					templateUrl: '../partials/employer/newJob.html',
//					backdrop: 'static',
//					controller: function($scope, $uibModalInstance, $sce, $http, $stateParams, form, $rootScope) {
//						$scope.formData= {};
//						$scope.form    = angular.copy(form.data);
//						$scope.jobPost = angular.copy(form.data);
//
//						Form.getAllOptionValues().then(function(options){
//							$scope.groups = options.data;
//						});
//
//						$scope.add = function(docParam,$index) {
//							$scope.inserted = angular.copy($scope.jobPost[docParam][0]);
//							$scope.form[docParam].push($scope.inserted);
//						};
//
//						$scope.move = function(array, fromIndex, toIndex){
//							array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] )
//						};
//
//						$scope.remove = function(array,docParamName,index) {
//							array.splice(index,1);
//						};
//
//						$scope.close = function() {
//							$uibModalInstance.dismiss('cancel');
//							$state.go('employer.jobs');
//						};
//
//						$scope.ok = function() {
//							$uibModalInstance.dismiss('cancel');
//							$state.go('employer.jobs');
//						};
//						$scope.reformat = function(){
//
//							angular.forEach( $scope.form.general[0], function(value, key) {
//
//								var has = _.has($scope.formData['general'], value.paramName);
//								if (has){
//
//									$scope.form.general[0][value.paramId].paramValue = $scope.formData['general'][value.paramName];
//									//date exeption
//                                    if(value.inputType == 'date' && value.paramName != 'date_of_birth'  ){
//										value.paramValue = date($scope.formData.date_of_birth.month, $scope.formData.date_of_birth.year);
//									}
//								}else{
//                                    //console.log('');
//                                }
//							})
//						};
//						$scope.savePost = function() {
//
//                            $scope.reformat();
//
//							PostData.save( {post:$scope.form} ).$promise
//								.then(function(res) {
//									$rootScope.$broadcast('newPost', res);
//                                    $uibModalInstance.dismiss('saved');
//                                    $state.go('employer.jobs.job',{jobId:res.id});
//								})
//								.catch(function(err) {
//									$scope.errors = err.data;
//									//Account.broadcast(err.data);
//								})
//						};
//						$scope.proccessForm = function(){
//							$scope.reformat();
//							$scope.sent  = true;
//							$scope.savePost();
//						};
//					},
//					size: 'lg',
//					resolve: {
//						form:function(){
//							return Form.getForm('job');
//						}
//					}
//				});
//
//			},
//			close:function(){
//				$uibModal.close();
//			}
//		};
//	})
//.factory('JobseekerPost', function($uibModal, $state, $http, $stateParams, Account, Form, PostData, $q) {
//	var allPosts = [];
//	return {
//		openTextEditModal: function(id) {
//
//			var modalInstance = $uibModal.open({
//				templateUrl: '../partials/jobseeker/job.html',
//				backdrop: 'static',
//				controller: function($scope, $uibModalInstance, $sce, post, user, $http, $stateParams, An_applyData, An_openFileData) {
//
//					$scope.jobPost = post;
//
//					$scope.postedBy = post['postInfo']['user_id'];
//					$scope.user    = user.user['personal_information'];
//					$scope.user_id = user.user['personal_information']['id'];
//
//					Form.getAllOptionValues().then(function(options){
//						$scope.groups = options.data;
//					});
//					An_openFileData.save(
//						{post:post, user:user.user}
//					);
//					$scope.close = function() {
//						$uibModalInstance.dismiss('cancel');
//                       $state.go('jobseeker.findajob');
//					};
//					$scope.ok = function() {
//						$uibModalInstance.dismiss('cancel');
//						$state.go('jobseeker.findajob');
//					};
//
//					$scope.applyForJob = function() {
//							//$scope.user    = data.user['personal_information'];
//							//$scope.user_id = data.user['personal_information']['id'];
//
//						//this is a sysParamValue(s) -consider using resource?!
//						$http.post('api/job/apply/' + id, {user_id: $scope.user_id}).then(function(response){
//							return response.data;
//						});
//						//this is an_apply using an apply resource
//						An_applyData.save({user:$scope.user, post_id:id, postedBy:$scope.postedBy});
//
//					};
//				},
//				size: 'lg',
//				resolve: {
//					// post should use PostData Resource but cant get this to work..using a simple http instead..
//					//post: function($http) {
//					//	var post = $http.get('api/job/'+ id ).then(function(response){
//					//		return response.data;
//					//	})
//					//	return post;
//					//},
//					post: function() {
//
//						if(!allPosts[id]){
//							allPosts[id] = PostData.get({id:id}).$promise.then(function(post){
//								return $q.when( post );
//							})
//
//						}
//						return $q.when( allPosts[id])
//					},
//					user:function(){
//						return 	Account.getProfile();
//					}
//
//
//				}
//			});
//
//		},
//		close:function(){
//			$uibModal.close();
//		}
//	};
//})
//.factory('ModalService', function($uibModal, $state, $http, $stateParams, Account, Form, PostData, $q) {
//	var allPosts = [];
//	return {
//		openTextEditModal: function(id) {
//
//			var modalInstance = $uibModal.open({
//				templateUrl: '../partials/employer/job.html',
//				backdrop: 'static',
//				controller: function($scope, $uibModalInstance, $sce, post, form, $http, $stateParams,An_searchData,options,$rootScope) {
//
//					$scope.jobPost  = post.post;
//                   $scope.formData = post.formData;
//                   $scope.groups   = options.data;
//
//
//					//whats going on here?
//					//witch is var user and wich is scope user?
//					Account.getProfile().then(function(data) {
//						$scope.user = data.user;
//					});
//					var user = post['postInfo'];
//
//					$scope.set_an_search = function(){
//						An_searchData.save({user:$scope.user,post_id:id});
//					};
//
//					$scope.close = function() {
//						$uibModalInstance.dismiss('cancel');
//						$state.go('employer.jobs');
//					};
//					$scope.save = function() {
//						$uibModalInstance.close();
//                       $state.go('^');
//					};
//                   //ToDo: add this to Form service or filter
//                   $scope.reformat = function(){
//
//                       angular.forEach( $scope.jobPost.general[0], function(value, key) {
//
//                           var has = _.has($scope.formData['general'], value.paramName);
//                           if (has){
//
//                               $scope.jobPost.general[0][value.paramId].paramValue = $scope.formData['general'][value.paramName];
//                               //date exeption
//                               if(value.inputType == 'date' && value.paramName != 'date_of_birth'  ){
//                                   value.paramValue = date($scope.formData.date_of_birth.month, $scope.formData.date_of_birth.year);
//                               }
//                           }else{
//                               //console.log('');
//                           }
//                       })
//                   };
//                   $scope.savePost = function() {
//                       $scope.reformat();
//                           PostData.save( {post:$scope.jobPost, post_id:id} ).$promise
//                           .then(function(res) {
//                               $rootScope.$broadcast('updatedPost', res);
//                               $state.go('employer.jobs');
//                           })
//                           .catch(function(err) {
//                               $scope.errors = err.data;
//                               Account.broadcast(err.data);
//                           })
//                   };
//
//					$scope.add = function(docParam,$index) {
//						$scope.inserted = angular.copy(form.data[docParam][0]);
//						$scope.jobPost[docParam].push($scope.inserted);
//					};
//
//					$scope.move = function(array, fromIndex, toIndex){
//						array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] )
//					};
//
//					$scope.remove = function(array,docParamName,index) {
//						array.splice(index,1);
//					};
//				},
//				size: 'lg',
//				resolve: {
//                   post: function() {
//
//                       if(!allPosts[id]){
//                           allPosts[id] = PostData.get({id:id}).$promise.then(function(post){
//                               var formData = {};
//                               formData.general = [];
//                               angular.forEach(post['general'][0], function(value, key) {
//                                   if(key != 'docParamId') formData.general[value.paramName] = value.paramValue;
//                               });
//
//
//
//                               return $q.when( {post:post,formData:formData} );
//                           })
//
//                       }
//                       return $q.when( allPosts[id])
//                   },
//					//form is for `add()` to insert new iteration
//					form:function(){
//						return Form.getForm('job');
//					},
//                   options: function(){
//                       return Form.getAllOptionValues();
//
//                   }
//					//post: function($http) {
//                   //
//					//	if(!allPosts[id]){
//					//		allPosts[id] = $http.get('api/job/'+ id ).then(function(response){
//					//				return response.data;
//					//			})
//					//	}
//					//	return	allPosts[id];
//					//}
//				}
//			});
//
//		},
//		close:function(){
//			$uibModal.close();
//		}
//	};
//})