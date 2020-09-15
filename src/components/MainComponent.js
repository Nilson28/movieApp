import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import PeliculaDetail from './PeliculaComponent';
import axios from 'axios';

//import Contact from './ContactComponent';
//import About from './AboutComponent';
//import Menu from './MenuComponent';
//import DishDetail from './DishdetailComponent';
//import Footer from './FooterComponent';
//import { connect } from 'react-redux';
//import { actions } from 'react-redux-form';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';
//import { fetchDishes, fetchComments, fetchPromos, postComment, fetchLeaders, postFeedback } from '../redux/ActionCreators';



/* const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
} */

/* const mapDispatchToProps = dispatch => ({

  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstname, lastname, telnum, email, agree, contatType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contatType, message)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => { dispatch(fetchComments()) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  fetchLeaders: () => { dispatch(fetchLeaders()) }
}); */



class MainComponent extends Component {

  constructor(props){
    super(props);

    this.state = {
      movies: []
    }
  }


  componentDidMount() {
    /* this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders(); */
    axios.get('http://localhost:3333/api/v1/pelicula')
    .then((response)=>{
      console.log(response.data)
      this.setState({
        movies: response.data
      });
    })
  }

  render() {

    /* const AboutPage = () => {
      return (
        <About leaders={this.props.leaders.leaders} leadersLoading={this.props.leaders.isLoading}
        leadersErrMess={this.props.leaders.errMess} />
      );
    } */

    const HomePage = () => {
      return (
        <Home
          /* dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess} */
          movies={this.state.movies}
        />
      );
    }

    const MovieWithId = ({ match }) => {
      console.log(match)
      return (
        <PeliculaDetail
          movie={this.state.movies.filter((movie) => movie.id === parseInt(match.params.id))[0]}
        />
      );
    };

/*     const DishWithId = ({ match }) => {
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          ErrMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment} />
      );
    }; */
    return (
      <div>
        <Header />
            <Switch location={this.props.location}>
              <Route path='/home' component={HomePage} />
              <Route path='/:id' component={MovieWithId} />
              <Redirect to="/home" />
            </Switch>
      </div>
    );
  }
}

export default withRouter(MainComponent);