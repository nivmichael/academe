'use strict';
angular.module('acadb')
.controller("FindajobController",['$scope','Account','Job','$filter', 'PostData','$stateParams','labelFilterData',  function($scope, Account, Job, $filter, PostData, $stateParams, labelFilterData) {

    $scope.label = labelFilterData.getFilterLabel();
    Account.getProfile().then(function(user){
        $scope.labeledPosts = user.posts;
    });
    $scope.$on('filter', function(event, filter) {
        $scope.label = filter;
    });
    //should resolve posts in router
    Job.getJobs().then(function(posts){
        $scope.allPosts = posts;
    });
    $scope.$on('handleLabel', function(event, post_id, move_to) {
        angular.forEach($scope.allPosts, function(value, key) {
            if(value.postInfo.id == post_id) {
                $scope.labeledPosts[move_to].push(parseInt(post_id, 10))
            }
        });
        Job.getJobsAgain().then(function(posts){
            $scope.allPosts = posts;
        });
    });
    $scope.$on('handleRemovedLabel', function(event, post_id, remove_from) {
        var index = $scope.labeledPosts[remove_from].indexOf(post_id);
        $scope.labeledPosts[remove_from].splice(index,1);;

        Job.getJobsAgain().then(function(posts){
            $scope.allPosts = posts;
        });
    });

}])





