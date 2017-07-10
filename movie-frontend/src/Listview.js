import React, {Component} from 'react';
import axios from 'axios';
import FindMovies from './Findmovies';
import AddToList from './Addtolist';
import './App.css';

const API_KEY = process.env.IMDB_KEY

class ListView extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      movies: [],
      displayOn: false,
      ratingDisplayOn: false,
      movieProps: null,
      movieId: null,
      rating: null,
      avgRating: null,
    }
    this.renderMovieDetails = this.renderMovieDetails.bind(this);
    this.renderChangeRating = this.renderChangeRating.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }

  handleChange(key) {
    return function (e) {
      let state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }


  componentDidMount(){
    const id = this.props.match.params.id
    this.setState({id})
    this.getMovies(id);
  }

  getMovies(id){
      axios.get('http://localhost:4000/lists/' + id + '/show_movies').then((res) => {
        this.setState({movies: res.data.reverse()})
      })
  }

  changeRating() {
    console.log(this.state)
    const {rating, movieId} = this.state;
    axios.patch('http://localhost:4000/movies/' + movieId, {
      movie: {
        rating: rating
      }
    }).then((res) => {
      alert("Changed!");
      this.setState({ratingDisplayOn: false, rating: "", movieId: null})
      this.getMovies()
    }).catch((error) => {
      alert(error)
    })
  }

  deleteMovie(id) {
    axios.delete('http://localhost:4000/movies/' + id).then((res) => {
      alert("Deleted!");
      this.getMovies()
    }).catch((error) => {
      alert(error)
    })
  }

  renderMovies = () =>{
    const {movies} = this.state;
     return (
      movies.map((movie) => (
        <div>
        <p onClick={() => {this.renderMovieDetails(movie.imdbid)}}>
          {movie.title} -- {movie.rating || "Not Yet Rated"}</p>
          <button onClick={() => {this.setState({ratingDisplayOn: true, displayOn: false, movieId: movie.id})}}>Change Rating?</button> <button onClick={() => {this.deleteMovie(movie.id)}}>Delete Movie?</button>
        </div>
      ))
    )
  }

  renderChangeRating(){
    if (this.state.ratingDisplayOn){
      return (
        <form className={"ratingchange"} onSubmit={this.changeRating}>
          <label> Rating?
          <input type="text" value={this.state.rating} onChange={this.handleChange('rating')} />
          </label><br/>
          <input type="submit" value="Submit" />
        </form>
      )
    }
  }

  renderMovieDetails(id) {
    axios.get('http://www.omdbapi.com/?apikey=' + API_KEY + '&i=' + id).then((res) => {
      this.setState({displayOn: true, movieProps: res.data, ratingDisplayOn: false})
      console.log(res);
      if (res.data.Error){
        alert("Movie Not Found!")
      }
    }).catch((error) => {
      console.log(error);
    });
  }


  render(){
    const {id} = this.state;
    return(
      <div>
        <h2>Movie List Thing!</h2>
        {this.renderMovies()}
        <FindMovies classNameForm={"findmoviesonlist"} classNameResults={"listmovieresults"} currentList={id}/>
        {this.renderChangeRating()}
      </div>
    )
  }

}

export default ListView;
