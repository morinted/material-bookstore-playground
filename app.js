angular
    .module('bookShop', ['ngMaterial', 'ngRoute', 'books'])
    .config(function($mdThemingProvider, $mdIconProvider, $routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: './src/bookstore/main.html',
                controller: 'MainController'
            }).
            when('/book', {
                templateUrl: './src/bookstore/book.html',
                controller: 'MainController',
            }).
            when('/result', {
                templateUrl: './src/bookstore/result.html',
                controller: 'MainController'
            }).
            when('/search-result', {
                templateUrl: './src/bookstore/search-results.html',
                controller: 'MainController'
            }).
            when('/checkout', {
                templateUrl: './src/bookstore/checkout.html',
                controller: 'MainController'
            }).
            when('/confirm', {
                templateUrl: './src/bookstore/confirmation.html',
                controller: 'MainController',
            }).
            otherwise({
                redirectTo: '/'
            });
        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu"       , "./assets/svg/menu.svg"        , 24)
            .icon("share"      , "./assets/svg/share.svg"       , 24)
            .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
            .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
            .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
            .icon("phone"      , "./assets/svg/phone.svg"       , 512)
            .icon("home"      , "./assets/svg/home.svg"       , 24);

            $mdThemingProvider.theme('default')
                .primaryPalette('lime')
                .accentPalette('green');

    });