angular.module('MyApp')
    .controller('chnltstCtrl',['$scope', 'Show', function($scope, Show) {

        $scope.headingTitle = 'All Shows from given network';

        $scope.channels = ['HBO', 'NBC', 'USA Network'];

        $scope.headingTitle = 'All Shows from given network';

        $scope.filterByChannel = function(channel) {
            console.log(channel);
            console.log(shows);
            $scope.shows = Show.query();

        };

    }]);