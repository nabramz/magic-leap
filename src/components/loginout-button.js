import React from 'react';
import { NavLink } from 'react-router-dom';

export class LogInOutButton extends React.Component {   
    constructor(props){
        super(props);
        this.logout = this.props.logout.bind(this);
    }
    
    render(){
        if (this.props.loggedIn){
            return (<a onClick={this.logout}>Logout</a>); 
        }   
        else {
            return (<NavLink exact to='/login'>Login</NavLink>);
        } 
    }
}

export default LogInOutButton;