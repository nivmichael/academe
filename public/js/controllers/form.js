/**
 * The controller doesn't do much more than setting the initial data model
 */
angular.module("acadb")
    .controller("FormCtrl", function($scope) {



        // we will store all of our form data in this object
        $scope.formData = {};

        // function to process the form
        $scope.processForm = function() {
            alert('awesome!');
        };


});