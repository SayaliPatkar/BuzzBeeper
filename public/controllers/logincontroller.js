/**
 * Created by SAYALI on 16-11-2016.
 */
// Initialized Firebase in index.html

angular.module('MyApp')
    .controller('LoginCtrl', ['$scope','$location', '$rootScope', function($scope,$location,$rootScope) {
        $scope.login = function() {
            var email = $scope.email;
            var password = $scope.password;
            if(firebase.auth().currentUser){
                firebase.auth().signOut();
            }
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
            $location.path('/userpage');
        };
    }]);
