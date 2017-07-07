import React, {Component} from 'react';
import axios from 'axios';

const API_KEY = process.env.IMDB_KEY

class FindMovies extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      displayOn: false,
      movieProps: null,
      rating: "",
    }
    this.searchMovies = this.searchMovies.bind(this);
    this.addMovie = this.addMovie.bind(this);
  }

  searchMovies() {
    const title = this.convertString(this.state.title)
    axios.get('http://www.omdbapi.com/?apikey=' + API_KEY + '&t=' + title).then((res) => {
      if (res.data.Error){
        alert("Movie Not Found!")
      }
      else{
        this.setState({displayOn: true, title:"", movieProps: res.data})
        console.log(res);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  addMovie(event) {
    event.preventDefault()
    const {Title, imdbID} = this.state.movieProps
    axios.post('http://localhost:4000/movies/', {
      movie: {
        title: Title,
        list_id: this.props.id,
        rating: this.state.rating,
        imdbid: imdbID
      }
    }).then((res) => {
      alert("Added!");
      this.setState({displayOn: false, title:"", movieProps: null})
      this.props.refreshUpdate
    }).catch((error) => {
      alert(error)
    })
  }



  convertString(str) {
    const replaced = str.replace(/ /g, '+');
    return replaced;
  }
  displayMovie() {
    if (this.state.displayOn){
      const {Title, Released, Poster} = this.state.movieProps
      return (
        <div className={"movieresults"}>
          <br/>
          <p> {Title} </p>
          <p> {Released} </p>
          <img src={Poster} />
          <p> Add to List? </p>
          <form onSubmit={this.addMovie}>
            <label> Rating?
            <input type="text" value={this.state.rating} onChange={this.handleChange('rating')} />
            </label><br/>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    }

  }

  handleChange(key) {
    return function (e) {
      let state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  render(){
    return (
      <div className={"moviesearch"}>
        <br/><br/><br/>
        <p> Search for a Movie? </p>
        <form onSubmit={this.searchMovies}>
          <label> By Title:
          <input type="text" value={this.state.title} onChange={this.handleChange('title')} />
          </label><br/>
          <input type="submit" value="Submit" />
        </form>
        {this.displayMovie()}
      </div>
    )
  }
}

export default FindMovies;
