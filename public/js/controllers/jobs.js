'use strict';
angular.module('acadb')
.controller("FindajobController",['$scope','Account','Job','$filter', 'PostData','$stateParams','labelFilterData','$http','$rootScope','Form','$timeout',   function($scope, Account, Job, $filter, PostData, $stateParams, labelFilterData, $http, $rootScope, Form, $timeout) {



    $scope.orderOptions = function(value){
        $scope.orderByFilter = value;
        $scope.reverse = !$scope.reverse;
    };

    //get labeledPostsId's
    Account.getProfile().then(function(user){
        $scope.labeledPosts = user.posts;
        $scope.user_id      = user.user['personal_information']['id'];
        $scope.user         = user.user;
    });

    //should resolve posts in router
    Job.getJobs().then(function(posts){
        //get all jobs
        $scope.allPosts = posts;

        //get the current label / filter
        $scope.label = labelFilterData.getFilterLabel();
    });

    //get filter select options
    Form.getAllOptionValues().then(function(options){
        $scope.groups = options.data;

    });

    //when filter is changed, get the new filter
    $scope.$on('filter', function(event, filter) {
        $scope.label = filter;
    });

    //when setting a label
    $scope.$on('handleLabel', function(event, post_id, move_to) {

       if(typeof($scope.labeledPosts[move_to]) === undefined || !$scope.labeledPosts[move_to]){
           $scope.labeledPosts[move_to] = [];
       }
       angular.forEach($scope.allPosts, function(value, key) {
            if(value.postInfo.id == post_id) {
                $scope.labeledPosts[move_to].push(parseInt(post_id, 10))
            }
       });
       Job.getJobsAgain().then(function(posts){
            $scope.allPosts = posts;
       });
    });

    //when unsetting a label
    $scope.$on('handleRemovedLabel', function(event, post_id, remove_from) {
        console.log('handleRemovedLabel');
        var index = $scope.labeledPosts[remove_from].indexOf(parseInt(post_id, 10));
        $scope.labeledPosts[remove_from].splice(index,1);;
        Job.getJobsAgain().then(function(posts){
            $scope.allPosts = posts;
        });
    });

    $scope.hoverIn = function(){
        this.hoverEdit = true;
    };

    $scope.hoverOut = function(){
        this.hoverEdit = false;
    };




    $scope.unApply = function(id) {
        //remove from db
        $http.post('api/job/unApply/' + id, {user_id:$scope.user_id  , docSubType: 'jobseeker'}).then(function(response){
            $scope.applied = false;
            //recover post
            Account.updateProfile($scope.user);
            $rootScope.$broadcast('handleRemovedLabel', id, 'applied');
            //$rootScope.$broadcast('addToPostList',  $scope.jobPost);
            return response.data;
        });
        $scope.applied = false
    }

    $scope.emptyFolder = function(){
        //ajax to LabelController


    };

        $scope.selected = undefined;
        $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];








    }])
    //.filter('propsFilter', function() {
    //    return function(items, props) {
    //        var out = [];
    //
    //        if (angular.isArray(items)) {
    //            var keys = Object.keys(props);
    //
    //            items.forEach(function(item) {
    //                var itemMatches = false;
    //
    //                for (var i = 0; i < keys.length; i++) {
    //                    var prop = keys[i];
    //                    var text = props[prop].toLowerCase();
    //                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
    //                        itemMatches = true;
    //                        break;
    //                    }
    //                }
    //
    //                if (itemMatches) {
    //                    out.push(item);
    //                }
    //            });
    //        } else {
    //            // Let the output be the input untouched
    //            out = items;
    //        }
    //
    //        return out;
    //    };
    //})





