/**
 * Created by SAYALI on 21-11-2016.
 */
angular.module('MyApp')
    .controller('UserCtrl',['$scope', 'Show','$rootScope', function($scope, Show, $rootScope) {

        document.getElementById('myNavbar').innerHTML = '<ul class="nav navbar-nav navbar-right"> <li data-match-route="/userpage"><a href="/userpage">Home</a></li> <li data-match-route="/channel"><a href="/channel">Channels</a></li> <li data-match-route="/contactus"><a href="/contactus">Contact Us</a></li><ul class="nav navbar-nav pull-right" id="logoutPane"> <li><a onclick="logout()" href="javascript:void(0);"">Logout</a></li> </ul> </ul>';

        $scope.headingTitle = 'All Shows so far in Database';
        $scope.shows = Show.query({user:$rootScope.userId});
        }]);
