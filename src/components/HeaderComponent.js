import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import imagen from '../assets/logo.png';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
      isLogin: false,
      user: {},
    };
  }

  toggleNav = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  handleLogin = (event) => {
    event.preventDefault();
    this.toggleModal();
    const data = {
      user_nick: this.username.value,
      password: this.password.value,
    };
    axios.post(`${process.env.REACT_APP_API_END_POINT}/api/v1/users/login`, data).then((res) => {
      if (res.status === 202) {
        this.setState({
          isLogin: true,
          user: res.data.user,
        });
        const token = res.data.access;
        const user = res.data.user;
        localStorage.setItem("access", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        if (res.data.user.type_user) {
          // eslint-disable-next-line
          this.props.history.push({
            pathname: "/DashBoard",
          });
        }
      }
    });
  };

  render() {
    return (
      <div>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img src={imagen} height="30" width="41" alt="MovieApp" />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg"></span> Home
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem className="m-1">
                  {!this.state.isLogin ? (
                    <Button outline onClick={this.toggleModal}>
                      <span className="fa fa-sign-in fa-lg"></span> Login
                    </Button>
                  ) : (
                    <div>
                      <div className="navbar-text mr-3">
                        {this.state.user.user_nick}
                      </div>
                      <Button outline onClick={this.handleLogout}>
                        <span className="fa fa-sign-out fa-lg"></span> Logout
                      </Button>
                    </div>
                  )}
                </NavItem>
                <NavItem className="m-1">
                {!this.state.isLogin ? (
                  <Button
                    outline
                    role="link"
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/user/registro",
                      });
                    }}
                  >
                    <span className="fa fa-user fa-lg"></span> No tienes cuenta?
                  </Button>
                ) :(
                  null
                )}
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>MovieApp</h1>
                <p>Mira las mejores peliculas aqui :v!</p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={(input) => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={(input) => (this.password = input)}
                />
              </FormGroup>
              <Button type="submit" value="submit" color="danger">
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default withRouter(HeaderComponent);
