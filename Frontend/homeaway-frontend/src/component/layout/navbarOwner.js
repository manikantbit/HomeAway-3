import React, {Component} from 'react';
import usFlag from './us-flag.png';
import {graphql,compose} from 'react-apollo';
import {blueLogo,whiteLogo,blueBird,whiteBird} from '../config';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import {Link,Redirect} from 'react-router-dom';
import {logout} from '../mutation/mutation';

class NavbarOwner extends Component {
    constructor(props){
        super(props);
        this.state = {
            navigate:null
        }
        this.logout = this.logout.bind(this);
    }
    async logout(){
        console.log("Logout")
        let values=localStorage.getItem("email");
        localStorage.clear();
        let {error} = await this.props.logout({
            variables:values,
        });
        if(!error){
            this.setState({navigate:(<Redirect to='/logout'/>)})
        }
    }
    render(){
        let toggleLogin = null;
        let inbox = null;
        var navLinks = null;
        const token = localStorage.getItem('token')
        if(token !=="") {
            inbox = (<li><Link to='/inbox' className = "nav-blue" ><i class="far fa-envelope"></i></Link></li>)
            navLinks = (
                <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">My Account <i className="fas fa-caret-down"></i></a>
                <ul className="dropdown-menu">
                <li><Link to='/inbox'>Inbox</Link></li>
                <li><Link to='/ownerhome'>Dashboard</Link></li>
                <li><Link to="/ownerhome">Property Details</Link></li>
                <li><Link to="#">Property Archive</Link></li>
                <li><Link to="/addnewprop">Add New Property</Link></li>
                <li><Link to="/logout" onClick={this.logout} className="logout-btn">Sign out</Link></li>
                </ul>
                </li>
                {inbox}
                 <li><i className="far fa-bell fa-2x" style={{margin:'10px'}}></i></li>
                 <a href='#'><img alt="" src = {blueBird}/></a>
                 </ul>
            )
        }
        return (
            <div className="container-fluid" style={{borderBottom:'1px solid grey'}}>
            <nav className="navbar" style={{marginTop:'25px'}}>
                <div className = "navbar-header">
                {this.state.navigate}
                <a href="#" style={{width:'20px',height:'30px', paddingRight:'20px'}}><i class="fas fa-bars fa-2x"></i></a>
                <Link to= '#' title = "HomeAway.com">
                     <img alt="Homeaway Logo" src = {blueLogo}></img>
                 </Link>
                 </div>
                 {navLinks}
            
            </nav>
            </div>
        )
    }
}
/*NavbarOwner.propTypes = {
    logout: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired  
}

function mapStateToProps(state){
    return {login: state.login, out:state.login}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NavbarOwner);*/

export default compose(
    graphql(logout, { name: "logout" }),
)(NavbarOwner);
