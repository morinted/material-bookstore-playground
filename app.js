angular
    .module('bookShop', ['ngMaterial', 'ngRoute', 'books'])
    .config(function($mdThemingProvider, $mdIconProvider, $routeProvider) {
        $routeProvider.
            when('/', {
              templateUrl: './src/bookstore/main.html',
              controller: 'MainController'
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
                .primaryPalette('brown')
                .accentPalette('red');

    });