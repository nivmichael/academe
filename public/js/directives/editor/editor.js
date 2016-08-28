/**
 * Created by sergeisafrigin on 5/2/16.
 */
angular.module('acadb.directives.editor', [])

    .directive('gtEditorInput', function () {
        return {
            restrict: 'A',
            scope: {
                myId: "@eId",
                myType: '@type',
                myClass: "@eClass",
                myModel: '=ngModel',
                fastEditable: '=fastEditable',
                formEditor: '=gtEditorInput'
            },
            controllerAs: 'gtEditorInput',
            bindToController: true,
            controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

                var editor = new InputEditor(this.formEditor);

                $element.addClass('gt-control');

                // $element.attr("ng-class", "{'no-edit': !editor.isEditing(true)}");


                editor.addOnStatusChangedListener(function(status) {
                    onStatusChanged(status);
                });

                onStatusChanged();

                function onStatusChanged(status) {
                    if (!editor.isEditing(true)) {
                        // $element.attr("readonly", true);
                        $element.attr("disabled", true);
                        $element.addClass("no-edit");

                        if ($element.is(':checkbox')) {
                            $element.closest(".cbr-replaced").addClass("cbr-disabled");
                        }

                    } else {
                        // $element.removeAttr("readonly");
                        $element.removeAttr("disabled");
                        $element.removeClass("no-edit");

                        if ($element.is(':checkbox')) {
                            $element.closest(".cbr-replaced").removeClass("cbr-disabled");
                        }
                    }
                }

            }]
        };
    })

    .directive('gtEditorButton', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            scope: {
                type: "@gtType",
                formEditor: '=formEditor'
            },
            bindToController: true,
            controllerAs: 'vm',
            controller: ['$scope', '$element', '$attrs', '$log', function ($scope, $element, $attrs, $log) {

                //set ng-click and ng-show attributes by type
                switch(this.type) {

                    case "save":

                        $element.attr("ng-click", 'vm.formEditor.onSave();');
                        $element.attr("ng-show", 'vm.formEditor.shouldShowSaveButton()');

                        break;
                    case "edit":

                        $element.attr("ng-click", 'vm.formEditor.onEdit();');
                        $element.attr("ng-show", 'vm.formEditor.shouldShowEditButton()');

                        break;
                    case "cancel-edit":

                        $element.attr("ng-click", 'vm.formEditor.onCancelEdit();');
                        $element.attr("ng-show", 'vm.formEditor.shouldShowCancelButton()');

                        break;
                    case "delete":

                        $element.attr("ng-click", 'vm.formEditor.onDelete();');
                        $element.attr("ng-show", 'vm.formEditor.shouldShowDeleteButton()');

                        break;
                    default:
                        $log.warn("failed to initiate gotime editor button as the gt-type attribute is invalid", this.type);
                        return;
                }

                //remove the directive attributes to avoid infinite loop (as the compile that runs after it will r
                $element.removeAttr("gt-editor-button");
                $element.removeAttr("gt-type");

                $compile($element)($scope);
            }]
        };
    }])

;
