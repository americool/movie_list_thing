// NON-API SERVICES
movieThing.service('loggedIn', function() {
    localStorage.setItem('email', 'aberanderson@gmail.com');
    localStorage.setItem('userID', 1);

    this.email = localStorage.getItem('email');
    this.userID = localStorage.getItem('userID');
    // this.email = null;
});


//API STUFF

movieThing.service('apiCalls',['$resource', function($resource) {
    //get Lists for user
    this.getLists = function(user_id) {
      var lists = $resource('http://localhost:4000/users/:id/show_lists_details', { query: {method:'get', isArray:true}});
      return lists.query({id:user_id});
    }
    //get movies for List
    this.getMovies = function(list_id) {
      var movies = $resource('http://localhost:4000/lists/:id/show_movies', { query: {method:'get', isArray:true}});
      return movies.query({id:list_id});
    }
    this.findMovieByTitle = function(api_key, title) {
      var movie = $resource('http://www.omdbapi.com/?apikey=:key&t=:title');
        return movie.get({key:api_key, title:title})
    }
    this.findMovieByImdb = function(api_key, imdb) {
      var movie = $resource('http://www.omdbapi.com/?apikey=:key&i=:id');
        return movie.get({key:api_key, id:imdb})
    }

}])
