movieThing.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'pages/mainlistview.htm',
        controller: 'mainController'
    })

    .when('/addtomany', {
        templateUrl: 'pages/addtomanylists.htm',
        controller: 'addtomanyController'
    })

    .when('/list/:id', {
        templateUrl: 'pages/viewlist.htm',
        controller: 'viewlistController'
    })
    .when('/signup', {
      templateUrl:'pages/signup.htm',
      controller:'signUpController'
    })
    .when('/signin', {
      templateUrl:'pages/signIn.htm',
      controller:'signInController'
    })
    .otherwise({
      redirectTo: '/'
    })
});
