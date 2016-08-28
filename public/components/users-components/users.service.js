angular.module("acadb.services")

    .service('usersService', UsersService);


/**
 * users service constructor
 * @param $timeout
 * @param $q
 * @constructor
 */
function UsersService($timeout, $q, UserData) {

    var self = this;

    self.$timeout = $timeout;
    self.$q = $q;
    self.UserData = UserData;

}


/**
 * get all users
 */
UsersService.prototype.getUsers = function () {
    return this.UserData.list().$promise;
};


/**
 * get user by id
 * @param id of the desired user
 */
UsersService.prototype.getUser = function (id) {
    return this.UserData.get({id: id}).$promise;
};



UsersService.$inject = ['$timeout', '$q', 'UserData'];