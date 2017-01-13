angular.module('MyApp')
    .controller('chnltstCtrl',['$scope', 'Show', function($scope, Show) {

        $scope.headingTitle = 'All Shows from given network';

        $scope.channels = ['HBO', 'Netflix', 'USA Network','AMC','The CW','CBS'];

        //$scope.channel='HBO';

        $scope.headingTitle = 'All Shows from given network';

        //on first hit show data from channel HBO
        $scope.shows = Show.query({network:'HBO'});

        $scope.filterByChannel = function(channel) {
            $scope.shows = Show.query({network:channel});
        };

    }]);