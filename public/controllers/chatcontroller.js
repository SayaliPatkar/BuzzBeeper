/**
 * Created by SAYALI on 22-11-2016.
 */
angular.module('MyApp')
    .controller('ChatCtrl','$scope',['$rootScope', function($rootScope,$scope) {
            $scope.userIdentif=$rootScope.userId;
    }]);