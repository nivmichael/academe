


angular.module('acadb.services', []).
  value('version', '0.1')

.factory('ParamData', ['$resource',
	function($resource) {
		return $resource('api/param/:id', {id: '@id'}, {
			 'update': { method:'PUT' },
			 'insertNew': { method:'POST' },
			 'delete':{method:'DELETE'},
			 'list': {method: 'GET', isArray: true }


			 
		});
}])
.factory('UserData', ['$resource',
	function($resource) {
		return $resource('api/users/:id', {id: '@id'}, {
			 'update': { method:'PUT' },
			 'insertNew': { method:'POST' },
			 'delete':{method:'DELETE'},
			 'list': {method: 'GET', isArray: true }
		});
}])

.factory('DocParamData', ['$resource',
	function($resource) {
		return $resource('api/docParam/:id', {id: '@id'}, {
			 'update': { method:'PUT' },
			 'insertNew': { method:'POST' },
			 'delete':{method:'DELETE'},
			'list': {method: 'GET', isArray: true }
		});
}])

.factory('DocTypeData', ['$resource',
	function($resource) {
		return $resource('api/docType/:id', {id: '@id'}, {
			 'update': { method:'PUT' },
			 'insertNew': { method:'POST' },
			 'delete':{method:'DELETE'},
			'list': {method: 'GET', isArray: true }
		});
}])

.factory('ParamTypeData', ['$resource',
	function($resource) {
		return $resource('api/paramType/:id', {id: '@id'}, {
			 'update': { method:'PUT' },
			 'insertNew': { method:'POST' },
			 'delete':{method:'DELETE'},
			'list': {method: 'GET', isArray: true }
		});
}])
.factory('ColumnData', ['$resource',
	function($resource) {
		return $resource('api/columns/:name', {id: '@name'}, {
			 'update': { method:'PUT' },
			 'insertNew': { method:'POST' },
			 'delete':{method:'DELETE'},
			 'list':{method:'GET', transformRequest: function(data, headerFn){
			 	return JSON.stringify(data);
			 	}
			 }
		});
	}])
.factory('ParamValueData', ['$resource',
	function($resource) {
		return $resource('api/paramValue/:id', {id: '@id'}, {
			 'update': { method:'PUT' },
			 'insertNew': { method:'POST' },
			 'delete':{method:'DELETE'},
			'list': {method: 'GET', isArray: true }
		});
	}])
.factory('SysParamValuesData', ['$resource',
	function($resource) {
		return $resource('api/sysParamValues/:id', {id: '@id'}, {
			 'update': { method:'PUT' },
			 'insertNew': { method:'POST' },
			 'delete':{method:'DELETE'},
			 'list': {method: 'GET', isArray: true }

		});
	}])
.factory('PostData', ['$resource',
	function($resource) {
		return $resource('api/post/:id', {id: '@id'}, {
			'save':   {method:'POST'},
			'update': { method:'PUT' },
			'delete':{method:'DELETE'},
			'list': {method: 'GET', isArray: true }
		});
	 }])
.factory('TableData', ['$resource',
		function($resource) {
			return $resource('api/db/:table', {table: '@table'}, {
				'save':     {method:'POST'},
				'update':   {method:'PUT' },
				'delete':   {method:'DELETE'},
				'list':     {method: 'GET', isArray: true },
			});
	}])
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
.factory('Account', function($http, $rootScope ) {

	var promise;
	return {
		getProfile: function() {
			if ( !promise ) {
				// $http returns a promise, which has a then function, which also returns a promise
				promise = $http.get('/api/me').then(function (response) {
					// The then function here is an opportunity to modify the response

					// The return value gets picked up by the then in the controller.
					return response.data;
				});
			}
			// Return the promise to the controller
			return promise;
		},
		updateProfile: function(profileData) {
			return $http.post('/api/me',profileData);
		},
		broadcast: function(user) {
			$rootScope.$broadcast('handleBroadcast', user);
		},
		logout: function(){

			return promise = null;
		}
	};

})
	.factory('ModalService', function($uibModal, $state, $http, $stateParams, Account, Form) {

		return {
			openTextEditModal: function(id, post, $stateParams) {

				var modalInstance = $uibModal.open({
					templateUrl: '../partials/tpl/modal.html',
					//backdrop: 'static',
					controller: function($scope, $uibModalInstance, $sce, post, $http, $stateParams) {

						$scope.jobPost = post;

						Form.getAllOptionValues().then(function(options){
							$scope.groups = options.data;
						});


						Form.getJobPostForm().then(function(form){
							$scope.jobPostForm = angular.copy(form);
						})

						$scope.add = function(docParam,$index) {
							$scope.inserted = angular.copy($scope.jobPost[docParam][0]);
							$scope.jobPost[docParam].push($scope.inserted);
						};
						var clone = {};
						//angular.copy(post, clone);


						$scope.clone = clone;
						$scope.close = function() {
							$uibModalInstance.dismiss('cancel');
							$state.go('employer.company');
						};
						$scope.save = function() {
							angular.extend(post, clone);
							$uibModalInstance.close();
						};
						$scope.savePost = function() {

							$http.post('api/savePost', {
								post:$scope.jobPost,
							}).success(function(errors){
								//Account.broadcast(errors);
								console.log(errors);


							}).error(function(err) {

							}).then(function(){
								$state.go('employer.company');
							});
						};

					},
					size: '',
					resolve: {
						post: function($http) {

							var post = $http.get('api/job/'+ id ).then(function(response){

								return response.data;
							})
							return post;
						}
					}
				});

			},
			close:function(){
				$uibModal.close();
			}
		};
	})
