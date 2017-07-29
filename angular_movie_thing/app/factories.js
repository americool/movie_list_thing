movieThing.factory('logOut', function(){
  return {
    clear: function() {
      this.email = null;
      this.userID = null;
      localStorage.removeItem('email');
      localStorage.removeItem('userID');
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
