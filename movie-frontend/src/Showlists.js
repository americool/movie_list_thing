import React, {Component} from 'react';
import NavLink from './Navlink'
import axios from 'axios';
import { getListDetails } from './Helpers';
import './App.css';

class ShowLists extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      lists: [],
      title: "",
    }
    this.deleteList = this.deleteList.bind(this)
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
    getListDetails(id).then(lists => this.setState({lists}))
    // getListDetails(id).then(listDetails => this.setState({listDetails}))
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
      alert('List Failed to Add!');
      console.log(error);
    });
  }

  renderLists = () => this.state.lists.map(
    list => <div>
      <NavLink className={"listlink"}
      name={"/listview/"+list[0].id}
      text={list[0].title} />
      <p> Total Movies: {list[1]} || Average Rating: {list[2]} </p>
      <button onClick={() => {this.deleteList(list[0].id)}}> Delete? </button>
    </div>
  );

  deleteList(list_id) {
    axios.delete('http://localhost:4000/lists/' + list_id).then((res) => {
        console.log(res);
        this.getLists(this.state.id)
    })
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
