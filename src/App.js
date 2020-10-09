import React from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import {createBrowserHistory} from 'history';
import Main from "./components/MainComponent";
import DashBoard from "./components/AdminComponent";
import "./App.css";
/* import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore'; */

//const store = ConfigureStore();
const history = createBrowserHistory();

function App(props) {
  return (
    //<Provider store={store}>
    <BrowserRouter history={history}>
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
