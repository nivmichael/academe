angular.module('acadb.directives', []).
  value('version', '0.1')
  




.directive('post', function() {
  return {
    restrict: 'EA',
    scope: {
      param: '=',
      docparam:'=',
      parameter:'=',
    },
    templateUrl: '../partials/param.html',
    // link: function (scope, element, attr) {
		// scope.param = attr.param ;
		// scope.docparam= attr.docparam;
//     	
//    
    // }
  };
})

    .directive('repeatDone', function() {
        return function(scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    })

    .directive('accessibleForm', function () {
        return {
            restrict: 'A',
            link: function (scope, elem) {

                // set up event handler on the form element
                scope.$watch('registerForm', function () {

                    // find the first invalid element
                    var firstInvalid = elem[0].querySelector('.has-error');

                    // if we find one, set focus
                    if (firstInvalid) {
                        console.log(firstInvalid);
                        firstInvalid.focus();
                    }
                });
            }
        };
    })



    .directive('resize', function ($window) {
        return function (scope, element) {
            var w = angular.element($window);
            scope.getWindowDimensions = function () {
                return {
                    'h': w.height(),
                    'w': w.width()
                };
            };
            scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                scope.windowHeight = newValue.h;
                scope.windowWidth = newValue.w;

                scope.style = function () {
                    return {
                        'height': (newValue.h - 100) + 'px',
                        'width': (newValue.w - 100) + 'px'
                    };
                };

            }, true);

            w.bind('resize', function () {
                scope.$apply();
            });
        }
        console.log('sizer');
    })




.directive('field', function($compile) {
    var linker= function(scope, element){
        
    var template = '<input type="text" name="{{fname}}" ng-model="model">'
    .replace('{{fname}}', scope.fname);
        element.html(template);
        $compile(element.contents())(scope);
    };
  return {
    restrict: 'E',
    scope: {
      fname: '=',
      model: '='
    },
    
    replace: true,
      link: linker
  };
})

.directive('edit_select_field', function($compile) {
    var linker= function(scope, element){
        
    var template = '<input type="text" name="{{fname}}" ng-model="model">'
    .replace('{{fname}}', scope.fname);
        element.html(template);
        $compile(element.contents())(scope);
    };
  return {
    restrict: 'E',
    scope: {
      fname: '=',
      model: '='
    },
    
    replace: true,
      link: linker
  };
})

    .directive('editableBootstrapDatepicker', ['editableDirectiveFactory',   function(editableDirectiveFactory) {
        return editableDirectiveFactory({
            directiveName: 'editableBsdateNew',
            inputTpl: '<span ng-datepicker ng-options="datepickerOptions"></span>'
        });
     }
    ])
    .directive('fileModel2', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('change', function (e) {
                    $parse(attrs.fileModel2)
                        .assign(scope, element[0].files[0]);
                    scope.$apply();
                    scope.getFile2(scope.$eval(attrs.indexNumber));
                });
            }
        };
    }])



.directive('edit_checkbox_field', function($compile) {
    var linker= function(scope, element){
        
    var template = '<input type="text" name="{{fname}}" ng-model="model">'
    .replace('{{fname}}', scope.fname);
        element.html(template);
        $compile(element.contents())(scope);
    };
  return {
    restrict: 'E',
    scope: {
      fname: '=',
      model: '='
    },
    
    replace: true,
      link: linker
  };
})
    .directive('fileField', function() {
        return {
            require:'ngModel',
            restrict: 'E',
            link: function (scope, element, attrs, ngModel) {
                //set default bootstrap class
                if(!attrs.class && !attrs.ngClass){
                    element.addClass('btn');
                }

                var fileField = element.find('input');

                fileField.bind('change', function(event){
                    scope.$evalAsync(function () {
                        ngModel.$setViewValue(event.target.files[0]);
                        if(attrs.preview){
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                scope.$evalAsync(function(){
                                    scope[attrs.preview]=e.target.result;
                                });
                            };
                            reader.readAsDataURL(event.target.files[0]);
                        }
                    });
                });
                fileField.bind('click',function(e){
                    e.stopPropagation();
                });
                element.bind('click',function(e){
                    e.preventDefault();
                    fileField[0].click()
                });
            },
            template:'<button type="button"><ng-transclude></ng-transclude><input type="file" style="display:none"></button>',
            replace:true,
            transclude:true
        };
    })
    .directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }])
    .directive('scrollTo', function () {

        return {
            scope: {
                scrollTo: "="
            },
            link: function (scope, elem, attrs) {
                elem.bind('click', function() {
                    $(elem).text('dor');

                });



            }

        }
    })
    .directive('myDomDirective', function ($timeout) {
        return {
            link: function ($scope, element, attrs) {
                element.bind('click', function () {
                    $timeout(function () {

                        angular.element(element)[0].scrollTop = 0;
                    });
                });

            }
        };
    })
 .directive('aDisabled', function() {
    return {
        compile: function(tElement, tAttrs, transclude) {
            //Disable ngClick
            tAttrs["ngClick"] = "!("+tAttrs["aDisabled"]+") && ("+tAttrs["ngClick"]+")";

            //return a link function
            return function (scope, iElement, iAttrs) {

                //Toggle "disabled" to class when aDisabled becomes true
                scope.$watch(iAttrs["aDisabled"], function(newValue) {
                    if (newValue !== undefined) {
                        iElement.toggleClass("disabled", newValue);
                    }
                });

                //Disable href on click
                iElement.on("click", function(e) {
                    if (scope.$eval(iAttrs["aDisabled"])) {
                        e.preventDefault();
                    }
                });
            };
        }
    };
});
//    .directive('helloWorld', function() {
//    return {
//        restrict: 'AE',
//        replace: 'true',
//        template: '<h3>Hello World!!</h3>'
//    };
//});
