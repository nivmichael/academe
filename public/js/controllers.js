/* Controllers */
'use strict';
angular.module('acadb.controllers', [])

	//.controller('SideNavController', function ($scope, $http, $state, $auth, Account, $stateParams, Tables, $rootScope, TableData) {
    //
	//	$scope.tables = Tables.tablesObj;
    //
    //
	//	//TableData.list().$promise.then(function(tables){
	//	//	$scope.tables = tables;
	//	//});
	//	//$scope.getTable = function(table){
	//	//	$scope.table = Tables.getTable(table)
	//	//	console.log('1');
	//	//	$scope.columns = $scope.table;
	//	//}
    //
	//	$scope.$on('handleBroadcast', function(event, user) {
	//		$scope.user = user.user;
	//		//$scope.allJobs = user.posts;
	//	});
    //
    //
	//	$scope.type = $stateParams.type;
	//	$scope.sub_type = $stateParams.sub_type;
	//	if ($auth.isAuthenticated()) {
	//		Account.getProfile().then(function (response) {
    //
	//			$scope.user = response.user;
	//			$scope.currentStatus = response.user.personal_information.status;
	//		})
	//	}
	//	$scope.ToolbarModel = {
	//		IsVisible: true,
	//		ViewUrl: null,
	//	};
	//	$scope.ToolbarModel.close = function () {
	//		this.IsVisible = false;
	//		this.ViewUrl = null;
	//	}
	//	$scope.isAuthenticated = function () {
	//		return $auth.isAuthenticated();
	//	};
	//	$scope.changeStatus = function(status){
	//		//$.post('/setStatus', {status:status,_token:CSRF_TOKEN,from:'tables'}).success(function(callBack){
	//		//	$scope.user.status = status;
	//		//	console.log(callBack);
	//		//})
	//		$http.post('/setStatus',{status:$scope.currentStatus})
	//			.success(function(data){
	//				console.log(data);
	//			}).error(function(data){
	//				console.log(data);
    //
	//			})
	//	};
    //
	//	$scope.userStatuses = [
	//		{value: 'active', text: 'Active'},
	//		{value: 'inactive', text: 'Inactive'}
	//	]
	//})
	.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {



		//$scope.upload = function (dataUrl, name) {
		//	Upload.upload({
		//		url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
		//		data: {
		//			file: Upload.dataUrltoBlob(dataUrl, name)
		//		},
		//	}).then(function (response) {
		//		$timeout(function () {
		//			$scope.result = response.data;
		//		});
		//	}, function (response) {
		//		if (response.status > 0) $scope.errorMsg = response.status
		//			+ ': ' + response.data;
		//	}, function (evt) {
		//		$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
		//	});
		//}
        //
		$scope.open = function(){
			console.log('dor');
			$scope.modalOpen = true;
			$scope.openModal = true;
		};
	}])
	.controller('PasswordCtrl', function ($scope, $http, $state, $auth, CSRF_TOKEN, $stateParams) {
		$scope.postPasswordEmail = function(){
			$http.post('/password/email', { email:$scope.user.email	})
				.then(function(data){
					$state.go('login');
				})
				.catch(function(errors) {
					$scope.errors = errors
					//toastr.error(error.data.message, error.status);
				});
		}
		$scope.getPasswordReset = function(){
			$http.get('/password/email/' + CSRF_TOKEN , {email:$scope.user.email})
				.then(function(data){
					//$state.go('login');
				})
				.catch(function(error) {
					$scope.errors = error.data
					//toastr.error(error.data.message, error.status);
				});
		}
		$scope.postPasswordReset = function(){
			$http.post('/password/reset', { email:$scope.user.email,
											password: $scope.user.password,
											password_confirmation: $scope.user.password_confirmation,
											token: $stateParams.token
				})
				.success(function(data){

				})
				.error(function(errors){
					$scope.error  = errors.error;
					$scope.errors = errors;
				})
				.then(function(data) {
				})
				.catch(function(errors) {
					//toastr.error(error.data.message, error.status);
				});
		}

	})
