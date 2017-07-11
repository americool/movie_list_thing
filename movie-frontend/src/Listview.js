import React, {Component} from 'react';
import axios from 'axios';
import FindMovies from './Findmovies';
import NumericInput from 'react-numeric-input';
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
      childDisplay: true,
      movieTitle: ""
    }
    this.renderMovieDetails = this.renderMovieDetails.bind(this);
    this.renderChangeRating = this.renderChangeRating.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }

  handleRatingChange(rating){
    this.setState({rating: rating})
  }

  handleChange(key) {
    return function (e) {
      let state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  getAvg() {
    if (this.state.movies.length === 0) {
      this.setState({avgRating: "N/A"})
    }
    else {
      let total = 0
      this.state.movies.forEach(function(movie) {
        console.log(movie.rating)
        total += parseFloat(movie.rating)
      })
      console.log(total)
      const avg = total/this.state.movies.length
      this.setState({avgRating: avg})
    }
  }

  componentDidMount(){
    console.log(this.props)
    const id = this.props.match.params.id
    this.setState({id})
    this.getMovies(id);
  }

  getMovies(id){
      return axios.get('http://localhost:4000/lists/' + id + '/show_movies').then((res) => {
        this.setState({movies: res.data.reverse()})
        this.getAvg()
        }
      )
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

  deleteMovie(movie_id) {
    axios.post('http://localhost:4000/lists/delete_movie', {
      list_id: this.state.id,
      movie_id: movie_id
    }).then((res) => {
      alert("Deleted!");
      this.getMovies(this.state.id)
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
          <button onClick={() => {this.setState({ratingDisplayOn: true, displayOn: false, childDisplay:false, movieId: movie.id, rating: movie.rating, movieTitle: movie.title})}}>Change Rating?</button> <button onClick={() => {this.deleteMovie(movie.id)}}>Delete Movie?</button>
        </div>
      ))
    )
  }



  renderChangeRating(){
    if (this.state.ratingDisplayOn){
      return (
        <div className={"ratingchange"}>
          <p>Change Rating for {this.state.movieTitle}?</p>
          <NumericInput onChange={this.handleRatingChange} value={this.state.rating} min={1} max={5} precision={1} step={0.5} />
          <button onClick={() => {this.changeRating()}}> Change! </button>
        </div>
      )
    }
  }

  renderMovieDetails(id) {
    this.setState({displayOn:false, childDisplay:false});
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

  displayMovie() {
    if (this.state.displayOn){
      const {Title, Released, Poster, Rated, Plot} = this.state.movieProps
      return (
        <div className={"moviedetails"}>
          <br/>
          <p> {Title} </p>
          <p> {Released} </p>
          <img src={Poster} />
          <p className={"plot"}>{Plot}</p>
          <p> {Rated}</p>
        </div>
      )
    }
  }

  sortBy(value, reverse) {
    function compare(a,b) {
      if (a[value] < b[value])
        return -1;
        console.log(a.value)
      if (a[value] > b[value])
        return 1;
    return 0;
    }
    const newList = this.state.movies.sort(compare)
    if (reverse)
      newList.reverse()
    this.setState({movies: newList})
    this.renderMovies()
  }

  toggleDisplay(){
    this.setState({displayOn: false, childDisplay: true})
  }

  filterButtons(){
    return(
      <div className="filterbuttons">
        <button onClick={() => {this.sortBy("rating", false)}}>Rating Sort (ASC)?</button>
        <button onClick={() => {this.sortBy("title", false)}}>Title Sort? (ASC)</button>
        <button onClick={() => {this.sortBy("rating", true)}}>Rating Sort (DSC)?</button>
        <button onClick={() => {this.sortBy("title", true)}}>Title Sort? (DSC)</button>
      </div>
    )
  }
  render(){
    const {id} = this.state;
    return(
      <div>
        <h2>Movie List Thing!       -- Average Rating: {this.state.avgRating}</h2>
        <p> Click on a Title to See Movie Details! </p>
        {this.renderMovies()}
        <FindMovies classNameForm={"findmoviesonlist"} classNameResults={"listmovieresults"}
        addOne={true} currentList={id}
        onListUpdated={this.getMovies.bind(this, id)}
        onSearch={this.toggleDisplay.bind(this)}
        childDisplay={this.state.childDisplay}
        />
        {this.displayMovie()}
        {this.renderChangeRating()}
        {this.filterButtons()}

      </div>
    )
  }

}

export default ListView;
