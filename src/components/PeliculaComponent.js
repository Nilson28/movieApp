import React from 'react'
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardSubtitle } from 'reactstrap';


export default function PeliculaComponent(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-3">
                    <Card>
                        <CardImg height="100%" src={props.movie.image} alt={props.movie.name} />
                    </Card>
                </div>
                <div className="col-12 col-sm-9">
                    <p>{props.movie.description}</p>
                </div>
            </div>
        </div>
    )
}
