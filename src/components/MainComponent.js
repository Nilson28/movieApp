import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Footer from './FooterComponent';
import PeliculaDetail from "./PeliculaComponent";
import Registro from "./RegisComponent";
import axios from "axios";

class MainComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_END_POINT}/api/v1/pelicula/`).then((response) => {
      //console.log(response.data)
      this.setState({
        movies: response.data,
        isLoading: false,
      });
    });
  }

  render() {
    const HomePage = () => {
      return (
        <div>
          <Home movies={this.state.movies} isLoading={this.state.isLoading} />
        </div>
      );
    };

    const MovieWithId = ({ match }) => {
      return (
        <PeliculaDetail
          movie={
            this.state.movies.filter(
              (movie) => movie.id === parseInt(match.params.id)
            )[0]
          }
        />
      );
    };
    return (
      <div>
        <Header />
        <Switch location={this.props.location}>
          <Route path="/user/home" component={HomePage} />
          <Route path="/user/registro" component={Registro} />
          <Route path="/user/:id" component={MovieWithId} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(MainComponent);
