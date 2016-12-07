/**
 * Created by Administrator on 03-12-2016.
 */
angular.module('MyApp')
    .factory('Subscription', ['$http', function($http) {
        return {
            subscribe: function(show, userid) {
                return $http.post('/api/subscribe', { showId: show._id, userId:userid });
            },
            unsubscribe: function(show, userid) {
                return $http.post('/api/unsubscribe', { showId: show._id, userId:userid });
            }
        };
    }]);
