import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class AddToLists extends Component {
  constructor() {
    super();
    this.state = {
      movieIdList: []
    }
  }

  addMoviesToLists() {
    const {Title, imdbID} = this.state.movieProps
    this.state.movieIdList.map((id) => (
      axios.post('http://localhost:4000/movies/', {
        list: {
          title: Title,
          user_id: id,
          imdbid: imdbID
        }
      }).then((res) => {
        console.log("worked!");
      }).catch((error) => {
        console.log("didn't work");
      })
    ))
  }
  getLists(id){
    axios.get('http://localhost:4000/users/' + id + '/show_lists').then((res) => {
      this.setState({lists: res.data.reverse()})
    })
  }

  renderLists = () =>{
    const {lists} = this.state;
     return (
      lists.map((list) => (
        <div>
          <p> {list.title} </p>
        </div>
      ))
    )
  }

  render(){
    return(
      <div className={"addtolists"}>
        <p> Add to Lists? </p>
      </div>
    )

  }
}

export default AddToLists
