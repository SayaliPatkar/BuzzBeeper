/**
 * Created by SAYALI on 16-11-2016.
 */
// Initialized Firebase in index.html

angular.module('MyApp')
    .controller('LoginCtrl', ['$scope','$location', '$rootScope', '$timeout', 'User', function($scope,$location,$rootScope,$timeout,User) {
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
                 /*//written on 6-12-17 for cookie issue
                  to store login info
                  used for functionalities user home page, subscribe, unsubscribe */
                 $rootScope.userId =email;

                 //redirect to user home page
             $location.path('/userpage');
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
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                $timeout(function() {
                    $scope.success = true;
                    $scope.failure = false;
                });
                console.log("Welcome "+ user.email)
            }else{}
        });

    }]);
