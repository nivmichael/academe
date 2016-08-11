angular.module('acadb.services.resources', []).
    value('version', '0.1')

    .factory('ParamData', ['$resource',
        function($resource) {
            return $resource('api/param/:id', {id: '@id'}, {
                'update': { method:'PUT' },
                'insertNew': { method:'POST' },
                'delete':{method:'DELETE'},
                'list': {method: 'GET', isArray: true }



            });
        }])
    .factory('UserData', ['$resource',
        function($resource) {
            return $resource('api/users/:id', {id: '@id'}, {
                'update': { method:'PUT' },
                'insertNew': { method:'POST' },
                'delete':{method:'DELETE'},
                'list': {method: 'GET', isArray: true }
            });
        }])

    .factory('DocParamData', ['$resource',
        function($resource) {
            return $resource('api/docParam/:id', {id: '@id'}, {
                'update': { method:'PUT' },
                'insertNew': { method:'POST' },
                'delete':{method:'DELETE'},
                'list': {method: 'GET', isArray: true }
            });
        }])

    .factory('DocTypeData', ['$resource',
        function($resource) {
            return $resource('api/docType/:id', {id: '@id'}, {
                'update': { method:'PUT' },
                'insertNew': { method:'POST' },
                'delete':{method:'DELETE'},
                'list': {method: 'GET', isArray: true }
            });
        }])

    .factory('ParamTypeData', ['$resource',
        function($resource) {
            return $resource('api/paramType/:id', {id: '@id'}, {
                'update': { method:'PUT' },
                'insertNew': { method:'POST' },
                'delete':{method:'DELETE'},
                'list': {method: 'GET', isArray: true }
            });
        }])
    .factory('ColumnData', ['$resource',
        function($resource) {
            return $resource('api/columns/:name', {id: '@name'}, {
                'update': { method:'PUT' },
                'insertNew': { method:'POST' },
                'delete':{method:'DELETE'},
                'list':{method:'GET', transformRequest: function(data, headerFn){
                    return JSON.stringify(data);
                }
                }
            });
        }])
    .factory('ParamValueData', ['$resource',
        function($resource) {
            return $resource('api/paramValue/:id', {id: '@id'}, {
                'update': { method:'PUT' },
                'insertNew': { method:'POST' },
                'delete':{method:'DELETE'},
                'list': {method: 'GET', isArray: true }
            });
        }])
    .factory('SysParamValuesData', ['$resource',
        function($resource) {
            return $resource('api/sysParamValues/:id', {id: '@id'}, {
                'update': { method:'PUT' },
                'insertNew': { method:'POST' },
                'delete':{method:'DELETE'},
                'list': {method: 'GET', isArray: true }

            });
        }])
    .factory('PostData', ['$resource',
        function($resource) {
            return $resource('api/post/:id', {id: '@id'}, {
                'save':   {method:'POST'},
                'update': { method:'PUT' },
                'delete':{method:'DELETE'},
                'list': {method: 'GET', isArray: true }

            });
        }])

    .factory('TableData', ['$resource',
        function($resource) {
            return $resource('api/db/:table', {table: '@table'}, {
                'save':     {method:'POST'},
                'update':   {method:'PUT' },
                'delete':   {method:'DELETE'},
                'list':     {method: 'GET', isArray: true },
            });
        }])
    .factory('An_searchData', ['$resource',
        function($resource) {
            return $resource('api/an_search/:id', {id: '@id'}, {
                'save':   {method:'POST'},
                'update': { method:'PUT' },
                'delete':{method:'DELETE'},
                'list': {method: 'GET', isArray: true }
            });
        }])
    .factory('An_applyData', ['$resource',
        function($resource) {
            return $resource('api/an_apply/:id', {id: '@id'}, {
                'save':   {method:'POST'},
                'update': { method:'PUT' },
                'delete':{method:'DELETE'},
                'list': {method: 'GET', isArray: true }
            });
        }])
    .factory('An_openFileData', ['$resource',
        function($resource) {
            return $resource('api/an_open_file/:id', {id: '@id'}, {
                'save':   {method:'POST'},
                'update': { method:'PUT' },
                'delete':{method:'DELETE'},
                'list': {method: 'GET', isArray: true }
            });
        }])
    .factory('RoleData', ['$resource',
        function($resource) {
            return $resource('api/role/:id', {id: '@id'}, {
                'update': { method:'PUT' },
                'insertNew': { method:'POST' },
                'delete':{method:'DELETE'},
                'list': {method: 'GET', isArray: true }



            });
        }])
    .factory('PermissionData', ['$resource',
        function($resource) {
            return $resource('api/permission/:id', {id: '@id'}, {
                'update': { method:'PUT' },
                'insertNew': { method:'POST' },
                'delete':{method:'DELETE'},
                'list': {method: 'GET', isArray: true}
                //transformResponse: function(data, header){
                //    var jsonData = JSON.parse(data); //Getting string data in response
                //    var permissions = [];
                //
                //    angular.forEach(jsonData, function(item){
                //        var permission = {name:item.name}
                //        permissions.push(permission);
                //    });
                //    permissions = angular.toJson(permissions);
                //    return permissions;
                //}}



            });
        }])
