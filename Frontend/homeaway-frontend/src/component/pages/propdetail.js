import React,{Component} from 'react';
import NavbarOwner from '../layout/navbarOwner';
import PropertyPage from '../layout/property';
import Footer from '../layout/footer';
import Navbar from '../layout/navbar';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';

class PropertyDetail extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="container-fluid">
             {this.props.login.type ==="owner" ? <NavbarOwner/>: <Navbar logoFlag={true} navBlue={true} />}
                <PropertyPage {...this.props} propid = {this.props.match.params.propid} type={this.props.login.type}/>
                <Footer/>
            </div>
        )
    }
}
PropertyDetail.propTypes = {
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

export default connect(mapStateToProps,mapDispatchToProps)(PropertyDetail);