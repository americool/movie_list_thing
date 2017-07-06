import React, {Component} from 'react';
import axios from 'axios';
import FindMovies from './Findmovies';
import './App.css';

const API_KEY = process.env.IMDB_KEY

class ListView extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      movies: [],
      displayOn: false,
      movieProps: null,
      movieId: null,
    }
    this.renderMovieDetails = this.renderMovieDetails.bind(this);
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

  renderMovies = () =>{
    const {movies} = this.state;
     return (
      movies.map((movie) => (
        <div>
        <button onClick={() => {this.renderMovieDetails(movie.imdbid)}}>
          {movie.title}</button><br/></div>
      ))
    )
  }

  renderMovieDetails(id) {
    axios.get('http://www.omdbapi.com/?apikey=' + API_KEY + '&i=' + id).then((res) => {
      this.setState({displayOn: true, movieProps: res.data})
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
          <p> {Plot}</p>
          <p> {Rated}</p>
        </div>
      )
    }
  }

  render(){
    const {id} = this.state;
    return(
      <div>
        <h2>Movie List Thing!</h2>
        {this.renderMovies()}
        <FindMovies id={id} refreshUpdate={this.getMovies(id)}/>
        {this.displayMovie()}
      </div>
    )
  }

}

export default ListView;
