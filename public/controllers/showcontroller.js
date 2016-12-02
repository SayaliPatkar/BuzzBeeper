/**
 * Created by SAYALI on 16-11-2016.
 */
angular.module('MyApp')
    .controller('ShowCtrl', ['$scope', 'Show', function($scope, Show) {

         $scope.headingTitle = 'All Shows so far in Database';

        $scope.shows = Show.query();

    }]);