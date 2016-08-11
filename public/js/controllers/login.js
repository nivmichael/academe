'use strict';
angular.module('acadb')
  .controller('LoginCtrl', function($scope, $location, $auth, $stateParams, $state, $http, RoleStore, Account, $rootScope,RoleData ) {

        console.log('loginCtrl');
        // need encapsulation/make a service storing user type in localStorage.
        $scope.saved = JSON.parse(localStorage.getItem('user'));

        if($stateParams.type !== null){
            $scope.saved = {type: $stateParams.type, sub_type: $stateParams.sub_type};
        }else if( $scope.saved === null){
            $state.go('welcome');
        }
        localStorage.setItem('user', JSON.stringify( $scope.saved ));
      //  //$scope.jobseeker_type = $scope.saved.sub_type;
      //
      //
      var type                    = $scope.saved.type;
      var sub_type                = $scope.saved.sub_type;
      //
      if($stateParams.type == 'employer'){

       $scope.type               = $stateParams.type;
       $scope.registeration_link = 'form.company({type: "'+ type +'"})';


        $scope.userHomepage       ="employer.portal"


      }else{
        $scope.type               =  $scope.saved.type;
        $scope.sub_type           =  $scope.saved.sub_type;
        $scope.registeration_link = 'form.personal_information({type: "'+ type  +'" ,sub_type : "'+ sub_type  +'" })';


        $scope.userHomepage       = "jobseeker.profile";

      }


     $scope.login = function() {

      $auth.login($scope.user)
        .then(function() {
              //user authenticated
              //removing `guest` role
              RoleStore.removeRoleDefinition('guest');
              //getting user account data
              Account.getProfile().then(function(account) {
                  //getting user roles
                  var userRoles = account.roles;
                  var roles = [];
                  //extracting names, creating array with role names only
                  RoleData.query(function (data) {
                      angular.forEach(data, function (value, key) {
                          roles.push(value);
                      });

                      //checking if user has one of these roles..
                      angular.forEach(roles, function (value, key) {
                          RoleStore
                              .defineRole(value.name, function () {
                                  return _.contains(userRoles, value.name);
                              });
                      });
                      console.log(userRoles);
                      console.log('roles defined');

                      //now we handle the redirects to hompages
                      //`jobseeker` should go to his profile
                      //`employer`  should go to his portal
                      //`admin`     should go to dashboard
                      console.log($stateParams.redirect);
                      if($stateParams.redirect){
                          $state.go($stateParams.redirect);
                      }else

                      //if (_.contains(userRoles, 'tech_admin') ) {
                      //    $state.go('admin.forms.jobseeker');
                      //}
                      if (_.contains(userRoles, 'employer') ) {
                          $state.go('employer.portal')
                      } else if (_.contains(userRoles, 'jobseeker')) {
                          $state.go('jobseeker.profile');
                      }


                      // if homepage != referrer - go to referrer

                      //if (_.contains(userRoles, 'tech_admin') ) {
                      //    $state.go('admin.forms.jobseeker');
                      //}


                      //if (_.contains(userRoles, 'employer') ) {
                      //    console.log($rootScope.returnToState.name);
                      //    if($rootScope.returnToState.name != 'employer.portal'){
                      //
                      //        $state.go($rootScope.returnToState.name, $rootScope.returnToStateParams )
                      //    }else{
                      //        $state.go('employer.portal')
                      //    }
                      //} else if (_.contains(userRoles, 'jobseeker')) {
                      //    console.log($rootScope.returnToState.name);
                      //    if($rootScope.returnToState.name != 'jobseeker.profile'){
                      //
                      //        $state.go($rootScope.returnToState.name, $rootScope.returnToStateParams)
                      //    }else{
                      //        $state.go('jobseeker.profile');
                      //    }
                      //}




                  });
              });
              //
              //















            //  Account.getProfile().then(function(account){
            //
            //    type     = account.user.personal_information['subtype'];
            //    sub_type = account.user.personal_information['education_status'];
            //
            //    $scope.saved = {type: type, sub_type: sub_type};
            //    localStorage.setItem('user', JSON.stringify( $scope.saved ));
            //    //handling redirects - make it smarter
            //    RoleStore.removeRoleDefinition('guest');
            //    RoleStore
            //        // Or use your own function/service to validate role
            //        .defineManyRoles({
            //            'jobseeker':function () { return type == 'jobseeker' },
            //            'employer':function ()  { return type == 'employer' },
            //        });
            //
            //
            //    if($scope.saved.type == 'employer'){
            //
            //        $scope.type               = $scope.saved.type;
            //        $scope.userHomepage       = "employer.portal"
            //
            //
            //    }else{
            //        $scope.type               =  $scope.saved.type;
            //        $scope.sub_type           =  $scope.saved.sub_type;
            //        $scope.userHomepage       = "jobseeker.profile";
            //
            //    }
            //
            //    console.log($scope.userHomepage);
            //
            //    console.log($rootScope.returnToState);
            //
            //    $state.go( $scope.userHomepage );
            //
            //
            //
            //
            //
            //})

        })
        .catch(function(response) {
              $scope.error = response.data.error;
        });
    };

    //i forgot what is that for?!    commented until something goes wrong..i think its for the Oauth

    //$scope.authenticate = function(provider) {
    //  $auth.authenticate(provider)
    //    .then(function() {
    //      //toastr.success('You have successfully signed in with ' + provider + '!');
    //      $location.path('/');
    //    })
    //    .catch(function(error) {
    //      if (error.error) {
    //        // Popup error - invalid redirect_uri, pressed cancel button, etc.
    //        //toastr.error(error.error);
    //      } else if (error.data) {
    //        // HTTP response error from server
    //        //toastr.error(error.data.message, error.status);
    //      } else {
    //        //toastr.error(error);
    //      }
    //     });
    //};
        //make ir a state!
        $scope.getPasswordEmail = function(){
		$http.get('/password/email')
			.then(function(data){
				$state.go('password_mail');
			})
			.catch(function(error) {
				$scope.errors = error.data
				//toastr.error(error.data.message, error.status);
			});
	}



  });
