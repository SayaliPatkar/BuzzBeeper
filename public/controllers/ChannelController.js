angular.module('MyApp')
    .controller('channelCtrl', function($scope, Show) {
        $scope.headingTitle = 'Top 12 Shows';
        $scope.shows = Show.query();
        $scope.filterByGenre = function(genre) {
            $scope.shows = Show.query({ genre: genre });
            $scope.headingTitle = genre;
        };
        $scope.filterByAlphabet = function(char) {
            $scope.shows = Show.query({ alphabet: char });
            $scope.headingTitle = char;
        };
    });