///.controller('LoginCtrl', function($scope, $location, $auth, $state, $http, $stateParams) {    ///    ///
///	$scope.registration_link = 'register.personal_information';    ///    ///
///	/*Password Reset Functions*/    ///
///	/*reset link in the login menu. we need this because it works with a token*/
///	$scope.getPasswordEmail = function(){
///		$http.get('/password/email')
///			.then(function(data){
///				$state.go('password_mail');
///			})
///			.catch(function(error) {
///				$scope.errors = error.data
///				//toastr.error(error.data.message, error.status);
///			});
///	}
///	/*the login button send credentials and checs them..*/
///	$scope.login = function() {
///		$auth.login($scope.user)
///			.then(function() {
///				//toastr.success('You have successfully signed in!');
///				$state.go('profile');
///			})
///			.catch(function(error) {
///				$scope.errors = error.data
///				//toastr.error(error.data.message, error.status);
///			});
///	};
///	/*manual authentication function..for example...used after registration to imediatley login the user*/
///	$scope.authenticate = function(provider) {
///		$auth.authenticate(provider)
///			.then(function() {
///				//toastr.success('You have successfully signed in with ' + provider + '!');
///				$state.go('/');
///			})
///			.catch(function(error) {
///				if (error.error) {
///					// Popup error - invalid redirect_uri, pressed cancel button, etc.
///					//toastr.error(error.error);
///				} else if (error.data) {
///					// HTTP response error from server
///					//toastr.error(error.data.message, error.status);
///				} else {
///					//toastr.error(error);
///				}
///			});
///	};    ///
///	/**/
///	if (!$auth.isAuthenticated()) { return; }    ///
///	/*logout. removing the token from the local storage*/
///	$scope.logout = function() {
///		$auth.logout()
///			.then(function () {
///				//toastr.info('You have been logged out');
///				$state.go('welcome');
///			});
///	};
///})
	//.controller('ProfileCtrl', function($scope, $auth, $state, Account) {
    //
	//	/*checks if authenticated*/
	//	$scope.isAuthenticated = function() {
	//		return $auth.isAuthenticated();
	//	};
	//	/*logout. removing the token from the local storage*/
	//	//$scope.logout = function() {
	//	//	$auth.logout()
	//	//		.then(function () {
	//	//			//toastr.info('You have been logged out');
	//	//			$state.go('welcome');
	//	//		});
	//	//};
    //
    //
    //
	//	$scope.getProfile = function() {
	//		Account.getProfile()
	//			.then(function(response) {
	//				$scope.user = response.data;
	//			})
	//			.catch(function(response) {
	//				//toastr.error(response.data.message, response.status);
	//			});
	//	};
	//	$scope.updateProfile = function() {
	//		Account.updateProfile($scope.user)
	//			.then(function() {
	//				//toastr.success('Profile has been updated');
	//			})
	//			.catch(function(response) {
	//				//toastr.error(response.data.message, response.status);
	//			});
	//	};
	//	$scope.link = function(provider) {
	//		$auth.link(provider)
	//			.then(function() {
	//				//toastr.success('You have successfully linked a ' + provider + ' account');
	//				$scope.getProfile();
	//			})
	//			.catch(function(response) {
	//				//toastr.error(response.data.message, response.status);
	//			});
	//	};
	//	$scope.unlink = function(provider) {
	//		$auth.unlink(provider)
	//			.then(function() {
	//				//toastr.info('You have unlinked a ' + provider + ' account');
	//				$scope.getProfile();
	//			})
	//			.catch(function(response) {
	//				//toastr.error(response.data ? response.data.message : 'Could not unlink ' + provider + ' account', response.status);
	//			});
	//	};
	//	//footer modals
	//	$scope.footerNavlis = [
	//		{id: '1', tag:'Resumes'},
	//		{id: '2', tag:'Certifications'},
	//		{id: '3', tag:'References '},
	//		{id: '4', tag:'Gallery '},
	//		{id: '5', tag:'Cover '},
	//	];
	//	//end footer modals
    //
	//	//materialize datepicker
	//	var currentTime = new Date();
	//	$scope.currentTime = currentTime;
	//	$scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	//	$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	//	$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	//	$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	//	$scope.disable = [false, 1, 7];
	//	$scope.today = 'Today';
	//	$scope.clear = 'Clear';
	//	$scope.close = 'Close';
	//	var days = 15;
	//	$scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
	//	$scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
	//	$scope.onStart = function () {
	//		console.log('onStart');
	//	};
	//	$scope.onRender = function () {
	//		console.log('onRender');
	//	};
	//	$scope.onOpen = function () {
	//		console.log('onOpen');
	//	};
	//	$scope.onClose = function () {
	//		console.log('onClose');
	//	};
	//	$scope.onSet = function () {
	//		console.log('onSet');
	//	};
	//	$scope.onStop = function () {
	//		console.log('onStop');
	//	};
	//	//end materialize datepicker
    //
	//	////ng file upload
	//	//$scope.uploader = {
	//	//	controllerFn: function ($flow, $file, $message) {
	//	//		console.log($flow, $file, $message); // Note, you have to JSON.parse message yourself.
	//	//		$file.msg = $message;// Just display message for a convenience
	//	//	}
	//	//};
	//	//var uploader = $scope.uploader = new FileUploader({
	//	//	url: '/uploadCv',
	//	//	//	autoUpload:true,
	//	//	queueLimit: 1,
	//	//	formData: [
	//	//		{
	//	//			iteration:''
	//	//		},
	//	//	]
	//	//});
	//	//// endng file upload
    //
    //
	//	$scope.getProfile();
	//})
	//.controller('MainCtrl', function ($scope, $http) {
    //
	//	$scope.getLayout = function(){
	//		$http.get('/layout').
	//			then(function(response) {
    //
	//				$scope.layout = response.data;
	//				$scope.main_color = $scope.layout.main_color;
	//				$scope.logo = $scope.layout.logo;
	//			}, function(response) {
	//				// called asynchronously if an error occurs
	//				// or server returns response with an error status.
	//			});
	//	}
	//	$scope.getLayout();
	//	$scope.devDashboard = true;
	//	$scope.isCollapsed = true;
	//	$scope.isMessagesCollapsed = true;
	//	$scope.menuOpen = true;
    //
	//	$scope.toggleMenu = function() {
	//		$scope.menuOpen = !$scope.menuOpen;
	//	}
    //
	//	$scope.openLeftMenu = function() {
	//		$scope.menuOpen = !$scope.menuOpen;
	//	};
	//	$scope.dev = function(){
	//		$scope.devDashboard = !$scope.devDashboard;
	//	}
	//	$scope.testfunc = function(){
	//		$scope.$broadcast('show-errors-check-validity');
	//		$scope.serverValidation = true;
	//	}
    //
	//	$scope.resetValidation = function() {
	//		$scope.$broadcast('show-errors-reset');
	//		$scope.serverValidation = false;
	//	}
    //
	//})
	.controller("TController",['$state','$scope', '$filter', '$http', 'ParamData','UsersData','$location','ColumnData','DocParamData','DocTypeData','ParamTypeData','ParamValueData','SysParamValuesData','CSRF_TOKEN', function($state, $scope, $filter, $http, ParamData,UsersData,$location,ColumnData,DocParamData,DocTypeData,ParamTypeData,ParamValueData,SysParamValuesData,CSRF_TOKEN) {

		$scope.sortableOptions = {
			update: function(e, ui) {  },
			axis: 'x'
		};
		$scope.showColumns = true;


		$scope.ordered_columns = [];



		$scope.$watch('all_columns', function() {
			update_columns();
		}, true);

		var update_columns = function() {
			$scope.ordered_columns = [];
			for (var i = 0; i < $scope.all_columns.length; i++) {
				var column = $scope.all_columns[i];
				if (column.checked) {
					$scope.ordered_columns.push(column);
				}
			}
		};
		$scope.checkAll = function () {
			if ($scope.selectedAll) {
				$scope.selectedAll = true;
			} else {
				$scope.selectedAll = false;
			}
			angular.forEach($scope.Items, function (item) {
				item.Selected = $scope.selectedAll;
			});

		};


		$scope.setOrderBy = function(param){
			$scope.orderByField = param;
		}

		$scope.reverseSort = false;


		$scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

		$scope.countries  = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', '$_[', 'Croatia', 'Curaçao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Barthélemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'USA', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];



		$scope.getAuthId = function(){
			$http.get('/getAuthId').
				success(function(data, status, headers, config) {
					$scope.getUser(data);
					$scope.userId = data;

				});
		};

		$scope.getUser = function(id){
			$http.get('/users/'+id).
				success(function(data, status, headers, config) {
					$scope.user = data;
					//$stateParams.user = $scope.user;
				}).
				error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
		};

		$scope.getAuthId();
		/* fetching json from server via lib/services-ParamData, UserData

		 *
		 * make switch instead of else if
		 *
		 *
		 */
		$scope.data = '';
		$scope.users=[];
		$scope.params = ParamData.query();
		$scope.jobseekerColumns =[];
		$scope.employerColumns = [];
		$scope.allColumns = [];

		UsersData.get().$promise.then(function(value) {

			$scope.users = value.users
			//console.log($scope.users)
			$scope.data = $scope.users;
			angular.forEach( value.jobseekerColumns, function(value, key) {
				$scope.jobseekerColumns.push({'title'   :value.title,
					                          'type'    :value.type,
											  'checked' :value.checked,
					                          'docParamName' :value.docParamName
				});
				$scope.allColumns.push({'title'   :value.title,
										'type'    :value.type,
										'checked' :value.checked,
										'docParamName' :value.docParamName
				});
			});
			angular.forEach( value.employerColumns, function(value, key) {
				$scope.employerColumns.push({'title'   :value.title,
											 'type'    :value.type,
											 'checked' :value.checked,
											 'docParamName' :value.docParamName
				});
				$scope.allColumns.push({'title'   :value.title,
										'type'    :value.type,
										'checked' :value.checked,
										'docParamName' :value.docParamName
				});
			});
			//console.log($scope.employerColumns);
		});



		$scope.docParams  = DocParamData.query();
		$scope.docTypes  = DocTypeData.query();
		$scope.paramTypes  = ParamTypeData.query();
		$scope.paramValues = ParamValueData.query();
		$scope.sysParamValues = SysParamValuesData.query();

		$scope.selectedAll = true;
		$scope.all_columns = 	$scope.allColumns;
		$scope.checkAll = function () {
			if ($scope.selectedAll) {
				$scope.selectedAll = true;
			} else {
				$scope.selectedAll = false;
			}
			angular.forEach($scope.all_columns, function (column) {
				column.checked = $scope.selectedAll;
			});

		};
//tabs varibles



		$scope.filter = '';

		$scope.setFilter = function(query){

			$scope.filter = query;

			if(query == 'jobseeker'){
				$scope.all_columns = $scope.jobseekerColumns;
				$scope.jobseekersTab = true;
			}else if(query == 'employer'){
				$scope.all_columns = $scope.employerColumns;
				$scope.employersTab = true;
			}else if(query == ''){
				$scope.all_columns = $scope.allColumns;
			}


		}

		$scope.select_type = {
			'doc_param_id': 'docParam',
			'doc_type_id' : 'docType',
			'value_ref'   : 'paramValue',
			'param_id'   : 'params',
			'ref_id'   : 'users',
			'doc_type'   : 'docType',


		};


//changing variables according path.
		if($location.path() == '/tables/type_user' || $location.path() == '/stats' )
		{
			console.log($location.path())	;
			$scope.table = 'type_user';
			$scope.varName  = 'User';
			$scope.pathTo   = '/users';
			$scope.objName  = $scope.users;
			$scope.columns = 'user';
			$scope.typeAhead = ['state', 'country'];
			$scope.userTypes = ['tech-admin','user','content-admin'];

		}else if($location.path() == '/tables/param')
		{
			$scope.varName = 'Param';
			$scope.pathTo  = '/params';
			$scope.objName = $scope.params;
			$scope.columns = 'param';
			$scope.selects = ['type_id', 'doc_param_id'];
		}
		else if($location.path() == '/tables/doc_param')
		{
			$scope.varName = 'DocParam';
			$scope.pathTo  = '/docParam';
			$scope.objName = $scope.docParams;
			$scope.columns = 'docParam';
			$scope.selects = ['doc_type_id'];
		}
		else if($location.path() == '/tables/doc_type')
		{
			$scope.varName = 'DocType';
			$scope.pathTo  = '/docType';
			$scope.objName = $scope.docTypes;
			$scope.columns = 'docType';

		}else if($location.path() == '/tables/param_type')
		{
			$scope.varName = 'ParamType';
			$scope.pathTo  = '/paramType';
			$scope.objName = $scope.paramTypes;
			$scope.columns = 'paramType';

		}else if($location.path() == '/tables/param_value')
		{
			$scope.varName = 'ParamValue';
			$scope.pathTo  = '/paramValue';
			$scope.objName = $scope.paramValues;
			$scope.columns = 'paramValue';

			$scope.paramSelect = $scope.params;

		}else if($location.path() == '/tables/sys_param_values')
		{	$scope.table = 'sys_param_values';
			$scope.varName = 'SysParamValues';
			$scope.pathTo  = '/sysParamValues';
			$scope.objName = $scope.sysParamValues;
			$scope.columns = 'sysParamValues';


		}





		$scope.getColumns = function(){

			$http.get('/columns/' + $scope.columns).
				success(function(data, status, headers, config) {
					$scope.columns = data;
					$scope.t_headers = data;
				}).
				error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
		};

		$scope.getColumns();
		//crud

		// delete
		$scope.deleteParam = function(param,index){

			var ays = confirm('Are you sure you want to delete this parameter ?');
			if (ays == true) {
				var par = ParamData.delete({id : param.id,_token:CSRF_TOKEN},function(){
					par.id = param.id;
					//removing from view
					$scope.objName.splice($scope.objName.indexOf(param),1);
				});
			}else{alert('You canceled..');}
		};

		//add row
		$scope.addParam = function() {
			$http.get($scope.pathTo)
				.success(function(data, status, headers, config) {

					//grabbing the last id in database..if empty starts with one.need to change it to start from real last
					var lastValue;
					var lastKey = Object.keys(data).reverse()[0];
					if(!lastKey){
						lastValue = 0;
					}else{
						lastValue = data[lastKey].id;
					}

					/* yoni the great */
					$scope.inserted = {};

					for (var column_name in data[0]) {
						$scope.inserted[column_name] = (column_name == 'id') ? lastValue+1 : '';
					}

					//adding to view
					$scope.objName.push($scope.inserted);

				}).
				error(function(data, status, headers, config) {
					console.log('error');
				});
		};

//save new or edited
		$scope.saveParam = function(data, id) {
			//$scope.user not updated yet
			angular.extend(data, {id: id});
			$http.post($scope.pathTo, {user:data,_token:CSRF_TOKEN,from:'tables'}).success( function(){
			});

		};

		/*ngOptions get options*/
		//$scope.groups = {};
		//$scope.loadGroups = function(param) {
		//	return $scope.groups.length ? null : $http.get('/' + $scope.select_type[param]).success(function(data) {
		//		$scope.groups[param] = data;
        //
        //
		//	});
		//};
		$scope.groups = {};
		$scope.loadGroups = function(paramName, docParamId) {

			if (typeof $scope.groups[paramName] == 'undefined') $scope.groups[paramName] = [];
			return $scope.groups[paramName].length ? null : $http.get('/param/'+ paramName + '/' + docParamId).success(function(data) {
				$scope.groups[paramName] = data;
			});
		};
		$scope.showValues = function(val){
			console.log(val);
		};
		/*ngOptions show options*/
		$scope.showGroup = function(param) {

			if(param.type_id && $scope.groups.length) {
				var selected = $filter('filter')($scope.groups, {id: param.type_id});
				return selected.length ? selected[0].text : 'Not set';
			} else {
				return param.type_id || 'Not set';
			}
		};







		$scope.userStatuses = [
			{id: 'active', name: 'active'},
			{id: 'inactive', name: 'inactive'}
		];


		$scope.setStatus = function(status) {
			console.log(status);

			$.post('/setStatus', {status:status,_token:CSRF_TOKEN,from:'tables'}).success(function(callBack){
				$scope.user.status = status;
				console.log(callBack);
			});
		};



	}])
	.controller('FilesCtrl', function ($scope, $modalInstance, user, CSRF_TOKEN) {
		$scope.user = user;

		$scope.ok = function () {
			$modalInstance.close();
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

		$scope.deleteImage = function(id,path,item){
			{
				$.ajax(
					{
						url:"/deleteImage",
						type: 'POST',
						data:{
							path: path,
							id:id,
							_token: CSRF_TOKEN
						},
						success: function(data)
						{
							$scope.user.files.user_photo.paramValue = 'img/No-Photo.gif';
							// delete $scope.user.files[item];
							// $scope.$apply();
						}
					}).done($scope.user.files.user_photo.paramValue = 'img/No-Photo.gif');
			};
		};

		$scope.flowOp = function(key){
			return  {target: '/upload',  query: {'_token': CSRF_TOKEN, param_ref: key}};
		};
		$scope.$on('flow::fileSuccess', function (event, $flow, $file, $message) {
		
		})
	})
	//.controller('ModalInstanceCtrl', function ($scope, $modalInstance, user, post) {
    //
	//	$scope.user = user;
	//	$scope.post = post;
    //
	//	$scope.ok = function () {
	//		$modalInstance.close();
	//	};
    //
	//	$scope.cancel = function () {
	//		$modalInstance.dismiss('cancel');
	//	};
	//})
	.controller('PostModalInstanceCtrl', function ($scope,$http,$state, $modalInstance, job, CSRF_TOKEN, $filter) {

		$scope.getPost = function(id){
			$http.get('/job/'+id ).
				success(function(data, status, headers, config) {
					$scope.post = data;
				}).
				error(function(data, status, headers, config) {

				});
		};

		$scope.savePost = function(post) {
			console.log(post);
			$http.post('/savePost', {
				post:post,
				_token:CSRF_TOKEN,
				from:'jobPost'
			}).success(function(errors){
				$scope.allPosts.push(post);
				return post;

			}).error(function(err) {



			});
		};

		$scope.post = $scope.getPost(job);


		$scope.addWhenEdit =function(docParam,$index) {

			$http.get('/columns/jobPost')
				.success(function(data, status, headers, config) {
					$scope.inserted = data[docParam];
					if(!(angular.isArray($scope.post[docParam]))){
						$scope.post[docParam] = Array($scope.post[docParam],$scope.inserted);
					}else{
						$scope.post[docParam].push($scope.inserted);
					}

				})
				.error(function(){
					alert('ERROR!!');
				});

		};




		$scope.groups = {};

		$scope.loadGroups = function(paramName, docParamId, isPost ) {
			console.log(docParamId);
			if (typeof $scope.groups[paramName] == 'undefined') $scope.groups[paramName] = [];
			return $scope.groups[paramName].length ? null : $http.get('/param/'+ paramName + '/' + docParamId + (isPost ? '/true' : '') ).success(function(data) {
				$scope.groups[paramName] = data;
			});
			console.log($scope.groups);
		};

		$scope.loadIterableGroups = function(paramName, docParamId, index) {

			if (typeof $scope.groups[index] == 'undefined') $scope.groups[index] = [];
			if (typeof $scope.groups[index][paramName] == 'undefined') $scope.groups[index][paramName] = [];
			return $scope.groups[index][paramName].length ? null : $http.get('/param/'+ paramName + '/' + docParamId).success(function(data) {
				$scope.groups[index][paramName] = data;
				console.log($scope.groups);
			});
		};

		$scope.showGroup = function(paramKey, docParamName) {

			if($scope.post[docParamName][paramKey]['paramValue'] && typeof $scope.groups[paramKey] != 'undefined') {
				var selected = $filter('filter')($scope.groups[paramKey], {value: $scope.post[docParamName][paramKey]['paramValue']});
				return selected.length ? selected[0].text : 'Not set1';
			} else {
				//console.log($scope.post[docParamName][paramKey]['paramValue']);
				return $scope.post[docParamName][paramKey]['paramValue'] || 'Not set1';
			}
		};

		$scope.showIterableGroup = function(paramKey, docParamName, index) {

			if($scope.post[docParamName][index][paramKey]['paramValue'] && typeof $scope.groups[paramKey] != 'undefined') {
				var selected = $filter('filter')($scope.groups[paramKey], {value: $scope.post[docParamName][index][paramKey]['paramValue']});
				return selected.length ? selected[0].text : 'Not set';
			} else {
				//console.log($scope.post[docParamName][index][paramKey]['paramValue']);
				return $scope.post[docParamName][index][paramKey]['paramValue'] || '';
			}
		};

		$scope.showChecklistGroup = function(paramKey, docParamName) {


			if (typeof $scope.post[docParamName][paramKey]['paramValue'] !== 'undefined' && $scope.post[docParamName][paramKey]['paramValue'] !== null) {
				if($scope.post[docParamName][paramKey]['paramValue'].length > 0) {

					return  $scope.post[docParamName][paramKey]['paramValue'];
				}
				return  $scope.post[docParamName][paramKey]['paramValue'];
			}
			var	selected = [];


			angular.forEach($scope.groups[paramKey], function(option) {
				if ($scope.post[docParamName][paramKey]['paramValue'].indexOf(option.value) >= 0) {
					selected.push(option.text);
				}
			});

			return selected.length ? selected.join(', ') : 'Not set';
		};

		$scope.showIterableChecklistGroup = function(paramKey, docParamName, index) {


			if (typeof $scope.post[docParamName][index][paramKey]['paramValue'] !== 'undefined' && $scope.post[docParamName][index][paramKey]['paramValue'] !== null) {
				return  $scope.post[docParamName][index][paramKey]['paramValue'] ?  $scope.post[docParamName][index][paramKey]['paramValue'].join(', ') : ' ';
			}
			var	selected = [];


			angular.forEach($scope.groups[paramKey], function(option) {
				if ($scope.post[docParamName][index][paramKey]['paramValue'].indexOf(option.value) >= 0) {
					selected.push(option.text);
				}
			});

			return selected.length ? selected.join(', ') : 'Not set';
		};

		$scope.remove = function(array,item) {
			array.splice(item,1);
			$http.post('/deleteIterable', {docParam:array,post:$scope.post,_token:CSRF_TOKEN}).
				then(function(response) {

				}, function(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
		};

		// DatePicker

		$scope.today = function() {
			$scope.dt = new Date();
		};
		$scope.today();

		$scope.clear = function () {
			$scope.dt = null;
		};

		// Disable weekend selection
		$scope.disabled = function(date, mode) {
			return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		};

		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};
		$scope.toggleMin();
		$scope.maxDate = new Date(2020, 5, 22);

		$scope.opened = [];

		$scope.open = function($event,paramKey) {
			console.log(paramKey);
			$scope.opened[paramKey] = true;
			console.log(paramKey);


		};
		$scope.openedIterable =[];
		$scope.openIterable = function($event,paramKey,index) {
			$scope.openedIterable[index] = []
			$scope.openedIterable[index][paramKey] = true;
		};

		$scope.setDate = function(year, month, day) {
			$scope.dt = new Date(year, month, day);
		};

		$scope.dateOptions = {
			//datepicker-popup-template-url:'../xeditable/datePicker/html',
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];

		$scope.status = {
			opened: false
		};

		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		var afterTomorrow = new Date();
		afterTomorrow.setDate(tomorrow.getDate() + 2);
		$scope.events =
			[
				{
					date: tomorrow,
					status: 'full'
				},
				{
					date: afterTomorrow,
					status: 'partially'
				}
			];

		$scope.getDayClass = function(date, mode) {
			if (mode === 'day') {
				var dayToCheck = new Date(date).setHours(0,0,0,0);

				for (var i=0;i<$scope.events.length;i++){
					var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

					if (dayToCheck === currentDay) {
						return $scope.events[i].status;
					}
				}
			}

			return '';
		};






		$scope.move = function(array, fromIndex, toIndex){
			array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] );
		};


		$scope.ok = function () {
			$modalInstance.close();
			$state.go('^');
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
			$state.go('^');

		};
	})
	.controller('JobPostModalInstanceCtrl', function ($scope, $modalInstance, jobPost, $http, CSRF_TOKEN) {

		$scope.loadIterableGroups = function(paramName, docParamId, index) {

			if (typeof $scope.groups[index] == 'undefined') $scope.groups[index] = [];
			if (typeof $scope.groups[index][paramName] == 'undefined') $scope.groups[index][paramName] = [];
			return $scope.groups[index][paramName].length ? null : $http.get('/param/'+ paramName + '/' + docParamId).success(function(data) {
				$scope.groups[index][paramName] = data;
				console.log($scope.groups);
			});
		};

		$scope.showGroup = function(paramKey, docParamName) {

			if($scope.user[docParamName][paramKey]['paramValue'] && typeof $scope.groups[paramKey] != 'undefined') {
				var selected = $filter('filter')($scope.groups[paramKey], {value: $scope.user[docParamName][paramKey]['paramValue']});
				return selected.length ? selected[0].text : 'Not set';
			} else {
				//console.log($scope.user[docParamName][paramKey]['paramValue']);
				return $scope.user[docParamName][paramKey]['paramValue'] || 'Not set';
			}
		};

		$scope.showIterableGroup = function(paramKey, docParamName, index) {

			if($scope.user[docParamName][index][paramKey]['paramValue'] && typeof $scope.groups[paramKey] != 'undefined') {
				var selected = $filter('filter')($scope.groups[paramKey], {value: $scope.user[docParamName][index][paramKey]['paramValue']});
				return selected.length ? selected[0].text : 'Not set';
			} else {
				//console.log($scope.user[docParamName][index][paramKey]['paramValue']);
				return $scope.user[docParamName][index][paramKey]['paramValue'] || '';
			}
		};

		$scope.showChecklistGroup = function(paramKey, docParamName) {


			if (typeof $scope.user[docParamName][paramKey]['paramValue'] !== 'undefined' && $scope.user[docParamName][paramKey]['paramValue'] !== null) {
				if($scope.user[docParamName][paramKey]['paramValue'].length > 0) {

					return  $scope.user[docParamName][paramKey]['paramValue'].join(', ');
				}
				return  $scope.user[docParamName][paramKey]['paramValue'];
			}
			var	selected = [];


			angular.forEach($scope.groups[paramKey], function(option) {
				if ($scope.user[docParamName][paramKey]['paramValue'].indexOf(option.value) >= 0) {
					selected.push(option.text);
				}
			});

			return selected.length ? selected.join(', ') : 'Not set';
		};

		$scope.showIterableChecklistGroup = function(paramKey, docParamName, index) {


			if (typeof $scope.user[docParamName][index][paramKey]['paramValue'] !== 'undefined' && $scope.user[docParamName][index][paramKey]['paramValue'] !== null) {
				return  $scope.user[docParamName][index][paramKey]['paramValue'] ?  $scope.user[docParamName][index][paramKey]['paramValue'].join(', ') : ' ';
			}
			var	selected = [];


			angular.forEach($scope.groups[paramKey], function(option) {
				if ($scope.user[docParamName][index][paramKey]['paramValue'].indexOf(option.value) >= 0) {
					selected.push(option.text);
				}
			});

			return selected.length ? selected.join(', ') : 'Not set';
		};

		$scope.remove = function(array,item) {
			array.splice(item,1);
			$http.post('/deleteIterable', {docParam:array,user:$scope.user,_token:CSRF_TOKEN}).
				then(function(response) {

				}, function(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
		};
		$scope.move = function(array, fromIndex, toIndex){
			array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] )
		};

		$scope.loadGroups = function(paramName, docParamId, isPost ) {
			if (typeof $scope.groups[paramName] == 'undefined') $scope.groups[paramName] = [];
			return $scope.groups[paramName].length ? null : $http.get('/param/'+ paramName + '/' + docParamId + (isPost ? '/true' : '') ).success(function(data) {
				$scope.groups[paramName] = data;
			});
		};

		$scope.jobPost = jobPost;




		$scope.savePost = function(post) {
			console.log(post);
			$http.post('/savePost', {
				post:post,
				_token:CSRF_TOKEN,
				from:'jobPost'
			}).success(function(errors){


				return post;

			}).error(function(err) {



			});
		};

		$scope.ok = function () {
			$modalInstance.close();
			$state.go('^');
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
			$state.go('^');
		};
	})

	.controller('SomeCtrl', function($scope, $state,$modalInstance, $http, CSRF_TOKEN ) {

		$scope.getJobPostFields = function(){
			$http.get('/columns/jobPost').
				success(function(data, status, headers, config) {
					//console.log(data);


					$scope.jobPost = data;
				}).error(function(data, status, headers, config){

				});
		};

		$scope.getJobPostFields();
		$scope.groups = {};
		$scope.loadGroups = function(paramName, docParamId, isPost ) {
			if (typeof $scope.groups[paramName] == 'undefined') $scope.groups[paramName] = [];
			return $scope.groups[paramName].length ? null : $http.get('/param/'+ paramName + '/' + docParamId + (isPost ? '/true' : '') ).success(function(data) {
				$scope.groups[paramName] = data;
			});
			console.log($scope.groups);
		};

		$scope.add1 = function(docParamName,index) {
			$http.get('/columns/jobPost')
				.success(function(data, status, headers, config) {
					$scope.inserted = data[docParamName];
					if(!(angular.isArray($scope.jobPost[docParamName]))) {
						$scope.jobPost[docParamName] = Array($scope.jobPost[docParamName],$scope.inserted);
					} else{
						$scope.jobPost[docParamName].push($scope.inserted);
					}
				})
				.error(function(){

				});
		};

		$scope.savePost = function(post) {

			$http.post('/savePost', {
				post:post,
				_token:CSRF_TOKEN,
				from:'jobPost'
			}).success(function(errors){
				return post;
			}).error(function(err) {

			});
		};


		$scope.ok = function () {
			$modalInstance.close();

		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');

		};
	})

	.controller("UserHomeController",['$scope','$auth','$controller','UsersData','$http','$routeParams','DocParamData','ParamData','ParamValueData','SysParamValuesData','$state','CSRF_TOKEN','$location', '$stateParams','$uibModal', '$log','$filter','Account',
		function($scope,$auth,$controller,UsersData,$http,$routeParams,DocParamData,ParamData,ParamValueData,SysParamValuesData,$state,CSRF_TOKEN,$location,$stateParams,$uibModal,$log,$filter,Account) {



            //
			//Account.getProfile().then(function (response) {
			//	$scope.username = response.data.personal_information.first_name;
			//	$scope.user = response.data;
			//	//console.log('here?');
			//})







			//$scope.uploader = {
			//	controllerFn: function ($flow, $file, $message) {
			//		console.log($flow, $file, $message); // Note, you have to JSON.parse message yourself.
			//		$file.msg = $message;// Just display message for a convenience
			//	}
			//};
			$scope.initDatePicker = function(){

				//$('.datepicker').pickadate();


			}

			$scope.initModals = function() {
				$('.dropdown-button').dropdown({
						inDuration: 300,
						outDuration: 225,
						constrain_width: false, // Does not change width of dropdown to that of the activator
						hover: true, // Activate on hover
						gutter: -80, // Spacing from edge
						belowOrigin: false, // Displays dropdown below the button
						alignment: 'left' // Displays dropdown with edge aligned to the left of button
					}
				);
				$('.modal-trigger').leanModal({
					complete: function () {
						$('.lean-overlay').remove();
					}
				}); // Initialize the modals
			}

			//materialize datepicker
			var currentTime = new Date();
			$scope.currentTime = currentTime;
			$scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
			$scope.disable = [false, 1, 7];
			$scope.today = 'Today';
			$scope.clear = 'Clear';
			$scope.close = 'Close';
			var days = 15;
			$scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
			$scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
			$scope.onStart = function () {
				console.log('onStart');
			};
			$scope.onRender = function () {
				console.log('onRender');
			};
			$scope.onOpen = function () {
				console.log('onOpen');
			};
			$scope.onClose = function () {
				console.log('onClose');
			};
			$scope.onSet = function () {
				console.log('onSet');
			};
			$scope.onStop = function () {
				console.log('onStop');
			};
			//end materialize datepicker
			//var uploader = $scope.uploader = new FileUploader({
			//	url: '/uploadCv',
			//	//	autoUpload:true,
			//	queueLimit: 1,
			//	formData: [
			//		{ _token: CSRF_TOKEN,
			//			iteration:''
			//		},
			//	]
			//});
			//$scope.loadNewFile = function(url) {
			//	//pdfDelegate
			//	//	.$getByHandle('soprano')
			//	//	.load('/uploads/userCv/87/pdf.pdf');
			//};

			$scope.resetPdfUrl = function(key){
				$scope.hideInput = false;
				$scope.pdfing = false;
				$scope.pdfUrl = '';
				$scope.uploader.queue = [];
				document.getElementById('cvUpload').value = null;

			}
			// FILTERS

			//uploader.filters.push({
			//		name: 'customFilter',
			//		fn: function(item /*{File|FileLikeObject}*/, options) {
			//			$scope.hideInput = true;
			//			return this.queue.length < 10;
			//		}
			//	}
			//);

			//uploader.filters.push({
			//	name: 'imageFilter',
			//	fn: function(item /*{File|FileLikeObject}*/, options) {
			//		var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
			//		return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
			//	}
			//});
			// CALLBACKS

		//	uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
		//		console.info('onWhenAddingFileFailed', item, filter, options);
		//		$scope.pdfing = true;
        //
		//	};
		//	uploader.onAfterAddingFile = function(fileItem) {
		//		console.info('onAfterAddingFile', fileItem);
		//		//$scope.pdfUrl = fileItem._file;
		//		//angular.forEach(fileItem, function(value, key) {
		//		//	console.log(key + ': ' + value);
		//		//	$scope.fileItem = value;
		//		//});
		//		angular.forEach(fileItem.uploader.queue[0], function(value, key) {
		//			console.log(key + ': ' + value);
		//			$scope.fileItem = value;
		//		});
		//		//angular.forEach(fileItem.file, function(value, key) {
		//		//	console.log(key + ': ' + value);
		//		//	$scope.fileItem = value;
		//		//});
		//		//console.log(fileItem._file);
		//	};
		//	uploader.onAfterAddingAll = function(addedFileItems) {
		//		console.info('onAfterAddingAll', addedFileItems);
		//	};
		//	uploader.onBeforeUploadItem = function(item) {
		//		console.info('onBeforeUploadItem', item);
		//		//$scope.hideInput = true;
		//		$scope.pdfing = true;
		//	};
		//	uploader.onProgressItem = function(fileItem, progress) {
		//		console.info('onProgressItem', fileItem, progress);
		//	};
		//	uploader.onProgressAll = function(progress) {
		//		console.info('onProgressAll', progress);
		//	};
		//	uploader.onSuccessItem = function(fileItem, response, status, headers) {
		//		console.info('onSuccessItem', fileItem, response, status, headers);
		//		$scope.pdfUrl = '../../'+response;
		//	};
		//	uploader.onErrorItem = function(fileItem, response, status, headers) {
		//		console.info('onErrorItem', fileItem, response, status, headers);
		//	};
		//	uploader.onCancelItem = function(fileItem, response, status, headers) {
		//		console.info('onCancelItem', fileItem, response, status, headers);
		//	};
		//	uploader.onCompleteItem = function(fileItem, response, status, headers) {
		//		console.info('onCompleteItem', fileItem, response, status, headers);
        //
		//	};
		//	uploader.onCompleteAll = function() {
		//		console.info('onCompleteAll');
		//	};
		//$scope.openLeftMenu = function() {
		//				$scope.menuOpen = !$scope.menuOpen;
		//};
		$scope.getJobPostFields = function(){
			$http.get('/columns/jobPost').
				success(function(data, status, headers, config) {
					$scope.jobPost = data;
				}).error(function(data, status, headers, config){
				});
		};
		//$scope.getJobPostFields();

		$scope.getPost = function(id){
			$http.get('/job/'+id ).
				success(function(data, status, headers, config) {
					$scope.post = data;
					$state.go(
						'job',
						{
							jobId:id,
						} // this goes into $stateParams for
						// state 'some'
					);
					console.log($state);

				}).
				error(function(data, status, headers, config) {

				});
		};
		$scope.savePost = function(post) {
				console.log(post);
				$http.post('/savePost', {
					post:post,
					_token:CSRF_TOKEN,
					from:'jobPost'
				}).success(function(errors){
					$scope.allJobs.push(post);
					return post;

				}).error(function(err) {



				});
		};





		$scope.groups = {};
		$scope.loadGroups = function(paramName, docParamId) {

			if (typeof $scope.groups[paramName] == 'undefined') $scope.groups[paramName] = [];
			return $scope.groups[paramName].length ? null : $http.get('/param/'+ paramName + '/' + docParamId).success(function(data) {
				$scope.groups[paramName] = data;
			});
		};

		$scope.loadIterableGroups = function(paramName, docParamId, index) {

			if (typeof $scope.groups[index] == 'undefined') $scope.groups[index] = [];
			if (typeof $scope.groups[index][paramName] == 'undefined') $scope.groups[index][paramName] = [];
			return $scope.groups[index][paramName].length ? null : $http.get('/param/'+ paramName + '/' + docParamId).success(function(data) {
				$scope.groups[index][paramName] = data;

			});
		};

		$scope.showGroup = function(paramKey, docParamName) {

			if($scope.user[docParamName][paramKey]['paramValue'] && typeof $scope.groups[paramKey] != 'undefined') {
				var selected = $filter('filter')($scope.groups[paramKey], {value: $scope.user[docParamName][paramKey]['paramValue']});
				return selected.length ? selected[0].text : 'Not set';
			} else {
				//console.log($scope.user[docParamName][paramKey]['paramValue']);
				return $scope.user[docParamName][paramKey]['paramValue'] || 'Not set';
			}
		};

		//$scope.showIterableGroup = function(paramKey, docParamName, index) {
        //
		//	if($scope.user[docParamName][index][paramKey]['paramValue'] && typeof $scope.groups[paramKey] != 'undefined') {
		//		var selected = $filter('filter')($scope.groups[paramKey], {value: $scope.user[docParamName][index][paramKey]['paramValue']});
		//		return selected.length ? selected[0].text : 'Not set';
		//	} else {
		//		//console.log($scope.user[docParamName][index][paramKey]['paramValue']);
		//		return $scope.user[docParamName][index][paramKey]['paramValue'] || '';
		//	}
		//};

		$scope.showChecklistGroup = function(paramKey, docParamName) {


			if (typeof $scope.user[docParamName][paramKey]['paramValue'] !== 'undefined' && $scope.user[docParamName][paramKey]['paramValue'] !== null) {
				if($scope.user[docParamName][paramKey]['paramValue'].length > 0) {

					return  $scope.user[docParamName][paramKey]['paramValue'].join(', ');
				}
				return  $scope.user[docParamName][paramKey]['paramValue'];
			}
			var	selected = [];


			angular.forEach($scope.groups[paramKey], function(option) {
				if ($scope.user[docParamName][paramKey]['paramValue'].indexOf(option.value) >= 0) {
					selected.push(option.text);
				}
			});

			return selected.length ? selected.join(', ') : 'Not set';
		};

		$scope.showIterableChecklistGroup = function(paramKey, docParamName, index) {


			if (typeof $scope.user[docParamName][index][paramKey]['paramValue'] !== 'undefined' && $scope.user[docParamName][index][paramKey]['paramValue'] !== null) {
				return  $scope.user[docParamName][index][paramKey]['paramValue'] ?  $scope.user[docParamName][index][paramKey]['paramValue'].join(', ') : ' ';
			}
			var	selected = [];


			angular.forEach($scope.groups[paramKey], function(option) {
				if ($scope.user[docParamName][index][paramKey]['paramValue'].indexOf(option.value) >= 0) {
					selected.push(option.text);
				}
			});

			return selected.length ? selected.join(', ') : 'Not set';
		};






		$scope.remove = function(array,item) {
			array.splice(item,1);
			$http.post('/deleteIterable', {docParam:array,user:$scope.user,_token:CSRF_TOKEN}).
				then(function(response) {

				}, function(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});




		};
		$scope.move = function(array, fromIndex, toIndex){
			array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] )
		};

		$scope.showGroup = function(user) {
			if(user.group && $scope.groups.length) {
				var selected = $filter('filter')($scope.groups, {id: user.group});
				return selected.length ? selected[0].text : 'Not set';
			} else {
				return user.groupName || 'Not set';
			}
		};


		$scope.isCollapsed = true;

		$scope.getAuthId = function(){
			$http.get('/getAuthId').
				success(function(data, status, headers, config) {
					$scope.getUser(data);
					$scope.userId = data;

				});
		};
		$scope.getUser = function(id){
			$http.get('/users/'+id).
				success(function(data, status, headers, config) {
					$scope.user = data;
					//console.log($scope.user['career_goals'][33]['paramValue']);

					//if($scope.user['career_goals'][33]['paramValue'] != '' || $scope.user['career_goals'][33]['paramValue']!= null){
					//	$scope.pdfing = true;
					//	$scope.pdfUrl ='/'+ $scope.user['career_goals'][33]['paramValue'];
                     //   //
					//	//pdfDelegate
					//	//	.$getByHandle('my-pdf-container')
					//	//	.load($scope.pdfUrl);
					//}else{
					//	$scope.pdfing = false;
					//}





					$stateParams.user = $scope.user;
					$scope.next_keys = [];
					var prev_key = false;

					for(var key in $scope.user) {
						if(!prev_key) {
							prev_key = key;
						} else {
							$scope.next_keys[prev_key] = key;
							prev_key = key;
							$scope.next = key;
						}
					}
					//console.log($scope.next_keys);
				}).
				error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
		};

			$scope.resetPdfUrl = function(key){
				$scope.hideInput = false;
				$scope.pdfing = false;
				$scope.pdfUrl = '';
				$scope.uploader.queue = [];
				document.getElementById('cvUpload').value = null;

			}

		$scope.items = ['item1', 'item2', 'item3'];

		$scope.animationsEnabled = true;

		//$scope.open = function (size) {
        //
		//	var modalInstance = $uibModal.open({
		//		animation: $scope.animationsEnabled,
		//		templateUrl: 'myModalContent.html',
		//		size: size,
        //
		//		resolve: {
		//			user: function () {
		//				return $scope.user;
		//			},
		//			post: function () {
		//				return $scope.post;
		//			}
		//		},
		//		controller: 'ModalInstanceCtrl',
		//	});
        //
		//	modalInstance.result.then(function (selectedItem) {
		//		$scope.selected = selectedItem;
		//	}, function () {
		//		$log.info('Modal dismissed at: ' + new Date());
		//	});
		//};
		$scope.openNewJob = function (size) {

				console.log("UserHomeController");
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'newJob.html',
				size: size,

				resolve: {
					jobPost: function () {
						return $scope.jobPost;
					},

				},
				controller: 'JobPostModalInstanceCtrl',
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
//Aside

		//$scope.asideState = {
		//	open: true
		//};

		//$scope.openAside = function(position, backdrop) {
        //
        //
        //
		//	$scope.asideState = {
		//		open: true,
		//		position: 'left'
		//	};
        //
		//	function postClose() {
		//		$scope.asideState.open = false;
		//	}
        //
		//	$aside.open({
		//		templateUrl: '../partials/jobseeker_aside.html',
		//		placement: position,
		//		size: 'sm',
		//		backdrop: backdrop,
		//		resolve: {
		//			user: function () {
		//				return $scope.user;
		//			}
		//		},
		//		controller: function($scope, $modalInstance, user) {
		//			$scope.user = user;
        //
		//			$scope.ok = function(e) {
		//				$modalInstance.close();
		//				e.stopPropagation();
        //
		//			};
		//			$scope.cancel = function(e) {
		//				$modalInstance.dismiss();
		//				e.stopPropagation();
		//			};
		//			$scope.cancelOnResize = function() {
		//				$modalInstance.dismiss();
        //
		//			};
		//			$(window).resize(function(){
        //
		//				//console.log(window.innerWidth);
		//				$scope.$apply(function(){
		//					$scope.cancelOnResize();
		//				});
		//			});
		//		}
		//	}).result.then(postClose, postClose);
		//}
        //
		//$scope.openEmployerAside = function(position, backdrop) {
        //
        //
        //
		//	$scope.asideState = {
		//		open: true,
		//		position: 'left'
		//	};
        //
		//	function postClose() {
		//		$scope.asideState.open = false;
		//	}
        //
		//	$aside.open({
		//		templateUrl: '../partials/employer_aside.html',
		//		placement: position,
		//		size: 'sm',
		//		backdrop: backdrop,
		//		resolve: {
		//			user: function () {
		//				return $scope.user;
		//			}
		//		},
		//		controller: function($scope, $modalInstance, user) {
		//			$scope.user = user;
		//			console.log(user);
		//			$scope.ok = function(e) {
		//				$modalInstance.close();
		//				e.stopPropagation();
        //
		//			};
		//			$scope.cancel = function(e) {
		//				$modalInstance.dismiss();
		//				e.stopPropagation();
		//			};
		//			$scope.cancelOnResize = function() {
		//				$modalInstance.dismiss();
        //
		//			};
		//			$(window).resize(function(){
        //
		//				//console.log(window.innerWidth);
		//				$scope.$apply(function(){
		//					$scope.cancelOnResize();
		//				});
		//			});
		//		}
		//	}).result.then(postClose, postClose);
		//}



		//$scope.openJobseekerRegisterAside = function(position, backdrop) {
        //
        //
        //
		//	$scope.asideState = {
		//		open: true,
		//		position: 'left'
		//	};
        //
		//	function postClose() {
		//		$scope.asideState.open = false;
		//	}

		//	$aside.open({
		//		templateUrl: '../partials/register/jobseeker/jobseeker_register_aside.html',
		//		placement: position,
		//		size: 'sm',
		//		backdrop: backdrop,
		//		resolve: {
		//			user: function () {
		//				return $scope.user;
		//			}
		//		},
		//		controller: function($scope, $modalInstance, user) {
		//			$scope.user = user;
		//			console.log(user);
		//			$scope.ok = function(e) {
		//				$modalInstance.close();
		//				e.stopPropagation();
        //
		//			};
		//			$scope.cancel = function(e) {
		//				$modalInstance.dismiss();
		//				e.stopPropagation();
		//			};
		//			$scope.cancelOnResize = function() {
		//				$modalInstance.dismiss();
        //
		//			};
		//			$(window).resize(function(){
        //
		//				//console.log(window.innerWidth);
		//				$scope.$apply(function(){
		//					$scope.cancelOnResize();
		//				});
		//			});
		//		}
		//	}).result.then(postClose, postClose);
		//}


		//$scope.openGallery = function (size) {
        //
		//	var modalInstance = $uibModal.open({
		//		animation: $scope.animationsEnabled,
		//		templateUrl: 'gallery.html',
        //
		//		controller: 'FilesCtrl',
		//		resolve: {
		//			user: function () {
		//				return $scope.user;
		//			}
		//		},
		//	});
        //
		//	modalInstance.result.then(function (selectedItem) {
		//		$scope.selected = selectedItem;
		//	}, function () {
		//		$log.info('Modal dismissed at: ' + new Date());
		//	});
		//};

		$scope.isArray = angular.isArray;
		$scope.oneAtATime = true;
		$scope.allJobs = {};
		$.getJSON('/getAllJobs', function(data){

			$scope.$apply(function(){
				$scope.allJobs = data;
			});
		});

		//image upload
		$scope.flowOp = function(key){
			return {target: '/upload',  query: {'_token': CSRF_TOKEN, param_ref: key}};
		};
		//getting the "callback"
		$scope.getFileInfo = function($file, $message, $flow){
			$scope.user.files[27]['paramValue'] = $flow;
			//console.log($file, $message, $flow);
		}

		//$scope.userStatuses = [
		//	{id: 'active', name: 'active'},
		//	{id: 'inactive', name: 'inactive'}
		//];
		$scope.setStatus = function(status) {
				$scope.user.personal_information.status = status.name;
				$.post('/setStatus',{status:status.name,_token:CSRF_TOKEN,}).success(function(callBack){
			});
		};
		$scope.footerNavlis = [
			{id: '1', tag:'Resumes'},
			{id: '2', tag:'Certifications'},
			{id: '3', tag:'References '},
			{id: '4', tag:'Gallery '},
			{id: '5', tag:'Cover '},
		];
		// $scope.oneAtATime = true;
		$scope.nextDoc = function(doc){

		if($scope.next_keys[doc]){
			console.log($scope.next_keys[doc]);
				//$scope.cancelOnResize();
				$scope.doc = $scope.next_keys[doc];

				return $scope.doc ;
			}else{
				return false ;
			}

		};
		$scope.getAuthId();
		$scope.addItem = function() {
			var newItemNo = $scope.items.length + 1;
			$scope.items.push('Item ' + newItemNo);
		};
		$scope.saveUser = function(user) {

			return $http.post('/users',{
				user:user,
				_token:CSRF_TOKEN,
				from:'userHome'
			}).success(function(v){


			}).error(function(err) {
				if(err.field && err.msg) {
					// err like {field: "name", msg: "Server-side error for this username!"}
					$scope.editableForm.$setError(err.field, err.msg);
				} else {
					// unknown error
					$scope.editableForm.$setError('name', 'Unknown error!');
				}
			});
		};


		$scope.deleteImage = function(id,path,item){
			{
				$.ajax(
					{
						url:"/deleteImage",
						type: 'POST',
						data:{
							path: path,
							id:id,
							_token: CSRF_TOKEN
						},
						success: function(data)
						{
							$scope.user.files[27]['paramValue'] = 'img/No-Photo.gif';
							// delete $scope.user.files[item];
							// $scope.$apply();
						}
					}).done($scope.user.files[27]['paramValue'] = 'img/No-Photo.gif');
			};
		};
// DatePicker

		$scope.today = function() {
			$scope.dt = new Date();
		};
		$scope.today();

		$scope.clear = function () {
			$scope.dt = null;
		};

		// Disable weekend selection
		$scope.disabled = function(date, mode) {
			return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		};

		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};
		$scope.toggleMin();
		$scope.maxDate = new Date(2020, 5, 22);

		$scope.opened = [];

		$scope.open = function($event,paramKey) {

			$scope.opened[paramKey] = true;



		};
		$scope.openedIterable =[];
		$scope.openIterable = function($event,paramKey,index) {
			$scope.openedIterable[index] = []
			$scope.openedIterable[index][paramKey] = true;
		};

		$scope.setDate = function(year, month, day) {
			$scope.dt = new Date(year, month, day);
		};

		$scope.dateOptions = {
			//datepicker-popup-template-url:'../xeditable/datePicker/html',
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];

		$scope.status = {
			opened: false
		};

		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		var afterTomorrow = new Date();
		afterTomorrow.setDate(tomorrow.getDate() + 2);
		$scope.events =
			[
				{
					date: tomorrow,
					status: 'full'
				},
				{
					date: afterTomorrow,
					status: 'partially'
				}
			];

		$scope.getDayClass = function(date, mode) {
			if (mode === 'day') {
				var dayToCheck = new Date(date).setHours(0,0,0,0);

				for (var i=0;i<$scope.events.length;i++){
					var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

					if (dayToCheck === currentDay) {
						return $scope.events[i].status;
					}
				}
			}

			return '';
		};

		$scope.add = function(doc_param_key,param_key,index) {
			$http.get('/users/'+ $scope.userId)
				.success(function(data, status, headers, config) {
					$scope.inserted = data[doc_param_key];
					if(!(angular.isArray($scope.user[doc_param_key]))){
						$scope.user[doc_param_key] = Array($scope.user[doc_param_key],$scope.inserted);
					} else{

						$scope.user[doc_param_key].push($scope.inserted);
					}
				})
				.error(function(){

				});
		};

		$scope.addWhenEdit = function(docParam,$index) {

			$http.get('/columns/register_jobseeker')
				.success(function(data, status, headers, config) {
					$scope.inserted = data[docParam];
					if(!(angular.isArray($scope.user[docParam]))){
						$scope.user[docParam] = Array($scope.user[docParam],$scope.inserted);
					}else{
						$scope.user[docParam].push($scope.inserted);

					}

				})
				.error(function(){
					alert('ERROR!!');
				});
		};


		$scope.addRecordEmployer =function(docParam,$index) {

			$http.get('/columns/register_employer')
				.success(function(data, status, headers, config) {

					$scope.inserted = data[docParam];

					if(!(angular.isArray($scope.user[docParam]))){
						$scope.user[docParam] = Array($scope.user[docParam],$scope.inserted);

					}else{
						$scope.user[docParam].push($scope.inserted);

					}

				})
				.error(function(){
					alert('ERROR!!');
				});
		};




		$scope.genders = [
			{value: 'male', text: 'Male'},
			{value: 'female', text: 'Female'},

		];


		$scope.martialStatuses = [
			{value: 'married', text: 'Marrired'},
			{value: 'single', text: 'Single'},
			{value: 'divorced', text: 'Divorced'},
			{value: 'widdowed', text: 'Widdowed'},

		];

		$scope.educationStatuses = [
			{value: 'student', text: 'Student'},
			{value: 'graduate', text: 'Graduate'},
			{value: 'intern', text: 'Intern'},


		];



		$scope.selected = undefined;

		// Any function returning a promise object can be used to load values asynchronously
		$scope.getLocation = function(val) {
			return $http.get('//maps.googleapis.com/maps/api/geocode/json?language=en', {
				params: {
					address: val,
					sensor: false,
				}
			}).then(function(response){

				return response.data.results.map(function(item){
					return item.formatted_address;
				});
			});
		};

		$scope.statesWithFlags = [{'name':'Alabama','flag':'5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'},{'name':'Alaska','flag':'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'},{'name':'Arizona','flag':'9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'},{'name':'Arkansas','flag':'9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'},{'name':'California','flag':'0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'},{'name':'Colorado','flag':'4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'},{'name':'Connecticut','flag':'9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'},{'name':'Delaware','flag':'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'},{'name':'Florida','flag':'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'},{'name':'Georgia','flag':'5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'},{'name':'Hawaii','flag':'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'},{'name':'Idaho','flag':'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'},{'name':'Illinois','flag':'0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'},{'name':'Indiana','flag':'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'},{'name':'Iowa','flag':'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'},{'name':'Kansas','flag':'d/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'},{'name':'Kentucky','flag':'8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'},{'name':'Louisiana','flag':'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'},{'name':'Maine','flag':'3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'},{'name':'Maryland','flag':'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'},{'name':'Massachusetts','flag':'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'},{'name':'Michigan','flag':'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'},{'name':'Minnesota','flag':'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'},{'name':'Mississippi','flag':'4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'},{'name':'Missouri','flag':'5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'},{'name':'Montana','flag':'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'},{'name':'Nebraska','flag':'4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'},{'name':'Nevada','flag':'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'},{'name':'New Hampshire','flag':'2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'},{'name':'New Jersey','flag':'9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'},{'name':'New Mexico','flag':'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'},{'name':'New York','flag':'1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'},{'name':'North Carolina','flag':'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'},{'name':'North Dakota','flag':'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'},{'name':'Ohio','flag':'4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'},{'name':'Oklahoma','flag':'6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'},{'name':'Oregon','flag':'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'},{'name':'Pennsylvania','flag':'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'},{'name':'Rhode Island','flag':'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'},{'name':'South Carolina','flag':'6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'},{'name':'South Dakota','flag':'1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'},{'name':'Tennessee','flag':'9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'},{'name':'Texas','flag':'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'},{'name':'Utah','flag':'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'},{'name':'Vermont','flag':'4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'},{'name':'Virginia','flag':'4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'},{'name':'Washington','flag':'5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'},{'name':'West Virginia','flag':'2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'},{'name':'Wisconsin','flag':'2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'},{'name':'Wyoming','flag':'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'}];
		$scope.countries  = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', '$_[', 'Croatia', 'Curaçao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Barthélemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'USA', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];
		$scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

	}])





