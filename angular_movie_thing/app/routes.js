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
    .otherwise({
      redirectTo: '/'
    })
});
