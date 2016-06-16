'use strict';
angular.module('acadb')
  .controller('LoginCtrl', function($scope, $location, $auth, $stateParams, $state, $http) {


        // need encapsulation/make a service storing user type in localStorage.
        $scope.saved = JSON.parse(localStorage.getItem('user'));

        if($stateParams.type !== null){
            $scope.saved = {type: $stateParams.type, sub_type: $stateParams.sub_type};
        }else if( $scope.saved === null){
            $state.go('welcome');
        }
        localStorage.setItem('user', JSON.stringify( $scope.saved ));
        $scope.jobseeker_type = $scope.saved.sub_type;





      var type                    = $scope.saved.type;
      var sub_type                = $scope.saved.sub_type;

      if($stateParams.type == 'employer'){

        $scope.type               = $stateParams.type;
        $scope.registeration_link = 'form.company({type: "'+ type +'"})';
        /*this has to be resolved before state loads*/
        $scope.userHomepage       ="employer.company"

      }else{
        $scope.type               =  $scope.saved.type;
        $scope.sub_type           =  $scope.saved.sub_type;
        $scope.registeration_link = 'form.personal_information({type: "'+ type  +'" ,sub_type : "'+ sub_type  +'" })';
        /*this has to be resolved before state loads*/
        $scope.userHomepage       = "jobseeker.profile";
      }


      $scope.login = function() {
      $auth.login($scope.user)
        .then(function() {
          //toastr.success('You have successfully signed in!');
          //$location.path('/my_profile');
        $state.go( $scope.userHomepage);
        })
        .catch(function(response) {
              $scope.error = response.data.error;

          //toastr.error(error.data.message, error.status);
        });
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          //toastr.success('You have successfully signed in with ' + provider + '!');
          $location.path('/');
        })
        .catch(function(error) {
          if (error.error) {
            // Popup error - invalid redirect_uri, pressed cancel button, etc.
            //toastr.error(error.error);
          } else if (error.data) {
            // HTTP response error from server
            //toastr.error(error.data.message, error.status);
          } else {
            //toastr.error(error);
          }
         });
    };

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
