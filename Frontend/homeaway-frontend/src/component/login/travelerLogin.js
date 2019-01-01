import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import {Link} from 'react-router-dom';
import LoginForm from './loginForm';
import {login} from '../mutation/mutation';

class TravelerLogin extends Component {
    state = {
        msg:""
    }
    onLogin= async(values) =>{
        values["type"] = "user";
        let {data,error,loading} = await this.props.login({
            variables:values
        });
        if(data.login.email ==null){
            this.setState({msg:"Username/Password is wrong."})
        } else {
            //this.props.fetchLogin(data.signup);
            console.log(data.login)
            localStorage.setItem('token',data.login.token);
            localStorage.setItem("email",data.login.email);
            localStorage.setItem("first_name",data.login.first_name);
            localStorage.setItem("last_name",data.login.last_name);
            localStorage.setItem("type", data.login.type);
            this.props.history.push('/')
        }
        //axios.defaults.withCredentials = true;
        //this.props.fetchLogin(values);  
        /*axios.post("/login",values)
        .then(response=>{
                console.log(response.data)
                this.props.fetchLogin(response)
                localStorage.setItem('token',response.data.token)
                localStorage.setItem('email',response.data.email)
                localStorage.setItem("type", response.data.type);
                this.setState({msg:""})
                this.props.history.push('/')
        })  
        .catch(err=>{
            this.setState({msg:"Username/Password is not correct"})
        })*/
    }
    render(){
        let navigate = null;
        let token = localStorage.getItem("token")
        /*if(token !=="null" &&  localStorage.getItem("token")!==''){
            navigate=<Redirect to='/' />
        }
        /*let errMsg=null;
        if(this.props.login !=undefined && this.props.login.status ==="success"){
            localStorage.setItem('token',this.props.login.token)
            localStorage.setItem('email',this.props.login.email)
            localStorage.setItem("type", this.props.login.type);
            navigate = <Redirect to='/'/>
        }else if(this.props.error !=undefined && this.props.error.includes('401')){
            errMsg = "Username/Password is not correct"
        }*/
        return (
            <div className='container-fluid'>
            {navigate}
            <Navbar logoFlag = {true}/>
            <div className="bg-secondary text-white">
              <div className="col-sm-offset-4 col-lg-4 col-sm-offset-4">
                  <div className="card-body text-center">
                <h2>Log in to HomeAway</h2>
                <h4>Need an account?<Link to='/travelerSignup'>  Sign Up</Link></h4>
            </div>
            <div className="login-form" style={{border:'1px solid grey',margin:'20px',padding:'20px'}}>
            {(this.state.msg!= "")?
                <div className="alert alert-danger fade in">
        			<a href="#" className="close" data-dismiss="alert"></a>
        			<strong>Error!</strong> {this.state.msg}
    		</div>:null}
                <h2 style={{color:'#666',fontSize:'22px',fontWeight:'300',borderBottom: '1px solid #dbdbdb'}}>Account Login</h2>
                <LoginForm onSubmit={this.onLogin}/>
                <div className='row'/>
                <div className="checkbox">
                <label><input type="checkbox"/> Keep me signed in</label>
                </div>
                <div className="centered-hr text-center">
                    <span className="text-center"><em>or</em></span>
                </div>
                <div className='btn-toolbar'>
                <button className="btn btn-primary fab fa-facebook col-sm-12 input-lg" style={{fontSize:'16px',padding:'10px 10px'}}>
                  <span>  |  </span>Login with Facebook
                </button>
                <div style={{paddingBottom:'50px'}}></div>
                <button className="btn btn-default fab fa-google col-sm-12 input-lg" style={{fontSize:'16px',padding:'10px 10px'}}>
                <span>  |  </span>
                  Login with Google
                </button>
                </div>
                <p id="fb-p" className="facebook text-center traveler"><small>We don't post anything without your permission.</small></p>
            
            </div>
            </div>
            </div>
            <Footer/>
            </div>
        )
    }
}

/*TravelerLogin.propTypes = {
    fetchLogin: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired  
}

function mapStateToProps(state){
    return {login: state.login, error:state.login.error}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TravelerLogin);*/

export default compose(
    graphql(login, { name: "login" })
)(TravelerLogin);