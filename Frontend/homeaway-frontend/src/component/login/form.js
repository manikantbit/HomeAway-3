import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import SignupForm from './signupForm';
import {signup} from '../mutation/mutation';

class Form extends Component {
    state={
        msg:'',
        navigate: null,
    }
    createUser= async(values) =>{
        let obj = this;
        values['type'] = this.props.type;
        let {data,error,loading} = await this.props.signup({
            variables:values,
        });
        console.log(error,data)
        if(data.signup.email ==null){
            this.setState({msg:"Email ID already exists"})
        } else {
            //this.props.fetchLogin(data.signup);
            localStorage.setItem('token',data.signup.token);
            localStorage.setItem("email",data.signup.email);
            localStorage.setItem("first_name",data.signup.first_name);
            localStorage.setItem("last_name",data.signup.last_name);
            localStorage.setItem("type", data.signup.type);
            if(data.signup.type === "user") {
                    this.setState({navigate: (<Redirect to='/signuphome'/>)})
            } else {
                    this.setState({navigate: (<Redirect to='/ownerhome'/>)})
            }
    }
        //axios.defaults.withCredentials = true;
        //this.props.fetchSignup(values);
        /*axios.post('/signup',values)
        .then(response=>{
            console.log(response.status)
            localStorage.setItem('token',response.data.token);
            localStorage.setItem("email",response.data.email);
            localStorage.setItem("type", response.data.type);
            console.log(response.data.type)
            
            obj.props.fetchLogin(response)
        })
        .catch(err=>{
            this.setState({msg:"Email ID already exists"})
        })*/
    }
    render() {
        return (
                <div>
                {this.state.msg!='' ?
                <div className="alert alert-danger fade in">
        			<a href="#" className="close" data-dismiss="alert"></a>
        			<strong>Error!</strong> {this.state.msg}
    			</div> :null}
                {this.state.navigate}
                <SignupForm onSubmit={this.createUser}/>
                <div className='row'/>
            </div>
        )
    }
}

/*Form.propTypes = {
    fetchSignup: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired  
}

function mapStateToProps(state){
    return {login: state.login,error: state.login.error}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Form);*/
export default compose(
    graphql(signup, { name: "signup" })
)(Form);
