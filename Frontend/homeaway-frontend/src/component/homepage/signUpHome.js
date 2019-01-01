import React, {Component} from 'react';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';
import {Redirect} from 'react-router';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';

class SignUpHome extends Component {
    constructor(props){
        super(props);
        this.state={cont: false, prof:false}
        this.continue=this.continue.bind(this);
        this.profile=this.profile.bind(this);
    }
    componentWillMount(){
        this.setState({cont:false,prof:false})
    }
    continue(){
        this.setState({cont:true})
    }
    profile(){
        this.setState({prof:true})
    }

    render(){
        let redirectVar = null;
        let token = localStorage.getItem("token");
        if(token===""){
            redirectVar=<Redirect to='/' />
        }
        if (this.state.cont) {
            return <Redirect to='/' />
        }
        if(this.state.prof) {
            return (<Redirect to='/profile' />)   
        }
        return (
            <div className='container-fluid'>
            {redirectVar}
            <Navbar logoFlag= {true}/>
            <div className="bg-secondary text-center text-white">
              <div className="col-sm-offset-3 col-lg-6 col-sm-offset-3">
                <div className="card-body text-center">
                <h1 style={{fontWeight:'300',marginTop:'20px',marginBottom: '10px'}}>Thank you for creating an Account</h1>
            </div>
            <div className="profile-update" style={{border:'1px solid grey',margin:'20px',padding:'20px'}}>
            <h3>Welcome<strong> {`${this.props.login.first_name} ${this.props.login.last_name}`}</strong> </h3>
            <div className='row' /> 
            <div className="centered-hr text-center">
            </div>
            <p>
            <img src="//resources.homeaway.com/resources/29f5da4c/images/anonymous.png"/>
            </p>
            <p>
               Please take a few moments to 
               <a href="/updateprofile"> update your profile </a>
                with a picture and a few details about yourself. Property owners are more likely to respond more quickly to travelers with profiles.
            </p>
            <div className="centered-hr text-center" style={{paddingTop:'4  0px'}}>
            </div>
            <div className="row" style={{paddingTop:'20px',fontSize:'20px'}}>
                    <div className="col-xs-6" >
                    <button onClick={this.continue} className="btn btn-link btn-md center-block input-lg">Continue</button>
                    </div>
                    <div className="col-xs-6">
                    <button onClick={this.profile}className="btn btn-primary btn-md center-block input-lg" >Update Your Profile</button>
            </div>
            </div>
            </div>
            </div>
            </div>
            <Footer />
            
            </div>
        )
    }
}
SignUpHome.propTypes = {
    login: PropTypes.object.isRequired  
}

function mapStateToProps(state){
    return {login: state.login}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUpHome);