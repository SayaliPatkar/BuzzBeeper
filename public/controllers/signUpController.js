/**
 * Created by SAYALI on 21-11-2016.
 */
angular.module('MyApp')
    .controller('SignupCtrl', ['$scope','$location','User',function($scope, $location,User) {
        $scope.signUp = function() {
            var email = $scope.emailId;
            var password = $scope.password;
            var password1 = $scope.passwordC;
            if(password1!= password){
                alert("Please Enter Matching Passwords")
            }
            firebase.auth().createUserWithEmailAndPassword(email, password1).then(function(){
                    User.save({id : email});
                    alert('You have been registered with us! Login again to use services');
                    $location.path('/login');
            }, function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });

        };
    }]);