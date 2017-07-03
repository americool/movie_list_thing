import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class ListView extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      movies: [],
    }
  }

  componentDidMount(){
    console.log(this.props.match)
    const id = this.props.match.params.id
    this.setState({id})
    this.getMovies(id);
  }

  getMovies(id){
      axios.get('http://localhost:4000/lists/' + id + '/show_movies').then((res) => {
        this.setState({movies: res.data.reverse()})
      })
  }

  renderLists = () =>{
    const {movies} = this.state;
     return (
      movies.map((movie) => (
        <div>
          <p> {movie.title} </p>
        </div>
      ))
    )
  }

  render(){
    return(
      <div>
        <h2>Movie List Thing!</h2>
      </div>
    )
  }

}

export default ListView;
