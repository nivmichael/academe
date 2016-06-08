/**
 * The controller doesn't do much more than setting the initial data model
 */
angular.module("acadb")
    .controller("editFormCtrl", function($scope, Form, ParamData, $http, ParamTypeData, $state, formFor) {

console.log('ctrl');

        $scope.form = formFor;
        $scope.models = {
                    selected: null,
                    templates: [
                        {type: "parameter", name: 'new parameter',modify:1,new:1},
                        {type: "category", name: 'new category',modify:1, columns: [[],[]]}
                    ],
                    dropzones:
                        $scope.form

                };


        $scope.$watch('models.dropzones', function(model) {
            $scope.model = model;
            $scope.modelAsJson = angular.toJson( model, true );
        }, true);

        $scope.save =function(){
            $http.post('api/admin/forms/jobseeker', $scope.model).success(function(response){
            })
        };

        $scope.assign = function(parameter, index){
            $scope.save();
        };

        ParamTypeData.list().$promise.then(function(inputTypes){
            $scope.inputTypes = inputTypes;
        });

        ParamData.list().$promise.then(function(params){
            $scope.params = params;
        });


        //Editing Select Options

        $scope.groups = {};
        Form.getAllOptionValues().then(function(options){
            $scope.groups = options.data;
        });

        $scope.addOption = function(param){
            if (typeof  $scope.groups[param] == 'undefined')  $scope.groups[param] = [];
            var newOption = {
                text:'',
                modify:1
            };
            $scope.groups[param].push(newOption);

        }

        $scope.saveOptions = function(value_id){
            var paramName = $scope.models.selected.name;
            $http.post('api/admin/forms/options', {option_id:value_id, options:$scope.groups[paramName], parameter:$scope.models.selected}).success(function(response){

            })
        }




});