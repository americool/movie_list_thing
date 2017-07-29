movieThing.factory('logOut', function(){
  return {
    clear: function() {
      this.email = null;
    }
  }
})

movieThing.factory('clearMovieSearch', function(){
  return {
    enter: function() {

      this.movieTitle = "";
    }
  }
})
