/**
 * Created by SAYALI on 21-11-2016.
 */

angular.module('MyApp')
    .factory('Show', ['$resource', function($resource) {
        return $resource('/api/shows/:_id');
    }]);
