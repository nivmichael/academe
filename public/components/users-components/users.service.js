angular.module("acadb.services")

    .service('usersService', UsersService);


/**
 * users service constructor
 * @param $timeout
 * @param $q
 * @constructor
 */
function UsersService($timeout, $q) {

    var self = this;

    self.$timeout = $timeout;
    self.$q = $q;

}


/**
 * get all users
 */
UsersService.prototype.getUsers = function () {

    var self = this;

    return self.$q(function (resolve, reject) {
        self.$timeout(function () {
            resolve(UsersService.mockUsers);
        }, 1000);
    });
};


/**
 * get user by id
 * @param id the desired user id
 */
UsersService.prototype.getUser = function (id) {

    return self.$q(function (resolve, reject) {

        self.$timeout(function () {

            var user = _.first(UsersService.mockUsers.filter(function (user) {
                return user.id == id;
            }));

            if (user) {
                resolve(user);
            } else {
                reject("user could not be found");
            }
        }, 1000);

    });
};



UsersService.mockUsers = [{
    "education": [{
        "docParamId": 1,
        "1": {"paramName": "degree", "paramId": 1, "paramParentId": 0, "paramValue": "GSCE", "inputType": "select"},
        "2": {
            "paramName": "major",
            "paramId": 2,
            "paramParentId": 1,
            "paramValue": "Business Administration",
            "inputType": "select"
        },
        "3": {
            "paramName": "minor",
            "paramId": 3,
            "paramParentId": 2,
            "paramValue": "Accounting",
            "inputType": "select"
        },
        "4": {
            "paramName": "start_date",
            "paramId": 4,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "date"
        },
        "5": {"paramName": "end_date", "paramId": 5, "paramParentId": null, "paramValue": "", "inputType": "date"}
    }, {
        "docParamId": 1,
        "1": {"paramName": "degree", "paramId": 1, "paramParentId": 0, "paramValue": "", "inputType": "select"},
        "2": {"paramName": "major", "paramId": 2, "paramParentId": 1, "paramValue": "", "inputType": "select"},
        "3": {"paramName": "minor", "paramId": 3, "paramParentId": 2, "paramValue": "", "inputType": "select"},
        "4": {
            "paramName": "start_date",
            "paramId": 4,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "date"
        },
        "5": {"paramName": "end_date", "paramId": 5, "paramParentId": null, "paramValue": "", "inputType": "date"}
    }],
    "employment": [{
        "docParamId": 3,
        "14": {
            "paramName": "end_date",
            "paramId": 14,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "date"
        },
        "12": {
            "paramName": "profession",
            "paramId": 12,
            "paramParentId": 11,
            "paramValue": "QA",
            "inputType": "select"
        },
        "11": {
            "paramName": "main_field",
            "paramId": 11,
            "paramParentId": null,
            "paramValue": "optics",
            "inputType": "select"
        },
        "13": {
            "paramName": "start_date",
            "paramId": 13,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "date"
        }
    }, {
        "docParamId": 3,
        "14": {
            "paramName": "end_date",
            "paramId": 14,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "date"
        },
        "12": {
            "paramName": "profession",
            "paramId": 12,
            "paramParentId": 11,
            "paramValue": "",
            "inputType": "select"
        },
        "11": {
            "paramName": "main_field",
            "paramId": 11,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "select"
        },
        "13": {
            "paramName": "start_date",
            "paramId": 13,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "date"
        }
    }],
    "career_goals": [{
        "docParamId": 5,
        "19": {
            "paramName": "main_field",
            "paramId": 19,
            "paramParentId": null,
            "paramValue": "optics",
            "inputType": "select"
        },
        "20": {
            "paramName": "profession",
            "paramId": 20,
            "paramParentId": 19,
            "paramValue": "developer",
            "inputType": "select"
        },
        "21": {
            "paramName": "job_title",
            "paramId": 21,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "select"
        },
        "22": {
            "paramName": "language",
            "paramId": 22,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "select"
        },
        "23": {
            "paramName": "location",
            "paramId": 23,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "text"
        },
        "24": {
            "paramName": "available_from",
            "paramId": 24,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "date"
        }
    }],
    "files": [{
        "docParamId": 8,
        "30": {
            "paramName": "profile_picture",
            "paramId": 30,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "files"
        }
    }],
    "personal_information": {
        "id": 109,
        "role": "admin",
        "type": "tech-admin",
        "subtype": "employer",
        "status": "inactive",
        "email": "sergei@gotime.it",
        "password_new": null,
        "first_name": "Sergei",
        "last_name": "Safrigin",
        "gender": "male",
        "martial_status": "maried",
        "education_status": "student",
        "street_1": "Rothschild 15, Tel-Aviv",
        "city": "Tel-Aviv",
        "state": "Israel",
        "zipcode": null,
        "country": "Israel",
        "phone_1": null,
        "mobile": "0525978957",
        "date_of_birth": "1992-07-25",
        "registration": null,
        "last_login": null,
        "send_newsletters": 1,
        "send_notifications": 1,
        "created_at": "2016-06-19 08:05:47",
        "updated_at": "2016-08-14 00:12:46"
    }
}, {
    "education": [{
        "docParamId": 1,
        "1": {"paramName": "degree", "paramId": 1, "paramParentId": 0, "paramValue": "BA", "inputType": "select"},
        "2": {
            "paramName": "major",
            "paramId": 2,
            "paramParentId": 1,
            "paramValue": "Business Administration",
            "inputType": "select"
        },
        "3": {
            "paramName": "minor",
            "paramId": 3,
            "paramParentId": 2,
            "paramValue": "Accounting",
            "inputType": "select"
        },
        "4": {
            "paramName": "start_date",
            "paramId": 4,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "date"
        },
        "5": {"paramName": "end_date", "paramId": 5, "paramParentId": null, "paramValue": "", "inputType": "date"}
    }, {
        "docParamId": 1,
        "1": {"paramName": "degree", "paramId": 1, "paramParentId": 0, "paramValue": "", "inputType": "select"},
        "2": {"paramName": "major", "paramId": 2, "paramParentId": 1, "paramValue": "", "inputType": "select"},
        "3": {"paramName": "minor", "paramId": 3, "paramParentId": 2, "paramValue": "", "inputType": "select"},
        "4": {
            "paramName": "start_date",
            "paramId": 4,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "date"
        },
        "5": {"paramName": "end_date", "paramId": 5, "paramParentId": null, "paramValue": "", "inputType": "date"}
    }],
    "employment": [{
        "docParamId": 3,
        "14": {
            "paramName": "end_date",
            "paramId": 14,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "date"
        },
        "12": {
            "paramName": "profession",
            "paramId": 12,
            "paramParentId": 11,
            "paramValue": "QA",
            "inputType": "select"
        },
        "11": {
            "paramName": "main_field",
            "paramId": 11,
            "paramParentId": null,
            "paramValue": "optics",
            "inputType": "select"
        },
        "13": {
            "paramName": "start_date",
            "paramId": 13,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "date"
        }
    }, {
        "docParamId": 3,
        "14": {
            "paramName": "end_date",
            "paramId": 14,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "date"
        },
        "12": {
            "paramName": "profession",
            "paramId": 12,
            "paramParentId": 11,
            "paramValue": "",
            "inputType": "select"
        },
        "11": {
            "paramName": "main_field",
            "paramId": 11,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "select"
        },
        "13": {
            "paramName": "start_date",
            "paramId": 13,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "date"
        }
    }],
    "career_goals": [{
        "docParamId": 5,
        "19": {
            "paramName": "main_field",
            "paramId": 19,
            "paramParentId": null,
            "paramValue": "optics",
            "inputType": "select"
        },
        "20": {
            "paramName": "profession",
            "paramId": 20,
            "paramParentId": 19,
            "paramValue": "developer",
            "inputType": "select"
        },
        "21": {
            "paramName": "job_title",
            "paramId": 21,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "select"
        },
        "22": {
            "paramName": "language",
            "paramId": 22,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "select"
        },
        "23": {
            "paramName": "location",
            "paramId": 23,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "text"
        },
        "24": {
            "paramName": "available_from",
            "paramId": 24,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "date"
        }
    }],
    "files": [{
        "docParamId": 8,
        "30": {
            "paramName": "profile_picture",
            "paramId": 30,
            "paramParentId": null,
            "paramValue": "",
            "inputType": "files"
        }
    }],
    "personal_information": {
        "id": 25,
        "role": "admin",
        "type": "tech-admin",
        "subtype": "jobseeker",
        "status": "inactive",
        "email": "dor@acade-me.co.il",
        "password": "$2y$10$BI4I3jLSJbYgqc4FFFrqEuwyExaGo8Gf32qSBZnauppCLGVdIuML2",
        "password_new": null,
        "first_name": "Dor",
        "last_name": "Shoham",
        "gender": "male",
        "martial_status": "single",
        "education_status": "student",
        "street_1": "",
        "city": "atlanta",
        "state": "Georgia",
        "zipcode": "",
        "country": "USA",
        "phone_1": "",
        "mobile": "0542037641",
        "date_of_birth": "0000-00-00",
        "registration": null,
        "last_login": "2016-06-19 07:33:53",
        "send_newsletters": 0,
        "send_notifications": 0,
        "created_at": "2016-05-09 12:20:01",
        "updated_at": "2016-06-20 10:51:44",
        "remember_token": ""
    }
}];


UsersService.$inject = ['$timeout', '$q'];