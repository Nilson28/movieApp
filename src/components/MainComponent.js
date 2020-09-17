import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import PeliculaDetail from './PeliculaComponent';
import axios from 'axios';

class MainComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3333/api/v1/pelicula')
      .then((response) => {
        //console.log(response.data)
        this.setState({
          movies: response.data
        });
      })
  }

  render() {

    const HomePage = () => {
      return (
        <div>
          <Home
            movies={this.state.movies}
          />
        </div>
      );
    }

    const MovieWithId = ({ match }) => {
      return (
        <PeliculaDetail
          movie={this.state.movies.filter((movie) => movie.id === parseInt(match.params.id))[0]}
        />
      );
    };
    return (
      <div>
        <Header />
        <Switch location={this.props.location}>
          <Route path='/home' component={HomePage} />
          <Route path='/home/:id' component={MovieWithId} />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(MainComponent);