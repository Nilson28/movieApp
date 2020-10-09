import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default class RegisComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { value: "Masculino", label: "Masculino" },
        { value: "Femenino", label: "Femenino" },
      ],
      selectGen: ''
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: this.user_name.value,
      last_name: this.last_name.value,
      user_nick: this.user_nick.value,
      email: this.email.value,
      password: this.password.value,
      gender: this.state.selectGen,
      age: this.age.value,
    };
    axios.post(`http://127.0.0.1:3333/api/v1/users`, data).then((res) => {
      if (res.status === 202) {
        toast.success("Registro exitoso");
      }
    });
  };

  handleOnChange = (newValue) => {
    this.setState({
      selectGen: newValue.value,
    });
  };

  render() {
    return (
      <div className="container">
        <ToastContainer />
        <div className="row">
          <div className="col-12 col-sm-6 offset-3">
            <div className="card mt-5" style={{ height: 780 }}>
              <div className="card-header bg-danger text-white">
                <h3 className="text-center mt-2 mb-2">Registar usuario</h3>
              </div>
              <div className="card-body bg-white">
                <Form
                  className="d-flex flex-column justify-content-center mt-3 b"
                  onSubmit={this.handleSubmit}
                >
                  <FormGroup>
                    <Label htmlFor="user_name">Nombre</Label>
                    <Input
                      type="text"
                      id="user_name"
                      name="user_name"
                      innerRef={(input) => (this.user_name = input)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="last_name">Apellido</Label>
                    <Input
                      type="text"
                      id="last_name"
                      name="last_name"
                      innerRef={(input) => (this.last_name = input)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="user_nick">Nick</Label>
                    <Input
                      type="text"
                      id="user_nick"
                      name="user_nick"
                      innerRef={(input) => (this.user_nick = input)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      innerRef={(input) => (this.email = input)}
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
                  <FormGroup>
                    <Label htmlFor="user_nick">Genero</Label>
                    <Select
                      name="generos"
                      id="generos"
                      options={this.state.options}
                      onChange={this.handleOnChange}
                      placeholder="Genero"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="age">Edad</Label>
                    <Input
                      type="number"
                      id="age"
                      name="age"
                      innerRef={(input) => (this.age = input)}
                    />
                  </FormGroup>
                  <Button
                    style={{ width: "150px", alignSelf: "center" }}
                    type="submit"
                    value="submit"
                    color="danger"
                  >
                    Registrarse
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
