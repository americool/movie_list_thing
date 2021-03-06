import React, {Component} from 'react';
import axios from 'axios';
import NumericInput from 'react-numeric-input';
import { Redirect } from 'react-router'
import './App.css';


class AddToManyLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      redirect: false
    }
    this.props.lists.forEach(list => this.state[list.id] = false);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.whichListsHaveMovie();
  }

  componentDidMount() {
    this.setState({rating:this.props.rating})
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
        alert("Done!")
        if (this.props.displayOff)
          this.props.displayOff()
        this.setState({redirect: true})
      }).catch((error) => {
        console.log(error)
      })
  }

  render(){
    if (this.state.redirect){
      return <Redirect to='/findmovies'/>;
    }
    return(
      <div className={"addtolists"}>
        <p> Rating </p>
      <NumericInput onChange={this.handleRatingChange} value={this.state.rating} min={0} max={5} precision={1} step={0.5} />
      <p> Add to Lists? </p>
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

        <button onClick={this.handleSubmit}> Submit! </button>
      </div>
    )
  }
}

export default AddToManyLists;
