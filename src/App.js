import React from "react";
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  BrowserRouter,
} from "react-router-dom";
import Main from "./components/MainComponent";
import DashBoard from "./components/AdminComponent";
import "./App.css";
/* import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore'; */

//const store = ConfigureStore();

function App(props) {
  localStorage.setItem('user', JSON.stringify({user_id: 'Rubunu'}))
  return (
    //<Provider store={store}>
    <BrowserRouter>
      <Switch location={props.location}>
        <Route path="/user" component={Main} />
        <Route path="/DashBoard" component={DashBoard} />
        <Redirect to="/user/home" />
      </Switch>
    </BrowserRouter>
    //</Provider>
  );
}

export default App;
