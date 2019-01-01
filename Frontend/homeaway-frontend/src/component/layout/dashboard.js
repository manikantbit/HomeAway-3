import React,{Component} from 'react';
import Footer from './footer';
import {Redirect} from 'react-router';
import axios from 'axios';
import { graphql, compose } from 'react-apollo';
import { Link} from 'react-router-dom';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import Pagination from "react-js-pagination";
import {property} from '../queries/query';

class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            itemPerPage:[],
            activePage:1,
            arrayData:[]
        }
    }
    async componentDidMount(){
        let values = localStorage.getItem("email");
        console.log(values)
        this.props.property.variables["email"]=values;
        let {data,error} = await this.props.property.refetch();
        console.log(data.property)
        if(data){
            this.setState({arrayData:data.property.slice(0,5),itemPerPage: data.property})
        }

        /*axios.get(`/getPropByUser`, {params:data})
        .then(propDetails=>{
            this.setState({arrayData:propDetails.data.slice(0,5),itemPerPage: propDetails.data})
            this.props.getPropByUser( propDetails)
        })*/     
    }
    search = (e) => {
        e.preventDefault()
        let value = e.target.search.value.toLowerCase()
        let filterByName = this.props.arrayData.filter(data => 
            data.headline.toLowerCase().includes(value)  
        )
        let filterByName1 = filterByName.slice(0,5)
        this.setState({arrayData:filterByName1,itemPerPage:filterByName,pageNumber:1})
    }
    handlePageChange=(pageNumber)=>{
        let itemList = this.state.itemPerPage.slice(5*(pageNumber-1),pageNumber*5)
        this.setState({activePage: pageNumber,arrayData:itemList}); 
    }
    select=(e)=>{
        console.log(e.target.value)
        switch(e.target.value){
            case "1":
                var filteredData = this.props.arrayData
                break;
            case "2":
                let currentMonth = (new Date().getMonth() + 1).toString()
                console.log(typeof currentMonth)
                var filteredData = this.props.arrayData.filter(data=>{
                    let [year,month,day] = data.availFrom.split('-')
                    console.log(typeof month)
                    return currentMonth === month
                })
                break;
            case "3": 
                let nextMonth = (new Date().getMonth() + 2).toString()
                var filteredData = this.props.arrayData.filter(data=>{
                    let [year,month,day] = data.availFrom.split('-')
                    return nextMonth === month
                })
                break;
            case "4":
                let currentYear = (new Date().getFullYear()).toString()
                console.log(currentYear)
                var filteredData = this.props.arrayData.filter(data=>{
                    let [year,month,day] = data.availFrom.split('-')
                    return currentYear === year
                })
                break;
            case "5":
                let nextYear = (new Date().getFullYear()+1).toString()
                console.log(currentYear)
                var filteredData = this.props.arrayData.filter(data=>{
                    let [year,month,day] = data.availFrom.split('-')
                    return nextYear === year
                })
                break;
            default:
                var filteredData = this.props.arrayData
                break;
            }

            let filterByName1 = filteredData.slice(0,5)
            this.setState({arrayData:filterByName1,itemPerPage:filteredData,activePage:1})
        
    }
    render(){
        let redirectVar = null;
        let dash=null;
        /*if(this.props.login.token===""){
            redirectVar = <Redirect to='/ownerlogin'></Redirect>
        }*/
        if(this.state.arrayData.length>0){
            dash = this.state.arrayData.map(data=>{
             return (
                <div className='card row' style ={{margin:'30px'}}>
                <div className="col-md-4 col-xs-4"> 
                <div id={`myCarousel-${data.propid}`} className="carousel slide" data-ride="carousel" data-interval = "false">

                    <div className="carousel-inner">
                        <div className="item active">
                        {(data.image1 != null || data.image1!= undefined) ?
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image1}`} alt="image1"/>
                        : <img src="http://placehold.it/350x250" alt="image1"/>}
                       </div>
                    {(data.image2 != null|| data.image2!= undefined) ?   
                    <div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image2}`} alt="image2"/>
                    </div> : null}
                    {((data.image3 !=null || data.image3!= undefined)) ?
                    (<div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image3}`} alt="image3"/>
                    </div>):null}
                    {(data.image4 != null || data.image4!= undefined) ?
                    <div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image4}`} alt="image4"/>
                    </div>:null}
                </div>
                {(data.image2 !== undefined || data.image3 !== undefined || data.image4 !== undefined) ?
                (<div className="arrow">
                <a className="left carousel-control" href={`#myCarousel-${data.propid}`} data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href={`#myCarousel-${data.propid}`} data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right"></span>
                    <span className="sr-only">Next</span>
                </a>
                </div>) : null}
                </div> 
                </div>
                <div className="col-md-6 col-xs-8">
                    <h4><Link to={`/ownerhome/${data.propid}`}>{data.headline}</Link></h4>
                    <h4>{`${data.proptype} `} <i className="fas fa-circle fa-xs"></i> {`${data.noOfRooms}BR `} <i className="fas fa-circle fa-xs"></i>   {`${data.noOfBath}BA `} <i className="fas fa-circle fa-xs"></i>  {`Sleeps ${data.allowedGuest}`}</h4>
                <h4 style={{marginTop:'30px'}}><i className="fas fa-map-marker-alt"></i> {data.location}</h4>
                <h4 style={{marginTop:'40px'}}>${data.price} per night</h4>
                </div>
            </div>
            )
        })
    }
        return (
            <div className="container-fluid">
            {redirectVar}
            <form onSubmit={this.search} style={{marginTop:"30px"}}>
            <div className="col-sm-11"  >
                <div className="right-inner-addon">
                    <i className="icon-search fas fa-search"></i>
                    <input type="search" name="search" className="searchbar form-control input-lg " placeholder="Search by name..."></input>
                    </div> 
                    </div>
                <div className="col-sm-1">
                    <button type="submit" className="btn btn-primary-info input-lg" ><i className="fas fa-search"></i></button>
                </div>
            </form>  
            <div className="text-center">
            <h1>Dashboard</h1>
            <h3>Your Property Listings</h3>
            </div>
            <select className="input-lg" name="date" onChange={this.select} style={{backgroundColor:'#f4f4f4',border:'none',cursor:'pointer'}}> 
                <option value='' selected disabled>Sort by Date</option>
                <option value="1">All</option>
                <option value="2">This month</option>
                <option value="3">Next month</option>
                <option value="4">This year</option>
                <option value="5">Next year</option>
            </select>
            <div className="col-sm-offset-6">
            <Pagination
            hideDisabled
            activePage={this.state.activePage}
            itemsCountPerPage={5}
            totalItemsCount={this.state.itemPerPage.length}
            pageRangeDisplayed={(parseInt(this.state.itemPerPage.length/5)+1)}
            onChange={this.handlePageChange} >     
            </Pagination>
            </div>
            
            {dash}
            <div className="col-sm-offset-6">
            <Pagination 
            hideDisabled
            activePage={this.state.activePage}
            itemsCountPerPage={5}
            totalItemsCount={this.state.itemPerPage.length}
            pageRangeDisplayed={(this.state.itemPerPage.length/5)+1}
            onChange={this.handlePageChange} >     
            </Pagination>
            </div>
            <div style={{margin:'50px'}}>
            <Footer />
        </div>
               
        </div>
        )
    }
}
/*Dashboard.propTypes = {
    getPropByUser: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    arrayData:PropTypes.object.isRequired
}

function mapStateToProps(state){
    return {login: state.login,property:state.property,arrayData:state.arrayData.arrayData}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);*/

export default compose(
    graphql(property, { name: "property" })
)(Dashboard);