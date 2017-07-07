import React, {Component} from 'react';
import NavLink from './Navlink'
import axios from 'axios';
import './App.css';

class ShowLists extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      lists: [],
      title: "",
    }
    this.addList = this.addList.bind(this);
  }

  componentDidMount(){
    const id = this.props.userID
    this.setState({id})
    this.getLists(id);
  }

  handleChange(key) {
    return function (e) {
      let state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  getLists(id){
    axios.get('http://localhost:4000/users/' + id + '/show_lists').then((res) => {
      this.setState({lists: res.data.reverse()})
    })
  }

  addList(event){
    event.preventDefault()
    const {title, id} = this.state;
    axios.post('http://localhost:4000/lists/', {
      list: {
        title: title,
        user_id: id
      }
    }).then((res) => {
      this.setState({ title:"" });
      console.log(res);
      this.getLists(id);
    }).catch((error) => {
      alert('Comment Failed!');
      console.log(error);
    });
  }

  renderLists = () =>{
    const {lists} = this.state;
     return (
      lists.map((list) => (
        <div>
          <NavLink className={"listlink"} name={"/listview/"+list.id} text={list.title} />
        </div>
      ))
    )
  }

  render() {
    return (
      <div>
        <p> These are your lists:</p> <br/>
        {this.renderLists()}
        <div className={"addlist"}>
          <p> Add a List? </p>
          <form onSubmit={this.addList}>
            <label> Title:
            <input type="text" value={this.state.title} onChange={this.handleChange('title')} />
            </label><br/>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default ShowLists;
