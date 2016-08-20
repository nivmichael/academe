"use strict";

angular.module('acadb.components.edit-event-invitees-modal', [])

    .component('editEventInvitees', {
        templateUrl: 'components/edit-event-invitees-component/edit-event-invitees-modal.html',
        controller: EditEventInviteesModal,
        bindings: {
            close: '='
        }
    })

;


/**
 * constructor
 * @param $gotimeapi
 * @param $log
 * @param alertFactory
 * @param $subDomain
 * @param $state
 * @constructor
 */
function EditEventInviteesModal($log) {
    var vm = this;

    vm.$log = $log;
}

/**
 * initiate controller
 */
EditEventInviteesModal.prototype.$onInit = function() {

    var vm = this;

    vm.$log.debug("########@@@@@@@@!!!!!!!!!!!!!!!");

};

/**
 * destroy controller
 */
EditEventInviteesModal.prototype.$onDestroy = function() {};

/**
 * close the forgot password modal
 */
EditEventInviteesModal.prototype.close = function() {
    var vm = this;

    vm.close();
};

EditEventInviteesModal.$inject = ['$log'];