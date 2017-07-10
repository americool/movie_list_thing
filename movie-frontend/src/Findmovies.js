import React, {Component} from 'react';
import {getLists} from './Helpers';
import AddToManyLists from './Addtomanylists';
import AddToList from './Addtolist';
import "react-number-picker/dist/style.css"
import axios from 'axios';

const API_KEY = process.env.IMDB_KEY

class FindMovies extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      displayOn: false,
      movieProps: null,
      rating: null,
      lists: [],
    }
    this.searchMovies = this.searchMovies.bind(this);
    this.addMovie = this.addMovie.bind(this);
  }

  searchMovies(event) {
    event.preventDefault();
    const title = this.convertString(this.state.title)
    let movieProps;
    axios.get('http://www.omdbapi.com/?apikey=' + API_KEY + '&t=' + title).then((res) => {
      if (res.data.Error)
        throw "Movie Not Found!"
      movieProps = res.data;
      console.log(res);
      return getLists(localStorage.getItem('userID'))
    }).catch((error) => {
      alert(error);
      console.log(error);
    }).then(lists =>
      this.setState({displayOn: true, title:"", movieProps: movieProps, lists: lists})
    );
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

  renderAddOptions() {
    if (this.props.addMany) {
      return <AddToManyLists lists={this.state.lists} />
    }
    return <AddToList movieProps={this.state.movieProps} listId={this.props.currentList} />
  }

  convertString(str) {
    const replaced = str.replace(/ /g, '+');
    return replaced;
  }

  updateRating() {
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

  displayMovie() {
    if (this.state.displayOn){
      const {Title, Released, Poster} = this.state.movieProps
      return (
        <div className={this.props.classNameResults}>
          <br/>
          <p> {Title} </p>
          <p> {Released} </p>
          <img src={Poster} />
          {this.renderAddOptions()}
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
      <div className={this.props.classNameForm}>
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
