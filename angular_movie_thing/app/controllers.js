movieThing.controller('mainController', ['$scope', 'loggedIn', 'logOut','apiCalls', function($scope, loggedIn, logOut, apiCalls) {
  $scope.email = loggedIn.email;
  $scope.userID = loggedIn.userID;

  $scope.$watch('email', function() {
        loggedIn.email = $scope.email;
  })

  $scope.logOut = logOut.clear;
  $scope.lists = apiCalls.getLists(1);
  $scope.addList = function() {
    console.log('adding...')
  }

}]);


movieThing.controller('viewlistController', ['$scope', '$routeParams', 'loggedIn','logOut','apiCalls','clearMovieSearch', function($scope, $routeParams, loggedIn, logOut, apiCalls, clearMovieSearch) {

  $scope.email = loggedIn.email
  $scope.userID = loggedIn.userID;

  $scope.$watch('email', function() {
        loggedIn.email = $scope.email;
  })
  //set factory reusable functions
  $scope.logOut = logOut.clear;
  $scope.clearMovieSearch = clearMovieSearch.enter

  //real stuff
  $scope.movies = apiCalls.getMovies($routeParams.id);
  $scope.showSavedMovie = function(imdb) {
    $scope.displayMovie = apiCalls.findMovieByImdb(API_KEY, imdb);
  }
  $scope.searchMovieTitle = function() {
    $scope.displayMovie = apiCalls.findMovieByTitle(API_KEY, $scope.movieTitle);
    console.log($scope.displayMovie)
  }

}]);

movieThing.controller('addtomanyController',['$scope','loggedIn','logOut', 'clearMovieSearch','apiCalls', function($scope, loggedIn, logOut, clearMovieSearch,apiCalls) {
  //scope vars
  $scope.email = loggedIn.email
  $scope.userID = loggedIn.userID;

  $scope.$watch('email', function() {
        loggedIn.email = $scope.email;
  })
  $scope.movieTitle = "";
  //set factory reusable functions
  $scope.logOut = logOut.clear;
  $scope.clearMovieSearch = clearMovieSearch.enter

  //real stuff
  $scope.searchMovieTitle = function() {
    $scope.displayMovie = apiCalls.findMovieByTitle(API_KEY, $scope.movieTitle)
    console.log($scope.displayMovie)
  }

}]);
