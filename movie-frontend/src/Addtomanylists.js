import React, {Component} from 'react';
import axios from 'axios';
import NumericInput from 'react-numeric-input';
import {getRating} from './Helpers';
import './App.css';


class AddToManyLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating,
    }
    this.props.lists.forEach(list => this.state[list.id] = false);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.whichListsHaveMovie();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleRatingChange(rating){
    this.setState({rating: rating})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rating: 3,
    })
    this.props.lists.forEach(list => this.setState({ [list.id]: false }));
    this.whichListsHaveMovie(nextProps)
  }

  whichListsHaveMovie(props){
    props = props || this.props;
    return axios.post('http://localhost:4000/lists/get_lists_with_movie', {
        imdbid: props.movieProps.imdbID
      }).then((res) => {
        this.props.lists.forEach(list => this.setState({ [list.id]: false }));
        res.data.forEach(list => this.setState({ [list.id]: true  }));
      })
  }

  handleSubmit(event){
    const {Title, imdbID} = this.props.movieProps;
    let array = []
    Object.keys(this.state).forEach(key => {
      if (key !== 'rating' && this.state[key]){
        array.push(key)
      }
    })
    event.preventDefault();
    axios.post('http://localhost:4000/movies', {
      movie: {
        title: Title,
        rating: this.state.rating,
        imdbid: imdbID
      }
    }).then(() => {
      console.log(this.state.rating)
      axios.post('http://localhost:4000/movies/change_lists',{
        lists: array,
        imdbid: imdbID,
        rating: this.state.rating
        })
      }).then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
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
        <p> Rating </p>
      <NumericInput onChange={this.handleRatingChange} value={this.state.rating} min={0} max={5} precision={1} step={0.5} />
      {/*show lists for adding this movie to lists*/}
        {this.props.lists.map(list => <div>
          <input
            name={list.id}
            type="checkbox"
            checked={this.state[list.id]}
            onChange={this.handleInputChange}
          />
          {list.title}
        </div>
        )}
        <p> Add to Lists? </p>
        <button onClick={this.handleSubmit}> Submit! </button>
      </div>
    )
  }
}

export default AddToManyLists;