//.controller("RegisterController",['$scope','$rootScope','$stateParams','ParamData','DocParamData','$http','UsersData','DocTypeData','ParamTypeData','$location','$state','$filter', function($scope,$rootScope,$stateParams,ParamData,DocParamData,$http,UsersData,DocTypeData,ParamTypeData,$location,$state,$filter) {
//
//		'use strict';
//		console.log('register');
//
//
//		/*parameterSetup*/
//		var type = $stateParams.type;
//		var sub_type = $stateParams.sub_type;
//		$scope.type = $stateParams.type;
//
//		/* getting the education type for a jobseeker from ui-router */
//		$scope.jobseeker_type = $stateParams.sub_type;
//
//
//		var state = $location.path();
//		var absUrl = $location.absUrl();
//		absUrl = absUrl.split('/');
//		//$scope.jobseeker_type = absUrl[5]
//		//$scope.jobseeker_type = $scope.jobseeker_type.replace('#','');
//		absUrl = absUrl[4];
//		absUrl = absUrl.replace('#','');
//		$scope.absUrl = absUrl;
//
//		state = state.split('/');
//		state = state[1];
//
//		var locationSubtype = $state.current.name;
//
//		var prefix = locationSubtype;
//		prefix = prefix.split('.');
//		prefix = prefix[0];
//
//		//if($location.absUrl().indexOf("jobseeker") > -1) {
//		//	locationSubtype = 'jobseeker';
//        //
//		//}else if($location.absUrl().indexOf("employer") > -1) {
//		//	locationSubtype = 'employer';
//        //
//		//}
//
//		locationSubtype = $state.current.name;
//		//$scope.steps = $rootScope.steps;
//
//
//		/*end of parameters setup*/
//
//		$scope.nextDoc = function(doc){
//
//			if($scope.next_keys[doc]){
//				$scope.doc = $scope.next_keys[doc];
//				return $scope.doc ;
//			}else{
//				return false ;
//			}
//		};
//
//		$scope.next_keys =Array();
//		var prev_key = false;
//			for (var key in $scope.steps) {
//				if($scope.steps[key]['belongsTo'] ==  $scope.type){
//
//
//
//					if (!prev_key) {
//						prev_key = $scope.steps[key].value;
//					} else {
//						$scope.next_keys[prev_key] = $scope.steps[key].value;
//						prev_key = $scope.steps[key].value;
//						$scope.next = $scope.steps[key].value;
//						$scope.nextDoc();
//
//					}
//				}
//
//			}
//		console.log($scope.next_keys);
//
//		$scope.getForms = function() {
//			$http.get('api/forms/register_' + $stateParams.type).
//				success(function (data, status, headers, config) {
//					$scope.user = data;
//					$scope.user['personal_information']['education_status'] = $stateParams.sub_type;
//					$scope.user['personal_information']['subtype'] = $stateParams.type;
//				});
//		}
//		$scope.getForms();
//
//	}])
//
//

