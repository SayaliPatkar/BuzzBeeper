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
                firebase.auth().signOut().then(function() {
                    console.log('Signed Out the old user!!');
                }, function(error) {
                    console.error('Sign Out Error', error);
                });
            }
            firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
                $location.path('/userpage');

                console.log('Welcome user!!');
            }, function(error) {
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
        };
    }]);
