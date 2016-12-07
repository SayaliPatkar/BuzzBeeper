/**
 * Created by SAYALI on 06-12-2016.
 */
angular.module('MyApp')
    .factory('Authenticate', ['$http', '$location', '$rootScope', '$alert',
        function($http, $location, $rootScope, $alert) {


            return {
                login: function(user) {

                    return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(function() {
                        $location.path('/userpage');
                        $rootScope.currentUser = user;
                        $alert({
                            title: 'Cheers!',
                            content: 'You have successfully logged in.',
                            placement: 'top-right',
                            type: 'success',
                            duration: 3
                        });
                    }, function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;

                        // [START_EXCLUDE]
                        if (errorCode === 'auth/wrong-password') {
                            $alert({
                                title: 'Error!',
                                content: 'Invalid password.',
                                placement: 'top-right',
                                type: 'danger',
                                duration: 3
                            });
                        } else {
                            $alert({
                                title: 'Error!',
                                content: errorMessage,
                                placement: 'top-right',
                                type: 'danger',
                                duration: 3
                            });
                        }
                        console.log(error);
                    });

                    },


                signup: function(user) {
                    return $http.post('/api/signup', user)
                        .success(function() {
                            $location.path('/login');

                            $alert({
                                title: 'Congratulations!',
                                content: 'Your account has been created.',
                                placement: 'top-right',
                                type: 'success',
                                duration: 3
                            });
                        })
                        .error(function(response) {
                            $alert({
                                title: 'Error!',
                                content: response.data,
                                placement: 'top-right',
                                type: 'danger',
                                duration: 3
                            });
                        });
                },
                logout: function() {
                    return firebase.auth().signOut().then(function() {
                            console.log('Signed Out the old user!!');
                            $rootScope.userId=null;
                            $location.path('/home');
                            $alert({
                                content: 'You have been logged out.',
                                placement: 'top-right',
                                type: 'info',
                                duration: 3
                            });
                        }, function(error) {
                            console.error('Sign Out Error', error);
                        }
                    );
                }
            };
        }]);
