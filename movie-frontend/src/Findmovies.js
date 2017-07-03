import React, {Component} from 'react';
import AddToLists from './Addtolists';
import axios from 'axios';

const API_KEY = process.env.IMDB_KEY

class FindMovies extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      displayOn: false,
      movieTitle: null,
      movieProps: null,
    }
    this.searchMovies = this.searchMovies.bind(this);
  }

  searchMovies() {
    const title = this.convertString(this.state.title)
    axios.get('http://www.omdbapi.com/?apikey=' + API_KEY + '&t=' + title).then((res) => {
      this.setState({displayOn: true, title:"", movieProps: res.data})
      console.log(res);
      if (res.data.Error){
        alert("Movie Not Found!")
      }
    }).catch((error) => {
      console.log(error);
    });
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
