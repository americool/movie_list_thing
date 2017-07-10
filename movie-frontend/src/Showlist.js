import React, {Component} from 'react';
import NavLink from './Navlink'
import axios from 'axios';
import './App.css';

export default function(props) {
  switch (props.mode) {
    case 'NavLink':
      return(
        <div>
          <NavLink className={"listlink"}
          name={"/listview/"+props.id}
          text={props.title} />
        </div>
      )
    case 'AddMovies':
      return(
        <div>
          <input type="checkbox" checked={props.checked}/> {props.title}
        </div>
    )
  }

}
