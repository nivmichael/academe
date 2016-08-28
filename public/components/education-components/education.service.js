angular.module("acadb.services")

    .service('educationService', EducationService);


/**
 * users service constructor
 * @param $timeout
 * @param $q
 * @constructor
 */
function EducationService($timeout, $q) {

    var self = this;

    self.$timeout = $timeout;
    self.$q = $q;

}


/**
 * get all possible degrees
 * @returns {*}
 */
EducationService.prototype.getDegrees = function () {

    var self = this;

    return self.$q(function (resolve, reject) {
        self.$timeout(function () {
            resolve(EducationService.mockDegrees);
        }, 1000);
    });
};


/**
 * get all possible education statuses
 * @returns {*}
 */
EducationService.prototype.getEducationStatuses = function () {

    var self = this;

    return self.$q(function (resolve, reject) {
        self.$timeout(function () {
            resolve(EducationService.mockEducationStatuses);
        }, 1000);
    });
};


/**
 * get all possible  faculties
 * @returns {*}
 */
EducationService.prototype.getFaculties = function () {

    var self = this;

    return self.$q(function (resolve, reject) {
        self.$timeout(function () {
            resolve(EducationService.mockFaculties);
        }, 1000);
    });
};



EducationService.mockFaculties = [{
    id: 91,
    value: "Business Administration"
}, {
    id: 95,
    value: "Accounting"
}];


EducationService.mockDegrees = [{
    id: 78,
    value: "GSCE"
}, {
    id: 81,
    value: "BA"
}];


EducationService.mockEducationStatuses = [{
    id: 67,
    value: "student"
}, {
    id: 68,
    value: "intern"
}, {
    id: 69,
    value: "graduate"
}, {
    id: 70,
    value: "alimni"
}];



EducationService.$inject = ['$timeout', '$q'];