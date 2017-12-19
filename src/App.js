import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard.js';
import UserSite from './components/UserSite.js';
import { Switch, Route } from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './store.js';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/usersite' component={UserSite}/>
      </Switch>
      </Provider>
    );
  }
}

export default App;
