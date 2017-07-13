import React from 'react';
import $ from 'jquery';
import { Route, withRouter } from 'react-router-dom';

class Login extends React.Component {
    doLogin(
        proxy,
        event, 
        email = $('#email').val(), 
        password = $('#password').val()){
        console.log(arguments);
        event.preventDefault();
        this.props.db.auth().signInWithEmailAndPassword(email, password).then(()=>{
            const homeRoute = '/';
            this.props.history.push(homeRoute);
        }).catch(function(error){
            throw new Error(error);
        });
    }

    render(){
        return (
                <div>
                    <div className="intro-header intro-header-login">
                        <div className="mlb-transparent-gradient"></div>
                        <div className="site-heading">
                            <h1 className="text-shadow">Login</h1>
                        </div>
                    </div>
                     <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                                    <div className="row control-group">
                                        <div className="form-group col-xs-12 floating-label-form-group controls">
                                            <label>Name</label>
                                            <input type="text" className="form-control" placeholder="Email" id="email" required="required" data-validation-required-message="Please enter your email." aria-invalid="false" />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                    </div>
                                    <div className="row control-group">
                                        <div className="form-group col-xs-12 floating-label-form-group controls">
                                            <label>Password</label>
                                            <input type="password" className="form-control" placeholder="Password" id="password" required="required" data-validation-required-message="Please enter your password." />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                    </div>
                                    <br />
                                    <div id="success"></div>
                                    <div className="row">
                                        <div className="form-group col-xs-12">
                                            <button onClick={this.doLogin.bind(this)} type="submit" className="btn btn-success pull-right">Login</button>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}

export default Login;