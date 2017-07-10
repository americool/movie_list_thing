import React, {Component} from 'react';
import axios from 'axios';
import ShowList from './Showlist';
import NumericInput from 'react-numeric-input';
import './App.css';


class AddToManyLists extends Component {
  constructor() {
    super();
    this.state = {
      rating: 3,
      clickedMovies: null,

    }
  }

  componentDidMount() {
    this.whichListsHaveMovie()

  }
  whichListsHaveMovie(){
    return axios.post('http://localhost:4000/lists/get_lists_with_movie', {
        imdbid: this.props.movieProps.imdbID
      }).then((res) => {
        let memberlists = {};
        res.data.forEach(list => memberlists[list.id] = list)
        this.setState({clickedMovies: memberlists});
        console.log(this.state.clickedMovies);
      })
  }
  // call create movie (incase does not exist)
  // which lists have movie associations
  // appropraitely populate checkboxes based on associations
  // count which checkboxes are clicked vs not clicked and make to api patch calls to add and remove associations
  //update rating
  render(){
    return(
      <div className={"addtolists"}>
        <p> Add to Lists? </p>
      <NumericInput value={this.state.rating} min={0} max={5} precision={1} step={0.5} />
      {/*show lists for adding this movie to lists*/}
        {this.props.lists.map(list => ShowList(
          Object.assign({}, list, {mode: 'AddMovies', checked: this.state.clickedMovies && list.id in this.state.clickedMovies })))
        }
        <button> Submit! </button>
      </div>
    )
  }
}

export default AddToManyLists;
