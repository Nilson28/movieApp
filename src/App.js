import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter, BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';
import DashBoard from './components/AdminComponent';
import './App.css';
/* import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore'; */

//const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      //<Provider store={store}>
      <BrowserRouter>
        <Switch location={this.props.location}>
          <Route path='/home' component={Main} />
          <Route path='/DashBoard' component={DashBoard} />
          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
      //</Provider>
    );
  }
}

export default App;