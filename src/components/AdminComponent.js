import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TableGen from "./TableGenComponent";
import TablePel from "./TablePeliComponent";
import Select from "react-select";
import { ListGroup, Tab, Col, Row } from "react-bootstrap";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

class AdminComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsG: [],
      selectGen: [],
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_END_POINT}/api/v1/genero/`).then((res) => {
      var op = [];
      op = res.data.map((genero) => {
        return { value: genero.id, label: genero.name };
      });
      this.setState({
        optionsG: op,
      });
    });
  }

  handleOnChange2 = (newValue) => {
    var op = [];
    if(newValue !== null){
      op = newValue.map((value) => {
        return value.value;
      });
    }
    this.setState({
      selectGen: op,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: this.generoName.value,
      restriction: this.clasific.value,
    };
    axios.post(`${process.env.REACT_APP_API_END_POINT}/api/v1/genero/`, data).then((res) => {
      if (res.status === 202) {
        toast("Registro exitoso");
      }
    });
  };
  handleSubmit2 = (event) => {
    event.preventDefault();
    const data = {
      name: this.peliculaName.value,
      generos: this.state.selectGen,
      image: this.imagen.value,
      video: this.video.value,
      duration: this.duration.value,
      description: this.description.value,
    };
    axios.post(`${process.env.REACT_APP_API_END_POINT}/api/v1/pelicula/`, data).then((res) => {
      if (res.status === 202) {
        toast("Registro exitoso");
      }
    });
  };

  render() {
    return (
      <div>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={3}>
              <ListGroup className="">
                <div className="d-flex justify-content-center mb-5 mt-3">
                  <h4> MovieApp Dashboard </h4>
                </div>
                <ListGroup.Item
                  className="text-center bg-danger text-white"
                  action
                  href="#link1"
                >
                  Crear Generos
                </ListGroup.Item>
                <ListGroup.Item
                  className="text-center bg-danger text-white"
                  action
                  href="#link2"
                >
                  Crear Peliculas
                </ListGroup.Item>
                <ListGroup.Item
                  className="text-center bg-danger text-white"
                  action
                  href="#link3"
                >
                  Consultar Generos
                </ListGroup.Item>
                <ListGroup.Item
                  className="text-center bg-danger text-white"
                  action
                  href="#link6"
                >
                  <a href="/user/home">
                    {" "}
                    <span className="fa fa-sign-out fa-lg"> </span>
                  </a>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="#link1">
                  <ToastContainer />
                  <div className="container mt-5">
                    <div className="row mt-5">
                      <div className="col-4 mt-5 offset-3">
                        <div className="card" style={{ height: 380 }}>
                          <div className="card-header bg-danger text-white">
                            <h3 className="text-center mb-5">
                              Registar Genero
                            </h3>
                          </div>
                          <div className="card-body bg-white">
                            <Form
                              className="d-flex flex-column justify-content-center mt-3 b"
                              onSubmit={this.handleSubmit}
                            >
                              <FormGroup>
                                <Label htmlFor="generoName">
                                  Nombre del genero
                                </Label>
                                <Input
                                  type="text"
                                  id="generoName"
                                  name="generoName"
                                  innerRef={(input) =>
                                    (this.generoName = input)
                                  }
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label htmlFor="clasific">Clasificación</Label>
                                <Input
                                  type="text"
                                  id="clasific"
                                  name="clasific"
                                  innerRef={(input) => (this.clasific = input)}
                                />
                              </FormGroup>
                              <Button
                                style={{ width: "100px", alignSelf: "center" }}
                                type="submit"
                                value="submit"
                                color="danger"
                              >
                                Crear
                              </Button>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">
                  <ToastContainer />
                  <div className="container mt-5">
                    <div className="row mt-5">
                      <div className="col-4 mt-5 offset-3">
                        <div className="card" style={{ height: 750 }}>
                          <div className="card-header bg-danger text-white">
                            <h3 className="text-center mb-5">
                              Registar pelicula
                            </h3>
                          </div>
                          <div className="card-body bg-white">
                            <Form
                              className="d-flex flex-column justify-content-center mt-3 b"
                              onSubmit={this.handleSubmit2}
                            >
                              <FormGroup>
                                <Label htmlFor="peliculaName">
                                  Nombre de la pelicula
                                </Label>
                                <Input
                                  type="text"
                                  id="peliculaName"
                                  name="peliculaName"
                                  innerRef={(input) =>
                                    (this.peliculaName = input)
                                  }
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label for="generos">Generos</Label>
                                <Select
                                  name="generos"
                                  id="generos"
                                  onChange={this.handleOnChange2}
                                  options={this.state.optionsG}
                                  placeholder="Selecciona los generos"
                                  isMulti
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label htmlFor="imagen">
                                  Proporcionar imagen de la pelicula
                                </Label>
                                <Input
                                  type="text"
                                  id="imagen"
                                  name="imagen"
                                  innerRef={(input) => (this.imagen = input)}
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label htmlFor="video">
                                  Proporcionar video de la pelicula
                                </Label>
                                <Input
                                  type="text"
                                  id="video"
                                  name="video"
                                  innerRef={(input) => (this.video = input)}
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label htmlFor="duration">Duración</Label>
                                <Input
                                  type="text"
                                  id="duration"
                                  name="duration"
                                  innerRef={(input) => (this.duration = input)}
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label htmlFor="description">Descripción</Label>
                                <Input
                                  type="textarea"
                                  id="description"
                                  name="description"
                                  innerRef={(input) =>
                                    (this.description = input)
                                  }
                                />
                              </FormGroup>
                              <Button
                                style={{ width: "100px", alignSelf: "center" }}
                                type="submit"
                                value="submit"
                                color="danger"
                              >
                                Crear
                              </Button>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="#link3">
                  <div className="container m-3">
                    <TableGen />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="#link4">
                  <div className="container m-3">
                    <TablePel />
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default withRouter(AdminComponent);
