'use strict';
angular.module('acadb')
.controller("FindajobController",['$window','$scope','UsersData','$http','$routeParams','DocParamData','ParamData','ParamValueData','SysParamValuesData','$state','CSRF_TOKEN','$location','$uibModal','$log','Account', function($window,$scope,UsersData,$http,$routeParams,DocParamData,ParamData,ParamValueData,SysParamValuesData,$state,CSRF_TOKEN,$location,$uibModal,$log,Account) {

    //		$scope.user = user.user;
    Account.getProfile().then(function(user){
        $scope.allPosts = user.posts;
    });
    //console.log(allPosts);

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
        $('.modal-trigger').leanModal(); // Initialize the modals
    }
    //ratings
    $scope.rate = 70;
    $scope.total = 10;
    //	$scope.rate = $window.Math.round(($scope.rate) / $scope.total);
    $scope.max = 5;
    $scope.isReadonly = true;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [

        {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},

    ];

    //modal
    //$scope.openPost = function (size) {
    //
    //	var modalInstance = $uibModal.open({
    //		animation: $scope.animationsEnabled,
    //		templateUrl: 'myModalContent.html',
    //		controller: 'ModalInstanceCtrl',
    //		size: size,
    //		resolve: {
    //
    //			post: function () {
    //				return $scope.post;
    //			},
    //			user:function () {
    //				return $scope.user;
    //			}
    //		}
    //	});
    //
    //	modalInstance.result.then(function (selectedItem) {
    //		$scope.selected = selectedItem;
    //	}, function () {
    //		$log.info('Modal dismissed at: ' + new Date());
    //	});
    //};






    //$scope.getAllPosts = function(){
    //
    //	$http.get('api/getAllPosts').
    //		success(function(data, status, headers, config) {
    //
    //			$scope.allPosts = data.posts;
    //
    //		}).
    //		error(function(data, status, headers, config) {
    //			// called asynchronously if an error occurs
    //			// or server returns response with an error status.
    //		});
    //};
    //$scope.getAllPosts();
    $scope.getPost = function(id){
        $http.get('/job/'+id ).
            success(function(data, status, headers, config) {


                $scope.post = data;
                // $scope.openPost();

                $state.go(
                    'general',
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




    $scope.reverse = true;

    $scope.orderByFilter = 'match';

    //set the timestamp on the $scope.filter after choosing a date
    $scope.setTimestamp = function(data,index){

        var timestamp = new Date(data).getTime();
        $scope.items[index].lastBuy = timestamp;

    };


    $scope.orderOptions = function(value){
        $scope.orderByFilter = value;
        // $scope.reverse = !$scope.reverse;
    };


    $scope.filter = {};

    $scope.filter.minPrice = "";
    $scope.filter.maxPrice = "";

    $scope.checkPriceFilter = function(price){

        var min =  $scope.filter.minPrice;
        var max =  $scope.filter.maxPrice;

        if(!min && !max){
            return true;
        }

        var check = false;

        if (min && !max){
            if(min<=price){
                check = true;
            }
        }

        if (!min && max){
            if(max >=price){
                check = true;
            }
        }


        if (min && max){

            if( min <= price && max > price){
                check = true;
            } else if (min < price && max >=price){
                check = true;
            }
        }


        return check;
    };

    $scope.limit = 50;


}])