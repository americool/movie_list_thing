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
      this.getRating(movieProps.imdbID)
      this.setState({displayOn: false})
      return getLists(localStorage.getItem('userID'))
    }).then((lists) => {
      this.setState({displayOn: true, title:"", movieProps: movieProps, lists: lists})
      if(this.props.onSearch)
        this.props.onSearch()
    }).catch((error) => {
      alert(error);
      console.log(error);
    });
  }

  getRating(imdbID) {
    axios.post('http://localhost:4000/movies/get_rating', {
      movie: {
        imdbid: imdbID
      }
    }).then((res)=> {
      console.log(res)
      const rating = res.data || 3
      console.log(rating)
      this.setState({rating:rating})
    })
  }
  renderAddOptions() {
    console.log(this.state.rating)
    if (this.props.addOne) {
      return <AddToList movieProps={this.state.movieProps} listId={this.props.currentList}
      onMovieAdded={this.props.onListUpdated}
      rating={this.state.rating}
      ratingStyle={'ratingaddtoone'} />
    }
    return <AddToManyLists movieProps={this.state.movieProps} lists={this.state.lists} rating={this.state.rating} />
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
    if ((this.state.displayOn && this.props.childDisplay) ||
    (this.state.displayOn && this.props.childDisplay === undefined)){
      const {Title, Released, Poster, imdbID} = this.state.movieProps
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
