angular.module('MyApp')
    .controller('ShowCtrl', ['$scope', '$rootScope', '$routeParams', 'Show','User','Subscription',
        function($scope, $rootScope, $routeParams, Show, User,Subscription) {
            console.log($routeParams.id );
            Show.get({ _id: $routeParams.id }, function(show) {

                $scope.show = show;

                $scope.userid=$rootScope.userId;

                $scope.isSubscribed = function() {
                    return $scope.show.subscribers.indexOf($scope.userid) !== -1;
                };
                $scope.subscribe = function() {
                    Subscription.subscribe(show,$scope.userid).success(function() {
                        $scope.show.subscribers.push($scope.userid);
                    });
                };
                $scope.unsubscribe = function() {
                    Subscription.unsubscribe(show,$scope.userid).success(function() {
                        var index = $scope.show.subscribers.indexOf($scope.userid);
                        $scope.show.subscribers.splice(index, 1);
                    });
                };

                $scope.nextEpisode = show.episodes.filter(function(episode) {
                    return new Date(episode.firstAired) > new Date();
                })[0];
            });
        }]);