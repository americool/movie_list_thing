import React from 'react';
import {HashRouter,
  Route, Switch
} from 'react-router-dom';
import Main from './Main';
import SignUp from './Signup';
import SignIn from './Signin';
import FindMovies from './Findmovies';
import ListView from './Listview';

const RouterConfig = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Main}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/findmovies" component={FindMovies} />
      <Route path="/listview/:id" component={ListView}/>
    </Switch>
  </HashRouter>
);

export default RouterConfig;
