angular.module('acadb.services.RolesAndPermissions', [])
    .value('version', '0.1')
    .factory('RolesAndPermissions', function($state, $http, $stateParams, Account, $q, RoleData, PermissionData) {
        var roles,permissions,res;
        return {
            getRoles: function(){
                roles = RoleData.list(function(res){
                   roles = res;
                });

                return roles;
            },
            getPermissions: function(){
                permissions = PermissionData.list();
                console.log(permissions);
                return permissions;
            }
        }
    });