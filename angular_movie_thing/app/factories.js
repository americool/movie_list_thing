movieThing.factory('logOut', function(){
  return {
    clear: function() {
      this.email = null;
      this.userID = null;
      localStorage.removeItem('email');
      localStorage.removeItem('id');
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
