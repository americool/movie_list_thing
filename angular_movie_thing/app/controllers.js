movieThing.controller('mainController', ['$scope', 'loggedIn', 'logOut','apiCalls', function($scope, loggedIn, logOut, apiCalls) {
  $scope.email = loggedIn.email;
  $scope.userID = loggedIn.userID;
  $scope.listTitle=""

  $scope.$watch('email', function() {
        loggedIn.email = $scope.email;
  })

  $scope.logOut = logOut.clear;
  $scope.lists = apiCalls.getLists(1);

  $scope.addList = function() {
    apiCalls.addList($scope.listTitle, $scope.userID).then(function(){
      $scope.lists = apiCalls.getLists($scope.userID);
      $scope.listTitle =""
    })
  }

  $scope.deleteList = (listID) => {
    apiCalls.deleteList(listID).then(function(){
      $scope.lists = apiCalls.getLists($scope.userID);
    })
  }

}]);


movieThing.controller('viewlistController', ['$scope', '$routeParams', 'loggedIn','logOut','apiCalls','clearMovieSearch', function($scope, $routeParams, loggedIn, logOut, apiCalls, clearMovieSearch) {

  $scope.email = loggedIn.email
  $scope.userID = loggedIn.userID;
  $scope.viewAddToList = false;

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
    apiCalls.findMovieByTitle(API_KEY, $scope.movieTitle).then(function(res){
      $scope.displayMovie = res
      $scope.viewAddToList = true;
      console.log($scope.displayMovie)
      console.log($scope.displayMovie.imdbID)
      apiCalls.getRating($scope.displayMovie.imdbID).then(function(res){
        $scope.currentRating = parseFloat(res.data);
      });
    });
  }
  $scope.addMovie = function() {
    console.log($scope.displayMovie);
    apiCalls.addMovie($scope.displayMovie.Title, $scope.displayMovie.imdbID, $scope.currentRating, $routeParams.id).then(function(){
      $scope.movies = apiCalls.getMovies($routeParams.id);
    })
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
