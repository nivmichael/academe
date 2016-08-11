
angular.module('acadb.services.form', []).value('version', '0.1')

.factory('Form', function($http, $q, $rootScope, $stateParams, SysParamValuesData) {

    var forms     = [];
    var adminForms = [];
    var form      = [];
    var	next_keys = [];
    var prev_key  = false;
    var  getJobPostForm, options, new_iteration;
    var steps     = [];

    return {
        getAdminForm: function(form){
            var defer= $q.defer();

            if ( !adminForms[form] ) {
                adminForms[form] =  $http.get('/api/admin/forms/'+form).then(function(res){
                    //next line could be seriously stupid and unnecessary..
                    //adminForms[form] = adminForms[form];
                    adminForms[form] = res.data;
                    defer.resolve(adminForms[form]);
                });
            }else if(adminForms[form]){

                defer.resolve(adminForms[form]);
            }

            return defer.promise;
        },
        getForm: function(form){
            var defer= $q.defer();
            if ( !forms[form] ) {
                forms[form] =  $http.get('/api/form/'+form , function(form){
                    console.log(form);
                });
                defer.resolve(forms[form]);
            }else if(forms[form]){
                defer.resolve(forms[form]);
            }else{
                defer.reject();
            }
            return defer.promise;
        },
        getAllOptionValues: function(){
            if ( !options ) {
                if (typeof options == 'undefined') options = [];
                options =  options.length ? null : $http.get('api/getAllOptionValues').then(function(response) {
                    options = response;
                    return $q.when(options);
                });
            }
            return $q.when(options);
        },
        remove: function(array,doc_type,index,ref_id) {
            if(doc_type == 'post'){
                doc_type = 2;
            }else if(doc_type == 'user'){
                doc_type = 1;
            }
            $http.post('api/deleteIterable', {doc_type:doc_type,ref_id:ref_id,iteration:index,docParam:array} );
        },
        validate: function(param, value) {
            var response;
            //console.log(param, value);
            response = $http.post('api/validate', {all: param, param: value, stateParams:$stateParams}).then(function(response) {

                return response;

            });
            return	response;
        }
        //getJobPostForm: function() {
        //	if ( !getJobPostForm ) {
        //		// $http returns a promise, which has a then function, which also returns a promise
        //		getJobPostForm = $http.get('api/forms/jobPost').then(function (response) {
        //			// The then function here is an opportunity to modify the response
        //			// The return value gets picked up by the then in the controller.
        //			return response.data;
        //		});
        //	}
        //	// Return the promise to the controller
        //	return getJobPostForm;
        //},

        //getForms: function(type) {
        //    if ( !form[type] ) {
        //        // $http returns a promise, which has a then function, which also returns a promise
        //        form[type] = $http.get('api/forms/'+type).then(function (response) {
        //            // The then function here is an opportunity to modify the response
        //            // The return value gets picked up by the then in the controller.
        //            return response.data;
        //        });
        //    }
        //
        //    console.log(form[type]);
        //    return form[type];
        //},
        //next_form: function(){
        //    for (var key in $rootScope.steps) {
        //        if($rootScope.steps[key]['belongsTo'] ==  $stateParams.type){
        //            if (!prev_key) {
        //                prev_key = $rootScope.steps[key].value;
        //            } else {
        //                next_keys[prev_key] = $rootScope.steps[key].value;
        //                prev_key = $rootScope.steps[key].value;
        //            }
        //        }
        //    }
        //    return next_keys;
        //},
        //nextDoc: function() {
        //    var doc = $stateParams.doc;
        //    if (next_keys[doc]) {
        //        doc = next_keys[doc];
        //        console.log(doc);
        //        return doc;
        //    } else {
        //        return false;
        //    }
        //},

        //add: function() {
        //	if(!new_iteration) {
        //		if (typeof new_iteration == 'undefined') new_iteration = [];
        //		new_iteration = $http.get('api/forms/register_'+$stateParams.type).then(function(response){
        //			new_iteration = response.data;
        //
        //
        //
        //			return $q.when(new_iteration);
        //		})
        //	}
        //	return $q.when(angular.copy(new_iteration));
        //},


    };
})