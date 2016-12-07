/**
 * Created by SAYALI on 30-11-2016.
 */
angular.module('MyApp')
    .factory('User', ['$resource', function($resource) {
        return $resource('/api/user/:_id');

    }]);
