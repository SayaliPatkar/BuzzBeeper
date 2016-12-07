angular.module('MyApp')
  .controller('DetailCtrl', function($scope, $rootScope, $routeParams, Show) {
      Show.get({ _id: $routeParams.id }, function(show) {
        $scope.show = show;

        $scope.isSubscribed = function() {
          return $scope.show.subscribers.indexOf($rootScope.currentUser._id) !== -1;
        };

        $scope.nextEpisode = show.episodes.filter(function(episode) {
          return new Date(episode.firstAired) > new Date();
        })[0];
      });
    });