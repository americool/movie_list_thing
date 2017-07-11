import axios from 'axios';

export function handleChange(key) {
  return function (e) {
    let state = {};
    state[key] = e.target.value;
    this.setState(state);
  }.bind(this);
}

export function getLists(id){
  return axios.get('http://localhost:4000/users/' + id + '/show_lists').then(res => res.data.reverse())
}

// export function getListDetails(id){
//   return axios.get('http://localhost:4000/users/' + id + '/show_list_details').then(res => res.data.reverse())
// }
