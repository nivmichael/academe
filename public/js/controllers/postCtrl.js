'use strict';
angular.module('acadb')
  .controller('PostCtrl', function($scope, $auth, Account, $http, $rootScope, $filter, Form, $state, PostData) {


        //ToDo: maybe we can resolve this form on the stateProvider...

        //Loading the form
        $scope.getForm = function(){
            Form.getForm('job').then(function(form){
                $scope.form = angular.copy(form.data);
                $scope.jobPost = form.data;
                //loadGroups can be called in the form tag inside html - check it..
                $scope.loadGroups();
            });
        };
        //Loading the options for select inputs
        $scope.groups={};
        $scope.loadGroups = function() {
            Form.getAllOptionValues().then(function(options){
                $scope.groups = options.data;
        //manual/override options:
                $scope.groups['job_title'] = [
                    {value: '', text: ''},
                    {value: 'non_managerial', text: 'Non Managerial'},
                    {value: 'manager',        text: 'Manager'},
                    {value: 'executive',      text: 'Executive'},
                ];
            });
        };
        // save the job post
        $scope.savePost = function(post) {
            PostData.save(post).$promise
                .then(function(res) {

                })
                .catch(function(err) {
                    $scope.errors = err.data;
                    Account.broadcast(err.data);
                })
        };
        //some form actions: add, move, remove
        $scope.add = function(docParamName,index) {
        //using the object we got from the Form service...
            $scope.inserted = angular.copy($scope.form[docParamName][0]);
            $scope.jobPost[docParamName].push($scope.inserted);
        };
        $scope.move = function(array, fromIndex, toIndex){
            array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] )
        };
        $scope.remove = function(array,index,user_id) {
            Form.remove(array,index,user_id);
            array.splice(index,1);
        };
        // init - reference ToDo;
        $scope.getForm();

  });
