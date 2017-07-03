import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './Login';
import './App.css';

class Main extends Component {

  render() {
    return (
      <div >
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Movie List Thing!</h2>
        </div>
        <Login />
      </div>
    );
  }
}

export default Main;
