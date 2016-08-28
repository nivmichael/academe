"use strict";

angular.module('acadb.services.edit-event-invitees-modal', [])

    .service('editEventInviteesModalService', EditEventInviteesModalService);


function EditEventInviteesModalService($uibModal) {

    var vm = this;

    this.$uibModal = $uibModal;
}

/**
 * open an forgot password modal
 * @param onSuccess
 * @param onError
 */
EditEventInviteesModalService.prototype.open = function (invites, onSuccess, onError) {

    var vm = this;

    vm.$uibModal.open({
        animation: true,
        template: '<edit-event-invitees invites = "invites" close = "close"></edit-event-invitees>',
        controller: EditEventInviteesModalDataTransmitCtrl,
        size: 'md',
        backdrop: true,
        resolve: {
            payload: function () {
                return {
                    invites: invites
                };
            }
        }
    }).result.then(onSuccess, onError);
};

EditEventInviteesModalService.$inject = ['$uibModal'];


/**
 * a proxy controller that used to transfer data between the service and the component as the modal has an isolated scope
 * (can't be shared directly with the service's scope)
 * @param $scope
 * @param payload
 * @constructor
 */
function EditEventInviteesModalDataTransmitCtrl($scope, payload, $uibModalInstance) {
    $scope.close = function (invitees) {

        //if invitees were passed close the modal with a success, else close with error
        if (invitees) {
            $uibModalInstance.close(invitees);
        } else {
            $uibModalInstance.dismiss();
        }

    };


    $scope.invites = payload.invites;
}

EditEventInviteesModalDataTransmitCtrl.$inject = ['$scope', 'payload', '$uibModalInstance'];
