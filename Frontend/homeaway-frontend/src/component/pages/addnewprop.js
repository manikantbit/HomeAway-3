import React,{Component} from 'react';
import NavbarOwner from '../layout/navbarOwner';
import PropertyForm from './propertyForm';
import Footer from '../layout/footer';
import {Redirect} from 'react-router';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';

class AddNewProp extends Component {
    constructor(props){
        super(props)
    }
    render(){
        let redirectVar = null;
        return (
            <div className="container-fluid">
                {redirectVar}
                <NavbarOwner/>
                <PropertyForm  form=""/>
                <div style = {{margin:'100px',paddingTop:'50px'}}>
                <Footer/>
                </div>
            </div>
        )
    }
}
AddNewProp.propTypes = {
    property: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    fetchProperty: PropTypes.func.isRequired,
    postProperty: PropTypes.func.isRequired 
}

function mapStateToProps(state){
    return {login: state.login,property: state.property, error:state.property.error}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AddNewProp);