//.service('Post', function($stateParams, $http) {
//		console.log($stateParams.jobId);
//		var postList =  {};
//		return {
//			 getPost : function(){
//				$http.get('api/job/'+ $stateParams.jobId ).then(function(response){
//					console.log(response.data);
//					return response.data;
//				})
//			},
//			getPosts : function(callback) {
//				if( ! storage.storedData){
//			}
//		}
//
//
//})
.factory('Form', function($http, $q, $rootScope, $stateParams) {

	var forms     = [];
	var	next_keys = [];
	var prev_key  = false;
	var form, getJobPostForm, options, new_iteration;

	return {
		getAdminForm: function(form){
			var defer= $q.defer();

			if ( !forms[form] ) {
				forms[form] =  $http.get('/api/admin/forms/'+form).then(function(res){
					forms[form] = forms[form];
					defer.resolve(res.data);
				});
			}else if(forms[form]){

				defer.resolve(forms[form]);
			}
			console.log(defer.promise);
			return defer.promise;
		},
		getForm: function(form){
			var defer= $q.defer();

			if ( !forms[form] ) {
				forms[form] =  $http.get('/api/form/'+form , function(form){
					console.log(form);
				});

				defer.resolve(forms[form]);
			}else if(forms[form]){
				defer.resolve(forms[form]);
			}else{
				defer.reject();
			}

			return defer.promise;
		},
		getJobPostForm: function() {
			if ( !getJobPostForm ) {
				// $http returns a promise, which has a then function, which also returns a promise
				getJobPostForm = $http.get('api/forms/jobPost').then(function (response) {
					// The then function here is an opportunity to modify the response
					// The return value gets picked up by the then in the controller.
					return response.data;
				});
			}
			// Return the promise to the controller
			return getJobPostForm;
		},
		getForms: function() {
			if ( !form ) {
				// $http returns a promise, which has a then function, which also returns a promise
				form = $http.get('api/forms/register_' + $stateParams.type).then(function (response) {
					// The then function here is an opportunity to modify the response
					// The return value gets picked up by the then in the controller.
					return response.data;
				});
			}
			// Return the promise to the controller
			return form;
		},
		next_form: function(){
				for (var key in $rootScope.steps) {
					if($rootScope.steps[key]['belongsTo'] ==  $stateParams.type){
						if (!prev_key) {
							prev_key = $rootScope.steps[key].value;
						} else {
							next_keys[prev_key] = $rootScope.steps[key].value;
							prev_key = $rootScope.steps[key].value;
						}
					}
				}
				return next_keys;
		},
		nextDoc: function() {
				var doc = $stateParams.doc;
				if (next_keys[doc]) {
					doc = next_keys[doc];
					console.log(doc);
					return doc;
				} else {
					return false;
				}
		},
		getAllOptionValues: function(){
			if ( !options ) {
				if (typeof options == 'undefined') options = [];
				options =  options.length ? null : $http.get('api/getAllOptionValues').then(function(response) {
					options = response;
					return $q.when(options);
				});
			}
			return $q.when(options);
		},
		//add: function() {
		//	if(!new_iteration) {
		//		if (typeof new_iteration == 'undefined') new_iteration = [];
		//		new_iteration = $http.get('api/forms/register_'+$stateParams.type).then(function(response){
		//			new_iteration = response.data;
        //
        //
        //
		//			return $q.when(new_iteration);
		//		})
		//	}
		//	return $q.when(angular.copy(new_iteration));
		//},
		remove: function(array,index,user_id) {
			$http.post('api/deleteIterable', {docParam:array,index:index,user_id:user_id});
		},
		validate: function(param, value) {
			var response;
			console.log(param, value);
			response = $http.post('api/validate', {all: param, param: value}).then(function(response) {

				return response;

			});
			return	response;
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
