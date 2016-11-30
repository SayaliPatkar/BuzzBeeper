/**
 * Created by SAYALI on 30-11-2016.
 */
angular.module('MyApp').
filter('fromNow', function() {
    return function(date) {
        return moment(date).fromNow();
    }
});