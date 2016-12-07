/**
 * Created by SAYALI on 07-12-2016.
 */
angular.module('MyApp')
    .controller('LogoutCtrl',['$scope','$location', '$rootScope', function($scope,$location,$rootScope) {
        $scope.logout = function() {
            firebase.auth().signOut().then(function() {
                console.log('Signed Out the old user!!');
                $rootScope.userId=null;
                $location.path('/home');
            }, function(error) {
                console.error('Sign Out Error', error);
            });
        }

        firebase.auth().onAuthStateChanged(function(user){
            if(user){
            }else{
                $timeout(function() {
                    $scope.success = true;
                    $scope.failure = false;
                });
            }
        });


    }]);