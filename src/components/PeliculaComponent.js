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
} from "reactstrap";

export default function PeliculaComponent() {
  const { id: movie_id } = useParams();
  const user_id = JSON.parse(localStorage.getItem('user')).user_id
  const [loaders, setLoaders] = useState({
    initialLoader: true,
    commentLoader: false
  });
  const addComment = () => {
    setLoaders((pre) => ({ ...pre, commentLoader: true }));
    console.log("user_id: ",user_id)
    fetch(`http://localhost:3333/api/v1/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id,
            pelicula_id: movie_id,
            comment: "El comentario mi socio"
        })
    })
    .then((response) => response.json())
    .then((data) => {
        setMovie((pre) => ({...pre, comments: [...pre.comments, data]}));
        setLoaders((pre) => ({ ...pre, commentLoader: false }));
    })
  }
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    console.log("GOLA");
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

//   if (!movie) {
//     return <h1>Cargando mimada</h1>;
//   }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-3">
          <Card>
            <CardImg height="100%" src={movie.image} alt={movie.name} />
          </Card>
        </div>
        <div className="col-12 col-sm-9 p-5">
          <h3 style={{ color: "#715696" }}>
            Nombre:<i style={{ color: "black" }}>{movie.name}</i>
          </h3>
          <hr />
          <p style={{ color: "#715696" }}>{movie.duration}</p>
          <hr />
          <p style={{ color: "#715696" }}>{movie.description}</p>
          <hr />
          {movie.generos.map((genero, key) => {
            return (
              <div key={key}>
                <i>{genero.name}</i>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12 col-sm-8 offset-2"></div>
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
                <i>user: {comment.user_id}</i>
                <p>{comment.comment}</p>
                <i>fecha: {comment.created_at}</i>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={addComment}> hola </button>
      {loaders.commentLoader && <p>Creando comentario</p>}
    </div>
  );
}
