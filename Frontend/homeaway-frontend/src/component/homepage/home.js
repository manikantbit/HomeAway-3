import React, {Component} from 'react';
import Navbar from '../layout/navbar';
import {graphql,compose} from 'react-apollo';
import SearchForm from './searchForm';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import moment from 'moment';
import {searchProperty} from '../queries/query';

class Home extends Component {
    state={
        errMsg:null
    }
    search = async (values) => {
        let obj = this;
        //values['availFrom'] = moment(values['availFrom']).format('MM/DD/YYYY')
        //values['availTo'] = moment(values['availTo']).format('MM/DD/YYYY')
        console.log(values)
        if(moment(values.availTo).diff(moment(values.availFrom)<0)) {
            this.setState({errMsg: 'To date cannot be greater than From Date'})
        } else {
            this.props.searchProperty.variables["loc"]=values.location;
            this.props.searchProperty.variables["allowedGuest"]=parseInt(values.allowedGuest);
            let {data,error,loading} = await this.props.searchProperty.refetch();
            //obj.props.searchProp(data)
            this.setState({errMsg:null})
            obj.props.history.push({pathname:'/usersearch',
                                    state: data})
        } 
    }
    render(){
        let redirectVar = null
        return (
            <div className='mainApp'>
            {redirectVar}
            <Navbar logoFlag = {false} navBlue={false}/>
            <div className="container-fluid"> 
            <div className="Search" style={{marginTop:'100px'}}>
                <h1 className="display-1 col-sm-offset-1 col-sm-10">
                    <span>Book beach houses, cabins,</span>
                </h1>
                <h1 className="col-sm-offset-1 col-sm-10 display-1">
                    <span>condos and more, worldwide</span>
                </h1>
            </div>
            {(this.state.errMsg!= null)?
                <div className="alert alert-danger fade in">
        			<a href="#" className="close" data-dismiss="alert"></a>
        			<strong>Error!</strong> {this.state.errMsg}
    		</div>:null}
            <SearchForm onSubmit={this.search}/>
            <div className='col-sm-12' style={{marginTop:'100px',color:'white',marginBottom:'50px'}}>
            <ul className='list-inline text-center' >
            <li className='col-xs-4 list-inline-item'>
            <h4 className="list-group-item-heading">Your whole vacation starts here</h4>
            <span className="list-group-item-text">Choose a rental from the world's best selection</span>
            </li>
            <li className='col-xs-4 list-inline-item'>
            <h4 className="list-group-item-heading">Book and stay with confidence</h4>
            <span className="list-group-item-text"><a href="#" style={{color:'white'}}> Secure payments, peace of mind</a></span>
            </li>
            <li className='col-xs-4 list-inline-item'>
                <h4 className="list-group-item-heading">Your vacation your way</h4>
                <span className="list-group-item-text">More space, more privacy, no compromises</span>
            </li>
            </ul>
            </div>
             </div>
             </div>  

        )
    }
}

/*Home.propTypes = {
    login: PropTypes.object.isRequired,
    searchProp: PropTypes.func.isRequired,
}

function mapStateToProps(state){
    return {login: state.login, property: state.arrayData.arrayData, status:state.arrayData.status}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);*/

export default compose(
    graphql(searchProperty, { name: "searchProperty" }),
)(Home);