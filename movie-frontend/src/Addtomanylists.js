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
    }
  }

  render(){
    return(
      <div className={"addtolists"}>
        <p> Add to Lists? </p>
      <NumericInput value={this.state.rating} min={0} max={5} precision={1} step={0.5} />
      {/*show lists for adding this movie to lists*/}
        {this.props.lists.map(list => ShowList(
          Object.assign({}, list, {mode: 'AddMovies' })))
        }
      </div>
    )
  }
}

export default AddToManyLists;
