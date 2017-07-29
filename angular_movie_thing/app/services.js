// LogIN Auth
movieThing.service('loggedIn',['$http', function($http) {

  this.setUserInfo = function(jwt) {
    console.log(jwt)
    var req = {
      method: 'POST',
      url:'http://localhost:4000/users/get_user',
      data: {
          payload: jwt
        }
      }
      return $http(req).then(function(res) {
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('id', res.data.id);
     }).catch((err) => {
       alert(err);
     });
  }
}]);


//API STUFF

movieThing.service('apiCalls',['$resource','$http', function($resource, $http) {
    this.getListTitle = function(listID) {
      var list = $resource('http://localhost:4000/lists/:id');
        return list.get({id:listID}).$promise;
    }
    //get Lists for user
    this.getLists = function(user_id) {
      var lists = $resource('http://localhost:4000/users/:id/show_lists_details', { query: {method:'get', isArray:true}});
      return lists.query({id:user_id});
    }
    //get movies for List
    this.getMovies = function(list_id) {
      var movies = $resource('http://localhost:4000/lists/:id/show_movies', { query: {method:'get', isArray:true}});
      return movies.query({id:list_id}).$promise;
    }
    //imdb calls
    this.findMovieByTitle = function(api_key, title) {
      var movie = $resource('http://www.omdbapi.com/?apikey=:key&t=:title');
        return movie.get({key:api_key, title:title}).$promise
    }
    this.findMovieByImdb = function(api_key, imdb) {
      var movie = $resource('http://www.omdbapi.com/?apikey=:key&i=:id');
        return movie.get({key:api_key, id:imdb});
    }
    //adding/deleting lists
    this.addList = function(title, id){
      var list = $resource('http://localhost:4000/lists/');
      var body = {
        list: {
          title: title,
          user_id: id
        }
      }
      return list.save({}, body).$promise;
    }
    this.deleteList = function(list_id){
      var list = $resource('http://localhost:4000/lists/:id')
      return list.delete({id:list_id}).$promise;
    }
    //adding/deleting movies

    this.addMovie = function(title, imdbID, rating, listID){
      var movieToDB = $resource('http://localhost:4000/movies/');
      console.log(title);
      var dbBody = {
        movie: {
          title: title,
          rating: rating,
          imdbid: imdbID
        }
      }
      return movieToDB.save({}, dbBody).$promise.then(function(res){
        console.log(listID, res.id, rating);

        var req = {
          method: 'POST',
          url: 'http://localhost:4000/lists/add_movie_to_list',
          data: {
            list_id: listID,
            movie_id: res.id,
            rating: rating
          }
        }
        return $http(req)
      })
    }
    this.deleteMovie = function(listID, movieID){
      console.log(listID, movieID)
      var req = {
        method: 'POST',
        url: 'http://localhost:4000/lists/delete_movie',
        data: {
          list_id: listID,
          movie_id: movieID
        }
      }
      return $http(req);
    }
    //Get Rating --> using http due a bug I found described on stackoverflow that for some reason would return the data as an array individual characters
    this.getRating = function(imdbID){
      var req = {
        method: 'POST',
        url: 'http://localhost:4000/movies/get_rating',
        data: {
          movie: {
            imdbid: imdbID
          }
        }
      }

      return $http(req)
    }

    this.changeRating = function(rating, imdbID) {
      var req = {
        method: 'PATCH',
        url: 'http://localhost:4000/movies/'+ imdbID,
        data: {
          movie: {
            rating: rating
          }
        }
      }
      return $http(req)
    }

    //Sign in & Up Stuff w/ authentication

    this.signIn = function(email, password) {
      var req = {
        method: 'POST',
        url:'http://localhost:4000/user_token',
        data: {
          auth: {
            email: email,
            password: password,
          }
        }
      }
      return $http(req)
    }

    this.addUser = function(email, password, passwordConfirmation) {
      var req = {
        method: 'POST',
        url:'http://localhost:4000/users',
        data: {
          user: {
            email: email,
            password: password,
            password_confirmation: passwordConfirmation
          }
        }
      }
      return $http(req)
    }
}])
