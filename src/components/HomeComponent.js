import React from 'react';
import { Card, CardImg, CardImgOverlay, CardBody, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from './LoadigComponent';


const RederMenuItem = ({ movie }) => {

    const generoName = movie.generos.map((genero) => {
        return (
            <span key={genero.name}>{genero.name} </span>
        );
    })
    return (
        <Link to={`/user/${movie.id}`}>
            <Card>
                <CardImg height="92%" src={movie.image} alt={movie.name} />
                <CardImgOverlay><strong>{movie.name}</strong></CardImgOverlay>
                <CardBody height="8%" style={{ padding: '5px' }}>
                    <div className="row">
                        <div className="col-12">
                            <CardSubtitle>{generoName}</CardSubtitle>
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

            <div key={movie.id} className="col-7 col-sm-6 col-md-3 mb-2">
                <RederMenuItem movie={movie} /* onClick={props.onClick} */ />
            </div>

        );
    });

    if(props.isLoading){
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }else{
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
            </div>
        )
    
    }
}

export default Home;