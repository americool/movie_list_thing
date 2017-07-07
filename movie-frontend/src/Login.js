import React, {Component} from 'react';
import NavLink from './Navlink';
import ShowLists from './Showlists';
import FindMovies from './Findmovies';
import './App.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      jwt: localStorage.getItem('jwt'),
      email: localStorage.getItem('email'),
      userID: localStorage.getItem('userID')
    }
    this.logOut = this.logOut.bind(this);

  }

  logOut(){
    this.setState({jwt: null, email: null, userID: null});
    localStorage.setItem('jwt', null);
    localStorage.setItem('email', null);
    localStorage.setItem('userID', null);
  }

  render(){
    const userNotLoggedIn = (
      <div>
        <NavLink className={"Signup-Link"} name={"/signup"} text={"Sign Up"} />
        <NavLink className={"Signin-Link"} name={"/signin"} text={"Sign In"} />
      </div>
      )

    const userLoggedIn = (
      <div>
        <p className={"Signup-Link"}> Hello, {this.state.email}! </p>
        <button className={"Signin-Link"} onClick={this.logOut} > Sign Out </button>
        <ShowLists userID={this.state.userID} />
        <FindMovies />
      </div>
    )
    return(
      <div>
        { this.state.email !== null ? userLoggedIn : userNotLoggedIn }
      </div>
    )
  }

}

export default Login;
