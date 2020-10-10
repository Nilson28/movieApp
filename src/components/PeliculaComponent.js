import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardImg } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./LoadigComponent";

export default function PeliculaComponent() {
  const { id: movie_id } = useParams();

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
      const user_id = JSON.parse(localStorage.getItem("user")).id;
      const token = JSON.parse(localStorage.getItem("access")).token;
      const commentDone = await fetch(`${process.env.REACT_APP_API_END_POINT}/api/v1/comment`, {
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
      console.log("Comentario: ", commentDone);
      setMovie((pre) => ({ ...pre, comments: [...pre.comments, commentDone] }));
    } catch (error) {
      toast.error("Debes iniciar sesion primero");
    }
    setLoaders((pre) => ({ ...pre, commentLoader: false }));
  };

  const setfiltres = async(data) =>{
    await setMovie(data);
    await setLoaders((pre) => ({ ...pre, initialLoader: false }));
  }

  const [movie, setMovie] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_END_POINT}/api/v1/pelicula/${movie_id}`)
      .then((response) => response.json())
      .then((data) => {
        setfiltres(data)
      });
  }, []);

  if (loaders.initialLoader) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="container">
      <ToastContainer />
      <div className="row">
        <div className="col-8 col-sm-3 mr-1 mt-5">
          <Card>
            <CardImg height="100%" src={movie.image} alt={movie.name} />
          </Card>
        </div>
        <div className="col-12 col-sm-7 p-5">
          <h3 className="text-danger">Nombre: </h3>
          <p>{movie.name}</p>
          <hr />
          <h4 className="text-danger">Duración:</h4>
          <p>{movie.duration}</p>
          <hr />
          <h4 className="text-danger">Generos: </h4>{" "}
          {movie.generos.map((genero, key) => {
            return (
              <span>{genero.name}, </span>

            );
          })}
          <h4 className="text-danger">Descripción: </h4>
          <p>{movie.description}</p>
          <hr />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12 col-sm-8 offset-2">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src={movie.video}
              title={movie.name}
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
      <div className="row">
        <div className="col-12">
          <form onSubmit={addComment}>
            <div className="row">
              <div className="col-12 col-sm-9 m-1 p-0">
                <input
                  style={{ width: "100%" }}
                  type="text"
                  onChange={onChange1}
                  name="comment"
                  value={comment}
                  placeholder="Commentario"
                />
              </div>
              <div className="col-12 col-sm-2 m-1 p-0">
                <button
                  style={{ width: "100%" }}
                  type="submit"
                  value="submit"
                  className="btn btn-danger"
                >
                  Comentar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {loaders.commentLoader && <p>Enviando comentario</p>}
    </div>
  );
}
