import React,{Component} from 'react';
import NavbarOwner from '../layout/navbarOwner';
import PropertyPage from '../layout/property';
import Footer from '../layout/footer';
import SearchForm from '../homepage/searchForm';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';

class UserProperty extends Component{
    render(){
        return (
            <div className="container-fluid">
                <NavbarOwner/>
                <SearchForm/>
                <PropertyPage propid = {this.props.property.propid} type="user"/>
                <Footer/>
            </div>
        )
    }
}
UserProperty.propTypes = {
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

export default connect(mapStateToProps,mapDispatchToProps)(UserProperty);
