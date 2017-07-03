import React from 'react';
import {HashRouter,
  Route, Switch
} from 'react-router-dom';
import Main from './Main';
import SignUp from './Signup';
import SignIn from './Signin';
import ListView from './Listview';

const RouterConfig = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Main}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/listview" component={ListView}/>
    </Switch>
  </HashRouter>
);

export default RouterConfig;
