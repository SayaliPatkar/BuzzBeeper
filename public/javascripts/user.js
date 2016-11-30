/**
 * Created by SAYALI on 30-11-2016.
 */
angular.module('MyApp')
    .factory('User', ['$resource', function($resource) {
        var currentUser;
        return $resource('/user/:_id');

    }]);
