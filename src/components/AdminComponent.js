import React, { Component } from "react";
import { ListGroup, Tab, Col, Row } from "react-bootstrap";
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
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  CardSubtitle,
} from "reactstrap";

export default class AdminComponent extends Component {
  handleSubmit = (event) => {
    this.toggleModal();
    alert(
      "Username: " +
        this.username.value +
        " Password: " +
        this.password.value +
        " Remember: " +
        this.remember.checked
    );
    event.preventDefault();
  };

  render() {
    return (
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={3}>
            <ListGroup className="">
              <div className="d-flex justify-content-center mb-5 mt-3">
                <h4> MovieApp Dashboard </h4>
              </div>
              <ListGroup.Item className="text-center" action href="#link1">
                Generos
              </ListGroup.Item>
              <ListGroup.Item className="text-center" action href="#link2">
                Peliculas
              </ListGroup.Item>
              <ListGroup.Item className="text-center" action href="#link3">
                <span className="fa fa-sign-out fa-lg"> </span>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
                <div className="container mt-5">
                  <div className="row mt-5">
                    <div className="col-4 mt-5 offset-3">
                      <h3 className="text-center mb-5">Registar Genero</h3>
                      <Form
                        className="d-flex flex-column justify-content-center mt-3 b"
                        onSubmit={this.handleSubmit}
                      >
                        <FormGroup>
                          <Label htmlFor="generoName">Nombre del genero</Label>
                          <Input
                            type="text"
                            id="generoName"
                            name="generoName"
                            innerRef={(input) => (this.generoName = input)}
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
                          color="primary"
                        >
                          Crear
                        </Button>
                      </Form>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                <div className="bg-danger"></div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}
