import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard.js';
import UserSite from './components/UserSite.js';
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/usersite' component={UserSite}/>
      </Switch>
    );
  }
}

export default App;
