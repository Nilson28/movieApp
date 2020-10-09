import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default class TableGenComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [],
    };
  }

  handleClick = async(row) => {
    await axios.delete(`http://localhost:3333/api/v1/genero/${row.id}`)
      .then((res) => {
        if(res.status === 202){
          toast("El registro se elimino");
        }
      })
      this.componentDidMount()
  }

  async componentDidMount() {

    await axios.get('http://127.0.0.1:3333/api/v1/genero')
      .then((res) => {
        var op = [];
        op = res.data.map((genero) => {
          return {
            id: genero.id,
            name: genero.name,
            restriction: genero.restriction,
            created_at: genero.created_at,
            updated_at: genero.updated_at
          }
        });
        this.setState({
          data: op,
          columns: [
            {
              name: 'ID',
              omit: true
            },
            {
              name: 'Nombre',
              selector: 'name',
              sortable: true,
              editable: true
            },
            {
              name: 'Restricción',
              selector: 'restriction',
              sortable: true,
            },
            {
              name: 'created_at',
              selector: 'created_at',
              sortable: true,
            },
            {
              name: 'updated_at',
              selector: 'updated_at',
              sortable: true,
            },
            {
              name: 'Eliminar',
              cell: row => <span className="btn btn-danger" onClick={() => this.handleClick(row)}>Eliminar</span>,
              sortable: true,
              button: true,
              ignoreRowClick: true
            }
          ]
        })
      })
  }

  render() {
    return <div>
      <ToastContainer />
      <DataTable
        title="Generos"
        columns={this.state.columns}
        data={this.state.data}
        striped={true}
        responsive={true}
        highlightOnHover={true}
        theme="default"
      />
    </div>;
  }
}
