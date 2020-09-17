import React from 'react';
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

export default function PeliculaComponent(props) {
    const generos = props.movie.generos.map((genero) => {
        return (
            <div>
                <i>{genero.name}</i>
            </div>
        );
    });

    const comment = props.movie.comments.map((comment) => {
        return (
            <div>
                <i>user: {comment.user_id}</i>
                <p>{comment.comment}</p>
                <i>fecha: {comment.created_at}</i>
                <hr />
            </div>

        );
    })

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-3">
                    <Card>
                        <CardImg
                            height="100%"
                            src={props.movie.image}
                            alt={props.movie.name}
                        />
                    </Card>
                </div>
                <div className="col-12 col-sm-9 p-5">
                    <p>{props.movie.name}</p>
                    <hr />
                    <p>{props.movie.duration}</p>
                    <hr />
                    <p>{props.movie.description}</p>
                    <hr />
                    {generos}
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-12 col-sm-8 offset-2">
                    
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-12">
                    <h3>Comentarios de los usuarios</h3>
                    <hr />
                </div>
                <div className="col-12 col-sm-6">
                    {comment}
                </div>
            </div>
        </div>
    );
}
