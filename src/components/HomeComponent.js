import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';


const RederMenuItem = ({ movie }) => {

    const generoName = movie.generos.map((genero)=>{
        return(
            <CardSubtitle key={genero.name}>{genero.name}</CardSubtitle>
        );
    })
    return (
        <Link to={`/user/home/${movie.id}`}>
            <Card>
                <CardImg height="85%" src={movie.image} alt={movie.name} />
                <CardBody height="15%" style={{padding: '3px'}}>
                    <div className="row">
                        <CardImgOverlay style={{color: "white", height: "15px"}}>{movie.name}</CardImgOverlay>
                        <div className="col-12">
                            {generoName}
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Link>
    );
}



const Home = (props) => {

    const menu = props.movies.map((movie) => {
        return (
            <div key={movie.id} className="col-12 col-md-3 mb-2">
                <RederMenuItem movie={movie} /* onClick={props.onClick} */ />
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3>Agregadas recientemente</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                {menu}
            </div>
            <div className="row">
            </div>
        </div>
    )

}

export default Home;