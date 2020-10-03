import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  CardSubtitle,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";

export default function PeliculaComponent() {
  const { id: movie_id } = useParams();
  const user_id = JSON.parse(localStorage.getItem("user")).user_id;

  const [loaders, setLoaders] = useState({
    initialLoader: true,
    commentLoader: false,
  });

  const [comment, setComment] = useState("");

  const onChange1 = (event) => {
    setComment(event.target.value);
  };

  const addComment = async (e) => {
    e.preventDefault();
    setLoaders((pre) => ({ ...pre, commentLoader: true }));
    try {
      const token = JSON.parse(localStorage.getItem("access")).token;
      const commentDone = await fetch(`http://localhost:3333/api/v1/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id,
          pelicula_id: movie_id,
          comment: comment,
        }),
      }).then((response) => {
        if (!response.ok) {
          throw Error("Something goes wrong");
        }
        return response.json();
      });
      console.log("Comentario: ", commentDone)
      setMovie((pre) => ({ ...pre, comments: [...pre.comments, commentDone] }));
    } catch (error) {
      console.log("Error: ", error);
    }
    setLoaders((pre) => ({ ...pre, commentLoader: false }));
  };

  const [movie, setMovie] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3333/api/v1/pelicula/${movie_id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setLoaders((pre) => ({ ...pre, initialLoader: false }));
      });
  }, []);

  if (loaders.initialLoader) {
    return <h1>Cargando mimada</h1>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-3 mr-1 mt-5">
          <Card>
            <CardImg height="100%" src={movie.image} alt={movie.name} />
          </Card>
        </div>
        <div className="col-12 col-sm-8 p-5 d">
          <h3 style={{ color: "#715696" }}>Nombre: </h3>
          <p style={{ color: "black" }}>{movie.name}</p>
          <hr />
          <h4 style={{ color: "#715696" }}>Duración:</h4>
          <p style={{ color: "black" }}>{movie.duration}</p>
          <hr />
          <h4 style={{ color: "#715696" }}>Descripción: </h4>
          <p style={{ color: "black" }}>{movie.description}</p>
          <hr />
          {movie.generos.map((genero, key) => {
            return (
              <div key={key}>
                <h4 style={{ color: "#715696" }}>Generos: </h4>{" "}
                <p>{genero.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12 col-sm-8 offset-2">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src={movie.video}
            ></iframe>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12">
          <h3>Comentarios de los usuarios</h3>
          <hr />
        </div>
        <div className="col-12 col-sm-6">
          {movie.comments.map((comment, key) => {
            return (
              <div key={key}>
                <i>Usuario: {comment.users.user_nick}</i>
                <p>{comment.comment}</p>
                <i>Fecha: {comment.created_at}</i>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
      <form onSubmit={addComment}>
        <div className="row">
          <div className="col-12">
            <input
              type="text"
              onChange={onChange1}
              name="comment"
              value={comment}
              placeholder="Commentario"
            />
          </div>
        </div>
        <button type="submit" value="submit" color="primary">
          Comentar
        </button>
      </form>
      {loaders.commentLoader && <p>Enviando comentario</p>}
    </div>
  );
}
