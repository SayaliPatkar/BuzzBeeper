

//ngCookies-  for reading and writing browser cookies.
//ngResource- provides interaction support with RESTful services via the $resource service
//ngMessages- is a directive that is designed to show and hide messages based on the state of a key/value object that it listens on
//ngRoute- module provides routing and deeplinking services
//mgcrea.ngStrap- AngularStrap is a set of native directives that enables seamless integration of Bootstrap#^3.0 into your AngularJS#^1.2 application

angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
    .config(['$locationProvider','$routeProvider',function($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/signup', {
                templateUrl: 'views/signup.html',
                controller: 'SignupCtrl'
            })
            .when('/userpage', {
                templateUrl: 'views/userpage.html',
                controller: 'UserCtrl'
            })
            .when('/add', {
                templateUrl: 'views/add.html',
                controller: 'AddCtrl'
            })
            .when('/contactus', {
                templateUrl: 'views/contactus.html',
                controller: 'contactCtrl'
            })
            .when('/chat', {
                templateUrl: 'views/chatroom.html',
                controller: 'ChatCtrl'
            })
            .when('/channel', {
                templateUrl: 'views/channel.html',
                controller: 'chnltstCtrl'
            })
            .when('/shows', {
                templateUrl: 'views/show.html',
                controller: 'ShowCtrl'
            })
            .when('/logout', {
                templateUrl: 'views/logout.html',
                controller: 'LogoutCtrl'
            })
            .when('/shows/:id', {
                templateUrl: 'views/show.html',
                controller: 'ShowCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

