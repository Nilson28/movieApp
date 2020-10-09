import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class FooterComponent extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-4 offset-1 col-sm-2">
                            <h5>Links</h5>
                            <ul className="list-unstyled">
                                <li><Link to='/user/home'>Home</Link></li>
                                <li><Link to='/user/registro'>Registro</Link></li>

                            </ul>
                        </div>
                        <div className="col-7 col-sm-5">
                            <h5>Integrantes</h5>

                                <i className="fa fa-user fa-lg"></i>:Nilson cardona<br />
                                <i className="fa fa-user fa-lg"></i>:               <br />
                                <i className="fa fa-user fa-lg"></i>:               <br />
                                <i className="fa fa-user fa-lg"></i>:               <br />
                        </div>
                        <div className="col-12 col-sm-4 align-self-center">
                            <div className="text-center">
                                <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                                <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                                <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                                <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                                <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                                <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <p>© Copyright 2020 MovieApp</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
