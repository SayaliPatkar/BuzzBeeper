angular.module('MyApp')
    .controller('chnltstCtrl',['$scope', 'Show', function($scope, Show) {

        $scope.headingTitle = 'All Shows from given network';

        $scope.channels = ['HBO', 'NBC', 'USA Network','NFL Network','Destination America','Canal de las Estrellas','YouTube','NHK','Real Time','BBC One'];

        $scope.headingTitle = 'All Shows from given network';

        $scope.filterByChannel = function(channel) {
            $scope.shows = Show.query({network:channel});
            console.log(shows);
        };

    }]);