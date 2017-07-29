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

movieThing.controller('signUpController',['$scope', 'apiCalls', 'loggedIn', function($scope, apiCalls, loggedIn){
  $scope.email ="";
  $scope.password="";
  $scope.passwordConfirmation="";
}])

movieThing.controller('signInController',['$scope', 'apiCalls', 'loggedIn', function($scope, apiCalls, loggedIn){
  $scope.email ="";
  $scope.password="";
  $scope.signIn = () => {
    apiCalls.signIn($scope.email, $scope.password).then(function(res){
      loggedIn.setUserInfo(res.data.jwt);
    });
  }
}])




movieThing.controller('viewlistController', ['$scope', '$routeParams', 'loggedIn','logOut','apiCalls','clearMovieSearch', function($scope, $routeParams, loggedIn, logOut, apiCalls, clearMovieSearch) {

//SCOPE n'at
  $scope.email = loggedIn.email
  $scope.userID = loggedIn.userID;
  $scope.listTitle = null;
  $scope.avgRating = "N/A";
  $scope.filters = [
    {name: '5-1', type:'rating', reverse: true},
    {name: '1-5', type:'rating', reverse: false},
    {name: 'Z-A', type:'title', reverse: true},
    {name: 'A-Z', type:'title', reverse: false},
    {name: 'None', type:null, reverse: false}
  ]
  $scope.order = null;
  $scope.reverse = false;
  $scope.viewAddToList = false;
  $scope.showRatingChange = false;
  $scope.savedMovieRating = null;
  $scope.savedMovieTitle = null;
  $scope.savedMovieId = null;


  //set factory reusable functions
  $scope.logOut = logOut.clear;
  $scope.clearMovieSearch = clearMovieSearch.enter

  $scope.$watch('email', function() {
        loggedIn.email = $scope.email;
  })

  $scope.changeFilter = (order, reverse) => {
    $scope.order = order;
    $scope.reverse = reverse;
  }
  $scope.getAvg = () => {
    if ($scope.movies.length === 0) {
      $scope.avgRating = "N/A"
    }
    else {
      let total = 0
      $scope.movies.forEach(function(movie) {
        total += parseFloat(movie.rating)
      })
      const avg = (total/$scope.movies.length).toFixed(2)
      $scope.avgRating = avg;
    }
  }

  apiCalls.getListTitle($routeParams.id).then(function(res){
    $scope.listTitle = res.title;
  })

  //API stuff
  apiCalls.getMovies($routeParams.id).then(function(res){
    $scope.movies = res;
    $scope.getAvg();
  });
  $scope.showSavedMovie = function(imdb) {
    $scope.viewAddToList = false;
    $scope.displayMovie = apiCalls.findMovieByImdb(API_KEY, imdb);
  }
  $scope.searchMovieTitle = function() {
      $scope.viewAddToList = false;
    apiCalls.findMovieByTitle(API_KEY, $scope.movieTitle).then(function(res){
      if (res.Error) {
        alert('Cannot Find!')
      }
      else {
        $scope.displayMovie = res
        $scope.viewAddToList = true;
        console.log($scope.displayMovie)
        console.log($scope.displayMovie.imdbID)
        apiCalls.getRating($scope.displayMovie.imdbID).then(function(res){
          $scope.showRatingChange = false;
          $scope.currentRating = parseFloat(res.data);
        });
      }
    });
  }
  $scope.addMovie = function() {
    console.log($scope.displayMovie);
    apiCalls.addMovie($scope.displayMovie.Title, $scope.displayMovie.imdbID, $scope.currentRating, $routeParams.id).then(function(){
      apiCalls.getMovies($routeParams.id).then(function(res){
        $scope.movies = res;
        $scope.getAvg();
      });
    })
  }
  $scope.deleteMovie = (movieID) => {
    apiCalls.deleteMovie($routeParams.id, movieID).then(function(){
      apiCalls.getMovies($routeParams.id).then(function(res){
        $scope.movies = res;
        $scope.getAvg();
      });
    })
  }
  $scope.openRatingChange = (movieID, movieTitle, movieRating) => {
    $scope.showRatingChange = true;
    $scope.savedMovieRating = parseFloat(movieRating);
    $scope.savedMovieTitle = movieTitle;
    $scope.savedMovieId = movieID
  }
  $scope.changeRating  = (rating, movieID) => {
    apiCalls.changeRating(rating, movieID).then(function(){
      apiCalls.getMovies($routeParams.id).then(function(res){
        $scope.movies = res;
        $scope.getAvg();
      });
      $scope.showRatingChange = false;
    });
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
