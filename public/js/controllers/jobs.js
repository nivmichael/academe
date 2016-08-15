'use strict';
angular.module('acadb')
.controller("FindajobController",['$scope','Account','Job','$filter', 'PostData','$stateParams','labelFilterData',  function($scope, Account, Job, $filter, PostData, $stateParams, labelFilterData) {

    //get labeledPostsId's
    Account.getProfile().then(function(user){
        $scope.labeledPosts = user.posts;
    });

    //should resolve posts in router
    Job.getJobs().then(function(posts){
        //get all jobs
        $scope.allPosts = posts;

        //get the current label / filter
        $scope.label = labelFilterData.getFilterLabel();
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
        var index = $scope.labeledPosts[remove_from].indexOf(parseInt(post_id, 10));
        $scope.labeledPosts[remove_from].splice(index,1);;
        Job.getJobsAgain().then(function(posts){
            $scope.allPosts = posts;
        });
    });





}])





