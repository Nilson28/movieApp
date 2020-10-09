import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default class TablePeliComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [],
    };
  }

  handleClick = async (row) => {
      console.log(row)
    // await axios
    //   .delete(`${process.env.REACT_APP_API_END_POINT}/api/v1/pelicula/${row.id}`)
    //   .then((res) => {
    //     if (res.status === 202) {
    //       toast.success("El registro se elimino");
    //     }
    //   });
    // this.componentDidMount();
  };

  async componentDidMount() {
    await axios.get("http://127.0.0.1:3333/api/v1/pelicula").then((res) => {
      var op = [];
      op = res.data.map((pelicula) => {
          console.log(pelicula.duration)
        return {
          id: pelicula.id,
        //   name: pelicula.name,
        //   generos: pelicula.generos,
        //   image: pelicula.image,
        //   video: pelicula.video,
          duration: pelicula.duration,
          created_at: pelicula.created_at,
          updated_at: pelicula.updated_at
        };
      });
      this.setState({
        data: op,
        columns: [
          {
            name: "ID",
            selector: "ID",
            omit: true
          },
        //   {
        //     name: "Nombre",
        //     selector: "Nombre",
        //     sortable: true,
        //   },
        //   {
        //     name: "Imagen",
        //     selector: "Imagen",
        //     sortable: true,
        //   },
        //   {
        //     name: "Video",
        //     selector: "Video",
        //     sortable: true,
        //   },
          {
            name: "Duration",
            selector: "Duration",
            sortable: true,
          },
        //   {
        //     name: "Description",
        //     selector: "Description",
        //     sortable: true,
        //   },
          {
            name: "created_at",
            selector: "created_at",
            sortable: true,
          },
          {
            name: "updated_at",
            selector: "updated_at",
            sortable: true,
          },
          {
            name: "Eliminar",
            cell: (row) => (
              <span
                className="btn btn-danger"
                onClick={() => this.handleClick(row)}
              >
                Eliminar
              </span>
            ),
            sortable: true,
            button: true,
            ignoreRowClick: true,
          },
        ],
      });
    });
  }
  render() {
    return (
      <div>
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
      </div>
    );
  }
}
