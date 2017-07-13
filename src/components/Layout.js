import React from 'react';
import { NavLink } from 'react-router-dom';
import LogInOutButton from './loginout-button';


class Layout extends React.Component {
    constructor(props){
        super(props);  
        this.logout = this.logout.bind(this);
    }
    
    logout(){
        this.props.db.auth().signOut();
    }

    render(){
      return (<div className="mlb">
           <nav className="navbar navbar-default navbar-custom navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header page-scroll">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            Menu <i className="fa fa-bars"></i>
                        </button>
                        <a className="navbar-brand" href="https://www.magicleap.com/">
                            <img className="logo" src="/img/ml-logo@2x-w.png" />
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            {this.props.loggedIn? (
                                    <li>
                                        <NavLink to="/newPost">
                                            New Post
                                        </NavLink>
                                    </li>) : ''
                            }
                            <li>
                                <NavLink exact activeClassName='active' to='/'>Blog</NavLink>
                            </li>
                            <li>
                                {this.props.loggedIn? '' : <NavLink exact activeClassName='active' to='/register'>Register</NavLink>}
                            </li>
                             <li>
                                 <LogInOutButton logout={this.logout} loggedIn={this.props.loggedIn}/>
                            </li>
                             
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="app-content">
                {this.props.children}
            </div>
        </div>);
    }
}

export default Layout;