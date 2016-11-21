/**
 * Created by SAYALI on 21-11-2016.
 */
angular.module('MyApp')
    .controller('SignupCtrl', ['$scope','$location',function($scope, $location) {
        $scope.signUp = function() {
            var email = $scope.emailId;
            var password = $scope.password;
            var password1 = $scope.passwordC;
            if(password1!= password){
                alert("Please Enter Matching Passwords")
            }
            firebase.auth().createUserWithEmailAndPassword(email, password1).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
                // [END_EXCLUDE]
            });
            $location.path('/login');
        };
    }]);