//		//}
//
//		$scope.resetPdfUrlIterable = function(key){
//			$scope.hideInput[key] = false;
//			$scope.pdfing[key] = false;
//			$scope.uploader[key].queue = [];
//			document.getElementById('cvUpload'+ key).value = null;
//		}
//
//		var state = $location.path();
//		var absUrl = $location.absUrl();
//		absUrl = absUrl.split('/');
//		$scope.jobseeker_type = absUrl[5]
//
//		if(typeof($scope.jobseeker_type) != 'undefined'){
//			$scope.jobseeker_type = $scope.jobseeker_type.replace('#','');
//		}
//
//		absUrl = absUrl[4];
//		absUrl = absUrl.replace('#','');
//		$scope.absUrl = absUrl;
//		state = state.split('/');
///	.controller('formController', function($rootScope,$window,$scope,$location,DocParamData,$state,$http,$filter,CSRF_TOKEN,$uibModal,$log,moment,$timeout,$anchorScroll,$auth,$stateParams,SelectOptions) {
//		'use strict';
//
//		console.log('form');
//
//		$scope.groups={};
//		$scope.loadGroups = function() {
//
//			SelectOptions.getAllOptionValues().then(function(options){
//				$scope.groups = options.data;
//				console.log($scope.groups );
//			});
//
//		};
//		$scope.loadGroups();
//
//
//
//
//
//
//		$scope.signup = function() {
//
//
//
//			$auth.signup($scope.user)
//				.success(function(response) {
//					$auth.setToken(response.token);
//
//					$state.go(prefix+'.'+$scope.nextDoc($scope.docParam));
//					//$location.path('/');
//					//toastr.info('You have successfully created a new account and have been signed-in');
//				})
//				.error(function(response) {
//					$scope.errors = response;
//					console.log(response)
//					//toastr.error(response.data.message);
//				});
//		};
//
//
//
//		$scope.docParam = $state.current.name.split('.');
//		$scope.docParam = $scope.docParam[1];
//
//		//$scope.type = $stateParams.type;;
//		//$scope.signup = function() {
//		//	$scope.user.personal_information.subtype = $stateParams.type;
//		//	$scope.user.personal_information.education_status  = $stateParams.subtype;
//		//	$auth.signup($scope.user)
//		//		.error(function(errors){
//		//			$scope.errors = errors.message;
//		//				//// getting the first error and focusing on the input
//		//				//for (var key in $scope.errors) {
//		//				//	var myElement = angular.element(document.querySelector("input[name='" + key + "']"));
//		//				//	$scope.registerForm[key].$invalid = true;
//		//				//	myElement.focus();
//		//				//	break;
//		//				//};
//        //
//		//		})
//		//		.then(function(response) {
//		//			$auth.setToken(response);
//		//			$state.go(prefix+'.'+$scope.nextDoc($scope.docParam));
//		//			//$location.path('/');
//		//			//toastr.info('You have successfully created a new account and have been signed-in');
//		//		})
//		//		.catch(function(errors) {
//		//			//toastr.error(response.data.message);
//		//		});
//		//};
//        //
//        //
//
//
//
//		$scope.disclaimer = {};
//		$scope.showHideAction = function() {
//			// Shows/hides the delete button on hover
//			return $scope.disclaimer.showAction = ! $scope.disclaimer.showAction;
//		};
//
//		//$scope.testfunc = function(){
//		//	$scope.$broadcast('show-errors-check-validity');
//		//	$scope.serverValidation = true;
//		//}
//        //
//		//$scope.resetValidation = function() {
//		//	$scope.$broadcast('show-errors-reset');
//		//	$scope.serverValidation = false;
//		//}
//		//$scope.gotoAnchor = function(x) {
//		//	var newHash = 'anchor' + x;
//		//	if ($location.hash() !== newHash) {
//		//		// set the $location.hash to `newHash` and
//		//		// $anchorScroll will automatically scroll to it
//		//		$location.hash('anchor' + x);
//		//	} else {
//		//		// call $anchorScroll() explicitly,
//		//		// since $location.hash hasn't changed
//		//		$anchorScroll();
//		//	}
//		//};
//		//email async unique validator
//		//$scope.validateOnServer = function() {
//        //
//        //
//		//	$http.post('/auth/register', {
//		//		user: $scope.user,
//		//		_token: CSRF_TOKEN,
//        //
//		//	}).success(function(data){
//        //
//		//	}).error(function(errors) {
//		//		$scope.errors = errors;
//		//	});
//		//};
//		//angular-file-upload 	https://github.com/nervgh/angular-file-upload
//
//		//if (typeof uploader == 'undefined') {
//		//	var uploader = [];
//		//	$scope.uploader = [];
//		//	$scope.pdfing = [];
//		//	$scope.hideInput = [];
//		//}
//
//
//		//non iterable file uploader
//
//		//var uploader = $scope.uploader = new FileUploader({
//		//	url: '/uploadCv',
//		//	//	autoUpload:true,
//		//	queueLimit: 1,
//		//	formData: [
//		//		{ _token: CSRF_TOKEN,
//		//			iteration: ''
//		//		},
//		//	]
//		//});
//
//		$scope.resetPdfUrl = function(key){
//			$scope.hideInput = false;
//			$scope.pdfing = false;
//			$scope.pdfUrl = '';
//			$scope.uploader.queue = [];
//			document.getElementById('cvUpload').value = null;
//
//		}
//		// FILTERS
//
//		//uploader.filters.push({
//		//		name: 'customFilter',
//		//		fn: function(item /*{File|FileLikeObject}*/, options) {
//		//			$scope.hideInput = true;
//		//			return this.queue.length < 10;
//		//		}
//		//	}
//		//);
//        //
//        //
//        //
//		//uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
//		//	console.info('onWhenAddingFileFailed', item, filter, options);
//		//	$scope.pdfing = true;
//        //
//		//};
//		//uploader.onAfterAddingFile = function(fileItem) {
//		//	console.info('onAfterAddingFile', fileItem);
//		//};
//		//uploader.onAfterAddingAll = function(addedFileItems) {
//		//	console.info('onAfterAddingAll', addedFileItems);
//		//};
//		//uploader.onBeforeUploadItem = function(item) {
//		//	console.info('onBeforeUploadItem', item);
//		//};
//		//uploader.onProgressItem = function(fileItem, progress) {
//		//	console.info('onProgressItem', fileItem, progress);
//		//};
//		//uploader.onProgressAll = function(progress) {
//		//	console.info('onProgressAll', progress);
//		//};
//		//uploader.onSuccessItem = function(fileItem, response, status, headers) {
//		//	console.info('onSuccessItem', fileItem, response, status, headers);
//		//	$scope.pdfUrl = '/'+response;
//		//	$scope.hideInput = true;
//		//	$scope.pdfing = true;
//		//};
//		//uploader.onErrorItem = function(fileItem, response, status, headers) {
//		//	console.info('onErrorItem', fileItem, response, status, headers);
//		//};
//		//uploader.onCancelItem = function(fileItem, response, status, headers) {
//		//	console.info('onCancelItem', fileItem, response, status, headers);
//		//};
//		//uploader.onCompleteItem = function(fileItem, response, status, headers) {
//		//	console.info('onCompleteItem', fileItem, response, status, headers);
//        //
//		//};
//		//uploader.onCompleteAll = function() {
//		//	console.info('onCompleteAll');
//		//};
//        //
//        //
//		////iterable file uploader
//		//$scope.getThisLengthKey = function(key){
//		//	var uploader = [];
//		//	$scope.uploader = [];
//		//	$scope.pdfing = [];
//		//	$scope.hideInput = [];
//		//	$scope.pdfUrl = [];
//		//	$scope.pdf = []
//		//	uploader[key] = $scope.uploader[key] = new FileUploader({
//		//		url: '/uploadCv',
//		//		autoUpload:true,
//		//		//queueLimit: 1,
//		//		formData: [
//		//			{ _token: CSRF_TOKEN,
//		//			  iteration: key },
//		//		]
//		//	});
//        //
//		//	// FILTERS
//        //
//		//	//uploader[key].filters.push({
//		//	//	name: 'customFilter',
//		//	//	fn: function(item /*{File|FileLikeObject}*/, options) {
//		//	//		//$scope.hideInput = true;
//		//	//		return this.queue.length < 10;
//         //   //
//		//	//	}
//		//	//});
//        //
//		//	// CALLBACKS
//        //
//		//	uploader[key].onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
//		//		console.info('onWhenAddingFileFailed', item, filter, options);
//		//	};
//		//	uploader[key].onAfterAddingFile = function(fileItem) {
//		//		console.info('onAfterAddingFile', fileItem);
//		//	};
//		//	uploader[key].onAfterAddingAll = function(addedFileItems) {
//		//		console.info('onAfterAddingAll', addedFileItems);
//		//	};
//		//	uploader[key].onBeforeUploadItem = function(item) {
//		//		console.info('onBeforeUploadItem', item);
//        //
//		//	};
//		//	uploader[key].onProgressItem = function(fileItem, progress) {
//		//		console.info('onProgressItem', fileItem, progress);
//		//	};
//		//	uploader[key].onProgressAll = function(progress) {
//		//		console.info('onProgressAll', progress);
//		//	};
//		//	uploader[key].onSuccessItem = function(fileItem, response, status, headers) {
//		//		console.info('onSuccessItem', fileItem, response, status, headers);
//		//		$scope.pdfUrl[key] = '/'+response;
//		//		$scope.hideInput[key] = true;
//		//		$scope.pdfing[key] = true;
//		//	};
//		//	uploader[key].onErrorItem = function(fileItem, response, status, headers) {
//		//		console.info('onErrorItem', fileItem, response, status, headers);
//		//	};
//		//	uploader[key].onCancelItem = function(fileItem, response, status, headers) {
//		//		console.info('onCancelItem', fileItem, response, status, headers);
//		//	};
//		//	uploader[key].onCompleteItem = function(fileItem, response, status, headers) {
//		//		console.info('onCompleteItem', fileItem, response, status, headers);
//		//	};
//		//	uploader[key].onCompleteAll = function() {
//		//		console.info('onCompleteAll');
//		//	};/		state = state[1];
//
//		var locationSubtype = $state.current.name;
//		var prefix = locationSubtype;
//		prefix = prefix.split('.');
//		prefix = prefix[0];
//
//		if($location.absUrl().indexOf("jobseeker") > -1) {
//			locationSubtype = 'jobseeker';
//		}else if($location.absUrl().indexOf("employer") > -1) {
//			locationSubtype = 'employer';
//		}
//
//		$scope.steps = $rootScope.steps;
//		$scope.docParam = $state.current.name.split('.');
//		$scope.docParam = $scope.docParam[1];
//
//		$scope.saveUser = function(user,docParam) {
//
//			user.personal_information.subtype = 'jobseeker';
//			user.personal_information.status = 'active';
//
//			$http.post('/auth/signup', {
//				user: user,
//
//				from:'register'
//			}).success(function(data){
//				//if no errors then everything is valid and going to next step
//				$state.go(prefix+'.'+$scope.nextDoc($scope.docParam));
//			}).error(function(errors) {
//				//getting the validation errors
//				$scope.errors = errors.message;
//				console.log($scope.errors);
//				//setting the errors on the inputs
//				//for (var key in $scope.errors) {
//				//	var myElement = angular.element(document.querySelector("input[name='" + key + "']"));
//				//	$scope.registerJobSeekerForm[key].$invalid = true;
//				//	//bluring because blur trigers the error class on the directive 'showError.js'
//				//	myElement.blur();
//                //
//				//};
//				//// getting the first error and focusing on the input
//				//for (var key in $scope.errors) {
//				//	var myElement = angular.element(document.querySelector("input[name='" + key + "']"));
//				//	$scope.registerJobSeekerForm[key].$invalid = true;
//				//	myElement.focus();
//				//	break;
//				//};
//
//			});
//
//
//		};
//
//		$scope.flowOp = function(key){
//			return  {target: '/upload',  query: {'_token': CSRF_TOKEN, param_ref: key}};
//		};
//
//		$scope.add = function(doc_param_key,index) {
//
//			$http.get('/columns/jobPost')
//				.success(function(data, status, headers, config) {
//					$scope.inserted = data[doc_param_key];
//					if(!(angular.isArray($scope.jobPost[doc_param_key]))) {
//						$scope.jobPost[doc_param_key] = Array($scope.jobPost[doc_param_key],$scope.inserted);
//					} else{
//						$scope.jobPost[doc_param_key].push($scope.inserted);
//					}
//				})
//				.error(function(){
//
//				});
//
//
//
//		};
//
//
//
//		$scope.add1 = function(docParamName,index) {
//
//			$http.get('/columns/jobPost')
//				.success(function(data, status, headers, config) {
//					$scope.inserted = data[docParamName];
//					if(!(angular.isArray($scope.jobPost[docParamName]))) {
//						$scope.jobPost[docParamName] = Array($scope.jobPost[docParamName],$scope.inserted);
//						console.log('not array');
//					} else{
//						//console.log($scope.jobPost[docParamName][tmp]);
//						$scope.jobPost[docParamName].push($scope.inserted);
//						console.log($scope.jobPost[docParamName]);
//						console.log('allready array');
//					}
//				})
//				.error(function(){
//
//				});
//
//
//
//		};
//
//		$scope.addRecordJobSeeker =function(docParam,$index) {
//			$http.get('api/forms/register_jobseeker')
//				.success(function(data, status, headers, config) {
//					$scope.inserted = data[docParam];
//					if(!(angular.isArray($scope.user[docParam]))){
//						$scope.user[docParam] = Array($scope.user[docParam],$scope.inserted);
//					}else{
//						$scope.user[docParam].push($scope.inserted);
//					}
//					console.log($scope.user[docParam]);
//				})
//				.error(function(){
//					alert('ERROR!!');
//				});
//		};
//
//		$scope.addRecordEmployer =function(docParam,$index) {
//			console.log('');
//			$http.get('/columns/registerEmployer')
//				.success(function(data, status, headers, config) {
//
//					$scope.inserted = data[docParam];
//
//					if(!(angular.isArray($scope.user[docParam]))){
//						$scope.user[docParam] = Array($scope.user[docParam],$scope.inserted);
//
//					}else{
//						$scope.user[docParam].push($scope.inserted);
//
//					}
//
//				})
//				.error(function(){
//					alert('ERROR!!');
//				});
//		};
//
//
//		$scope.addWhenEdit =function(docParam,$index) {
//
//			$http.get('/columns/jobPost')
//				.success(function(data, status, headers, config) {
//					$scope.inserted = data[docParam];
//					if(!(angular.isArray($scope.post[docParam]))){
//						$scope.post[docParam] = Array($scope.post[docParam],$scope.inserted);
//					}else{
//						$scope.post[docParam].push($scope.inserted);
//					}
//				})
//				.error(function(){
//					alert('ERROR!!');
//				});
//			console.log($scope.post);
//		};
//
//
//
//
//
//
//		$scope.remove = function(docParam,docParamName,param) {
//			$scope.new = docParam.splice(param, 1);
//			$http.post('/deleteIterable',
//				{
//					docParam:docParam,
//					post:$scope.post,
//					docParamName:docParamName,
//					param:param,
//					_token:CSRF_TOKEN})
//				.error(function(data){
//					console.log($scope.new);
//					$scope.user[docParamName] = $scope.new[0] ;
//					//console.log($scope.user);
//				})
//				.then(function(response) {
//					console.log($scope.new)
//					$scope.user[docParamName] = $scope.new[0] ;
//					//console.log($scope.user)
//				}, function(response) {
//
//				});
//		};
//
//		$scope.educationStatuses = [
//			{value: 'student', text: 'Student'},
//			{value: 'graduate', text: 'Graduate'},
//			{value: 'intern', text: 'Intern'},
//		];
//
//		// loading the options for select inputs
//
//
//		//$scope.loadGroups = function(paramName, docParamId) {
//		//	$scope.groups[paramName] = {};
//		//	return $scope.groups[paramName].length ? null : $http.get('/param/'+ paramName + '/' + docParamId).success(function(data) {
//		//		$scope.groups[paramName] = data;
//		//	});
//		//};
//
//		//date picker
//		$scope.today = function() {
//			$scope.dt = new Date();
//		};
//		$scope.today();
//
//		$scope.clear = function () {
//			$scope.dt = null;
//		};
//
//		// Disable weekend selection
//		$scope.disabled = function(date, mode) {
//			return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
//		};
//
//		$scope.toggleMin = function() {
//			$scope.minDate = $scope.minDate ? null : new Date();
//		};
//		$scope.toggleMin();
//		$scope.maxDate = new Date(2020, 5, 22);
//		$scope.opened =[];
//
//		$scope.open = function($event,paramName) {
//
//			$scope.opened[paramName] = true;
//
//
//		};
//		$scope.openedIterable =[];
//		$scope.openIterable = function($event,paramKey,index) {
//			$scope.openedIterable[index] = []
//			$scope.openedIterable[index][paramKey] = true;
//		};
//
//
//		$scope.setDate = function(year, month, day) {
//			$scope.dt = new Date(year, month, day);
//		};
//
//		$scope.dateOptions = {
//			formatYear: 'yy',
//			startingDay: 1
//		};
//
//		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
//		$scope.format = $scope.formats[0];
//
//		$scope.status = {
//			opened: false
//		};
//
//		var tomorrow = new Date();
//		tomorrow.setDate(tomorrow.getDate() + 1);
//		var afterTomorrow = new Date();
//		afterTomorrow.setDate(tomorrow.getDate() + 2);
//		$scope.events =
//			[
//				{
//					date: tomorrow,
//					status: 'full'
//				},
//				{
//					date: afterTomorrow,
//					status: 'partially'
//				}
//			];
//
//		$scope.getDayClass = function(date, mode) {
//			if (mode === 'day') {
//				var dayToCheck = new Date(date).setHours(0,0,0,0);
//
//				for (var i=0;i<$scope.events.length;i++){
//					var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
//
//					if (dayToCheck === currentDay) {
//						return $scope.events[i].status;
//					}
//				}
//			}
//
//			return '';
//		};
//
//		// Any function returning a promise object can be used to load values asynchronously
//		$scope.getLocation = function(val) {
//			return $http.get('//maps.googleapis.com/maps/api/geocode/json?language=en', {
//				params: {
//					address: val,
//					sensor: false,
//				}
//			}).then(function(response){
//				console.log(response.data);
//				return response.data.results.map(function(item){
//					return item.formatted_address;
//				});
//			});
//		};
//
//        //$scope.getPost = function(id){
//			//$http.get('/job/'+id ).
//			//	success(function(data, status, headers, config) {
//			//		$scope.post = data;
//			//	}).
//			//	error(function(data, status, headers, config) {
//        //
//			//	});
//        //};
//
//		$scope.savePost = function(post) {
//			console.log(post);
//			$http.post('/savePost', {
//				post:post,
//				_token:CSRF_TOKEN,
//				from:'jobPost'
//			}).success(function(errors){
//				$scope.allPosts.push(post);
//				return post;
//
//			}).error(function(err) {
//
//
//
//			});
//		};
//		$scope.move = function(array, fromIndex, toIndex){
//			array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] )
//
//			console.log(array);
//		};
//		//$scope.post = $scope.getPost(job);
//
//
//	})
//	.controller("FindajobController",['$window','$scope','UsersData','$http','$routeParams','DocParamData','ParamData','ParamValueData','SysParamValuesData','$state','CSRF_TOKEN','$location','$uibModal','$log','Account', function($window,$scope,UsersData,$http,$routeParams,DocParamData,ParamData,ParamValueData,SysParamValuesData,$state,CSRF_TOKEN,$location,$uibModal,$log,Account) {
//
//		//		$scope.user = user.user;
//		Account.getProfile().then(function(user){
//			$scope.allPosts = user.posts;
//		});
//
//		$scope.options = {
//			ratedFill: '#F8BB1E',
//			readOnly: true,
//			halfStar: true,
//			fullStar: false
//		};
//		//console.log(allPosts);
//
//		$scope.initModals = function() {
//			$('.dropdown-button').dropdown({
//					inDuration: 300,
//					outDuration: 225,
//					constrain_width: false, // Does not change width of dropdown to that of the activator
//					hover: true, // Activate on hover
//					gutter: -80, // Spacing from edge
//					belowOrigin: false, // Displays dropdown below the button
//					alignment: 'left' // Displays dropdown with edge aligned to the left of button
//				}
//			);
//			$('.modal-trigger').leanModal(); // Initialize the modals
//		}
//		//ratings
//		$scope.rate = 70;
//		$scope.total = 10;
//		//	$scope.rate = $window.Math.round(($scope.rate) / $scope.total);
//		$scope.max = 5;
//		$scope.isReadonly = true;
//
//		$scope.hoveringOver = function(value) {
//			$scope.overStar = value;
//			$scope.percent = 100 * (value / $scope.max);
//		};
//
//		$scope.ratingStates = [
//
//			{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
//
//		];
//
//		//modal
//		//$scope.openPost = function (size) {
//        //
//		//	var modalInstance = $uibModal.open({
//		//		animation: $scope.animationsEnabled,
//		//		templateUrl: 'myModalContent.html',
//		//		controller: 'ModalInstanceCtrl',
//		//		size: size,
//		//		resolve: {
//        //
//		//			post: function () {
//		//				return $scope.post;
//		//			},
//		//			user:function () {
//		//				return $scope.user;
//		//			}
//		//		}
//		//	});
//        //
//		//	modalInstance.result.then(function (selectedItem) {
//		//		$scope.selected = selectedItem;
//		//	}, function () {
//		//		$log.info('Modal dismissed at: ' + new Date());
//		//	});
//		//};
//
//
//
//
//
//
//		//$scope.getAllPosts = function(){
//        //
//		//	$http.get('api/getAllPosts').
//		//		success(function(data, status, headers, config) {
//        //
//		//			$scope.allPosts = data.posts;
//        //
//		//		}).
//		//		error(function(data, status, headers, config) {
//		//			// called asynchronously if an error occurs
//		//			// or server returns response with an error status.
//		//		});
//		//};
//		//$scope.getAllPosts();
//		$scope.getPost = function(id){
//			$http.get('/job/'+id ).
//				success(function(data, status, headers, config) {
//
//
//					$scope.post = data;
//					// $scope.openPost();
//
//					$state.go(
//						'general',
//						{
//							jobId:id,
//						} // this goes into $stateParams for
//						// state 'some'
//					);
//
//					console.log($state);
//				}).
//				error(function(data, status, headers, config) {
//
//				});
//		};
//
//
//
//
//		$scope.reverse = true;
//
//		$scope.orderByFilter = 'match';
//
//		//set the timestamp on the $scope.filter after choosing a date
//		$scope.setTimestamp = function(data,index){
//
//			var timestamp = new Date(data).getTime();
//			$scope.items[index].lastBuy = timestamp;
//
//		};
//
//
//		$scope.orderOptions = function(value){
//			$scope.orderByFilter = value;
//			// $scope.reverse = !$scope.reverse;
//		};
//
//
//		$scope.filter = {};
//
//		$scope.filter.minPrice = "";
//		$scope.filter.maxPrice = "";
//
//		$scope.checkPriceFilter = function(price){
//
//			var min =  $scope.filter.minPrice;
//			var max =  $scope.filter.maxPrice;
//
//			if(!min && !max){
//				return true;
//			}
//
//			var check = false;
//
//			if (min && !max){
//				if(min<=price){
//					check = true;
//				}
//			}
//
//			if (!min && max){
//				if(max >=price){
//					check = true;
//				}
//			}
//
//
//			if (min && max){
//
//				if( min <= price && max > price){
//					check = true;
//				} else if (min < price && max >=price){
//					check = true;
//				}
//			}
//
//
//			return check;
//		};
//
//		$scope.limit = 50;
//
//
//	}])
//;
	//.controller("NewController",['$scope','UsersData','$http','$routeParams','DocParamData','ParamData','ParamValueData','SysParamValuesData','$state','CSRF_TOKEN','$location', function($scope,UsersData,$http,$routeParams,DocParamData,ParamData,ParamValueData,SysParamValuesData,$state,CSRF_TOKEN,$location) {
	//	console.log('NEW');
	//	$scope.getColumns = function(){
    //
	//		$http.get('/columns/' + 'registerJobSeeker').
	//			success(function(data, status, headers, config) {
	//				$scope.user = data;
    //
	//				//registration steps
	//				$scope.next_keys = [];
	//				var prev_key = false;
	//				for(var key in $scope.user) {
	//					if(!prev_key) {
	//						prev_key = key;
	//					} else {
	//						$scope.next_keys[prev_key] = key;
	//						prev_key = key;
	//						$scope.next = key;
	//					}
	//				}
	//			}).
	//			error(function(data, status, headers, config) {
	//				// called asynchronously if an error occurs
	//				// or server returns response with an error status.
	//			});
	//	};
	//	$scope.getColumns();
	//}])
	//.controller('CollapseDemoCtrl', function ($scope) {
    //
	//});