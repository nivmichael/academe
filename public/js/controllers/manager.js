'use strict';
(function (ng) {
angular.module('acadb')
  .controller('ManagerCtrl', function($scope, $auth, Account, $http, $rootScope, ParamData, UserData, DocParamData, DocTypeData, ParamTypeData, $parse, ParamValueData, SysParamValuesData, Tables, TableData, $filter ) {

        $scope.testVar;

        $scope.$on('table', function(event, table, table_name) {
            $scope.table,
            $scope.columns,
            $scope.displayed = table;
            $scope.table_name = table_name;
            console.log($scope.displayed.$promise);

        });

        var camelCase = function(string){

            string = $filter('underscoreless')(string);
            var myLabel = string;
            var split = myLabel.split(' ');
            //iterate through each of the "words" and capitalize them
            for (var i = 0, len = split.length; i < len; i++) {
                split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1);
            }
            return  split.join('');;
        }

        $scope.save = function(key, value, table_name, id, row){
            console.log(key);
            console.log(value);
            console.log(row);
            var service_name;
            service_name = camelCase(table_name) + 'Data';
            //eval(service_name).save({id:id});
            ParamTypeData.update({id:id, key:key, value:value}, function (success) {

               //console.log($scope.columns[row]);
               // console.log();


            })
        }


        //UserData.list().$promise.then(function(users){
        //    $scope.columns = angular.copy(users[0]);
        //    $scope.users = users;
        //    $scope.displayed= [].concat($scope.users);
        //
        //});
        //
        //ParamData.list().$promise.then(function(params){
        //    $scope.params = params;
        //});
        //
        //DocParamData.list().$promise.then(function(docParams){
        //    $scope.docParams = docParams;
        //});
        //DocTypeData.list().$promise.then(function(docTypes){
        //    $scope.docTypes = docTypes;
        //});
        //
        //ParamTypeData.list().$promise.then(function(ParamTypes){
        //    $scope.ParamTypes = ParamTypes;
        //});
        //
        //ParamValueData.list().$promise.then(function(ParamValues){
        //    $scope.ParamValues = ParamValues;
        //});
        //
        //SysParamValuesData.list().$promise.then(function(SysParamValues){
        //    $scope.SysParamValues = SysParamValues;
        //});






        //$scope.test = $scope.displayed;
        //ParamData.query(function(data) {
        //    $scope.displayed = data;
        //});

            //ParamData.query().$promise
        //    .then(function(res) {
        //        console.log(res);
        //        $scope.displayed = res;
        //    })
        //    .catch(function(err) {
        //        //$scope.displayed = err;
        //        $scope.errors = err.data;
        //        console.log(err.data)
        //        Account.broadcast(err.data);
        //    })



  })
    .directive('stDateRange', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            require: '^stTable',
            scope: {
                before: '=',
                after: '='
            },
            templateUrl: 'partials/admin/tpl/stDateRange.html',

            link: function (scope, element, attr, table) {

                var inputs = element.find('input');
                var inputBefore = ng.element(inputs[0]);
                var inputAfter = ng.element(inputs[1]);
                var predicateName = attr.predicate;


                [inputBefore, inputAfter].forEach(function (input) {

                    input.bind('blur', function () {


                        var query = {};

                        if (!scope.isBeforeOpen && !scope.isAfterOpen) {

                            if (scope.before) {
                                query.before = scope.before;
                            }

                            if (scope.after) {
                                query.after = scope.after;
                            }

                            scope.$apply(function () {
                                table.search(query, predicateName);
                            })
                        }
                    });
                });

                function open(before) {
                    return function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        if (before) {
                            scope.isBeforeOpen = true;
                        } else {
                            scope.isAfterOpen = true;
                        }
                    }
                }

                scope.openBefore = open(true);
                scope.openAfter = open();
            }
        }
    }])
    .directive('stNumberRange', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            require: '^stTable',
            scope: {
                lower: '=',
                higher: '='
            },
            templateUrl: 'partials/admin/tpl/stNumberRange.html',
            link: function (scope, element, attr, table) {
                var inputs = element.find('input');
                var inputLower = ng.element(inputs[0]);
                var inputHigher = ng.element(inputs[1]);
                var predicateName = attr.predicate;

                [inputLower, inputHigher].forEach(function (input, index) {

                    input.bind('blur', function () {
                        var query = {};

                        if (scope.lower) {
                            query.lower = scope.lower;
                        }

                        if (scope.higher) {
                            query.higher = scope.higher;
                        }

                        scope.$apply(function () {
                            table.search(query, predicateName)
                        });
                    });
                });
            }
        };
    }])
    .filter('customFilter', ['$filter', function ($filter) {
        var filterFilter = $filter('filter');
        var standardComparator = function standardComparator(obj, text) {
            text = ('' + text).toLowerCase();
            return ('' + obj).toLowerCase().indexOf(text) > -1;
        };

        return function customFilter(array, expression) {
            function customComparator(actual, expected) {

                var isBeforeActivated = expected.before;
                var isAfterActivated = expected.after;
                var isLower = expected.lower;
                var isHigher = expected.higher;
                var higherLimit;
                var lowerLimit;
                var itemDate;
                var queryDate;


                if (ng.isObject(expected)) {

                    //date range
                    if (expected.before || expected.after) {
                        try {
                            if (isBeforeActivated) {
                                higherLimit = expected.before;

                                itemDate = new Date(actual);
                                queryDate = new Date(higherLimit);

                                if (itemDate > queryDate) {
                                    return false;
                                }
                            }

                            if (isAfterActivated) {
                                lowerLimit = expected.after;


                                itemDate = new Date(actual);
                                queryDate = new Date(lowerLimit);

                                if (itemDate < queryDate) {
                                    return false;
                                }
                            }

                            return true;
                        } catch (e) {
                            return false;
                        }

                    } else if (isLower || isHigher) {
                        //number range
                        if (isLower) {
                            higherLimit = expected.lower;

                            if (actual > higherLimit) {
                                return false;
                            }
                        }

                        if (isHigher) {
                            lowerLimit = expected.higher;
                            if (actual < lowerLimit) {
                                return false;
                            }
                        }

                        return true;
                    }
                    //etc

                    return true;

                }
                return standardComparator(actual, expected);
            }

            var output = filterFilter(array, expression, customComparator);
            return output;
        };
    }]);
})(angular);
