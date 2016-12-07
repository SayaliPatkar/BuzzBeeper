/**
 * Created by SAYALI on 16-11-2016.
 */
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

