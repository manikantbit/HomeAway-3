import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';
import usFlag from './us-flag.png';
import {blueLogo,whiteLogo,blueBird,whiteBird} from '../config';
import axios from 'axios';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import {Link} from 'react-router-dom';
import {logout} from '../mutation/mutation';
import {users} from '../queries/query';
import { Redirect } from 'react-router';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state={
            user:null,
            navigate:null
        }
        this.logout = this.logout.bind(this);
    }
    async componentDidMount(){
        let values=localStorage.getItem("email");
        this.props.users.variables["email"]=values;
        let {data,error} = await this.props.users.refetch();
        console.log(data.users[0])
        if(data){
            this.setState({user:data.users[0]})
        }

    }
    async logout(){
        console.log("Logout")
        let obj=this;
        let values={email:localStorage.getItem("email")}
        localStorage.clear();
        let {data,error} = await this.props.logout({
            variables:values,
        });
        if(!error){
            this.setState({navigate:(<Redirect to='/logout'/>)})
        }
       
    }
    render(){
        let toggleLogin = null;
        let navLinks = null;
        let inbox=null;
        let profile_image=null;
        let profile_image_im = "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.3/bce/brand/misc/default-profile-pic.png";
        let token = localStorage.getItem('token');
        console.log(token);
        let type = localStorage.getItem('type');
        if(token!==null){
            profile_image_im = this.state.user?`${process.env.PUBLIC_URL}/images/${this.state.user.profile_image}`: profile_image_im;   
            let first_name = localStorage.getItem("first_name");
            let last_name = localStorage.getItem("last_name");
            let ownerdash = type === "owner"? <li><Link to='/ownerhome' style = {{borderBottom: '1px solid #dbdbdb'}}>Owner Dashboard</Link></li> : null
            inbox = (<li><Link to='/inbox' className = {this.props.navBlue? "nav-blue":"nav-link"} ><i class="far fa-envelope"></i></Link></li>)
            profile_image = <li><img className="avatar img-circle img-thumbnail" src={profile_image_im} style={{width:'40px',height:'40px'}}></img></li>
            toggleLogin =
            (
            <li className="dropdown">
                <a className= {"dropdown-toggle".concat( this.props.navBlue? " nav-blue":" nav-link")} data-toggle="dropdown" href="#">{ last_name!==null ?(`${first_name}  ${last_name.substring(0,1)}.`):null} <i class="fas fa-caret-down"></i></a>
                <ul className="dropdown-menu">
                <li><Link to='/inbox'>Inbox</Link></li>
                <li><Link to='/mytrip'>My Trips</Link></li>
                <li><Link to='/profile'>My Profile</Link></li>
                <li><Link to='#' style = {{borderBottom: '1px solid #dbdbdb'}}>Account</Link></li>
                {ownerdash}
                <li><Link to="/logout" onClick={this.logout} className="logout-btn">Logout</Link></li>
                </ul>
             </li> 
            )
            }  else {
                toggleLogin = (
                    <li className="dropdown">
                    <a className="dropdown-toggle nav-link" data-toggle="dropdown" href="#">Login <i className="fas fa-caret-down"></i></a>
                    <ul className="dropdown-menu">
                    <li><Link to='/travelerLogin'>Traveller Login</Link></li>
                    <li><Link to="/ownerlogin">Owner Login</Link></li>
                    </ul>
             </li> 
                )
            }     
         navLinks = (this.props.logoFlag && !this.props.navBlue) ? 
            (
                <ul className="nav navbar-nav navbar-right" >  
                <a href='#'><img alt="" src = {this.props.logoFlag ? blueBird: whiteBird}/></a>
                </ul>
            )
                :
            (
                    <ul className="nav navbar-nav navbar-right">
                    <li><img src={usFlag} style={{width:'30px',height:'20px',marginTop:'15px'}} />
                    </li>
                     <li><a className = {this.props.navBlue? "nav-blue":"nav-link"} href="#">Trip Boards</a></li>
                     {profile_image}
                     {toggleLogin}
                     {inbox}
                     <li><a className = {this.props.navBlue? "nav-blue":"nav-link"} href="#">Help</a></li>
                     <button className="btn btn-default navbar-btn" style={{borderRadius:'100px',color:'#337ab7'}}>List Your Property</button>
                     <a href='#'><img alt="" src = {this.props.logoFlag ? blueBird: whiteBird}/></a>
                     </ul>
             );
             
        return (
            <div className='container-fluid'>
            <nav className="navbar" style={{marginTop:'25px'}}>
                <div className = "navbar-header">
                 <Link to= '/' title = "HomeAway.com">
                    {this.state.navigate}
                     <img alt="Homeaway Logo" src = {this.props.logoFlag ? blueLogo: whiteLogo}></img>
                 </Link>
                </div>
                {navLinks} 
                
            </nav>
            </div>
            
        )
    }
}
/*Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired  
}

function mapStateToProps(state){
    return {login: state.login}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);*/

export default compose(
    graphql(logout, { name: "logout" }),
    graphql(users, { name: "users" })
)(Navbar);