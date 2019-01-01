import React,{Component} from 'react';
import {graphql,compose} from 'react-apollo';
import moment from 'moment';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import Pagination from "react-js-pagination";
import {bookings} from '../queries/query';

class UserTrip extends Component{
    constructor(props){
        super(props)
        this.state={
            itemPerPage:[],
            activePage:1,
            arrayData:[]
        }
    }
    async componentDidMount(){
        let email = localStorage.getItem("email")
        //this.props.myTrip({params:{email:email}})
        this.props.bookings.variables["email"]= email;
        let {data,error,loading} = await this.props.bookings.refetch();
        console.log(data)
        this.setState({arrayData: data.bookings.slice(0,6), itemPerPage:data.bookings})
    }
    search = (e) => {
        e.preventDefault()
        let value = e.target.search.value.toLowerCase()
        let filterByName = this.props.mybooking.filter(data => {
            console.log(data.headline);
            return data.headline.toLowerCase().includes(value)  
        })
        let filterByName1 = filterByName.slice(0,6)
        this.setState({arrayData:filterByName1,itemPerPage:filterByName,pageNumber:1})
    }

    handlePageChange=(pageNumber)=>{
        let itemList = this.state.itemPerPage.slice(5*(pageNumber-1),pageNumber*6)
        this.setState({activePage: pageNumber,arrayData:itemList}); 
    }
    select=(e)=>{
        console.log(e.target.value)
        switch(e.target.value){
            case "1":
                var filteredData = this.props.mybooking
                break;
            case "2":
                let currentMonth = (new Date().getMonth() + 1).toString()
                console.log(typeof currentMonth)
                var filteredData = this.props.mybooking.filter(data=>{
                    let [year,month,day] = data.bookedFrom.split('-')
                    console.log(typeof month)
                    return currentMonth === month
                })
                break;
            case "3": 
                let nextMonth = (new Date().getMonth() + 2).toString()
                var filteredData = this.props.mybooking.filter(data=>{
                    let [year,month,day] = data.bookedFrom.split('-')
                    return nextMonth === month
                })
                break;
            case "4":
                let currentYear = (new Date().getFullYear()).toString()
                console.log(currentYear)
                var filteredData = this.props.mybooking.filter(data=>{
                    let [year,month,day] = data.bookedFrom.split('-')
                    return currentYear === year
                })
                break;
            case "5":
                let nextYear = (new Date().getFullYear()+1).toString()
                console.log(currentYear)
                var filteredData = this.props.mybooking.filter(data=>{
                    let [year,month,day] = data.bookedFrom.split('-')
                    return nextYear === year
                })
                break;
            default:
                var filteredData = this.props.mybooking
                break;
            }
            let filterByName1 = filteredData.slice(0,6)
            this.setState({arrayData:filterByName1,itemPerPage:filteredData,activePage:1})   
    }

    render(){
        let redirectVar = null;
        let trip = null
        /*if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/"/>
        }*/
        console.log(this.props)
        if(typeof this.state.arrayData!=="undefined"){
            trip = this.state.arrayData.map(data=>{
            return (
                <div className="card-dash col-sm-3" style={{fontSize:'14px',margin:"5px"}}>
                    <div className="card-body">
                    <div id={`myCarousel-${data.bookid}`} className="carousel slide" data-ride="carousel" data-interval = "false">
                    <div className="carousel-inner">
                        <div className="item active">
                        {(data.image1 !== undefined) ?
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image1}`} alt="image1"/>
                        : <img src="http://placehold.it/350x250" alt="image1"/>}
                       </div>
                    {(data.image2 != undefined) ?   
                    <div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image2}`} alt="image2"/>
                    </div> : undefined}
                    {((data.image3 !==undefined)) ?
                    (<div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image3}`} alt="image3"/>
                    </div>):undefined}
                    {(data.image4 !== undefined) ?
                    <div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image4}`} alt="image4"/>
                    </div>:undefined}
                </div>
                {(data.image2 !== undefined || data.image3 !== undefined || data.image4 !== undefined) ?
                (<div className="arrow">
                <a className="left carousel-control" href={`#myCarousel-${data.bookid}`} data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href={`#myCarousel-${data.bookid}`} data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right"></span>
                    <span className="sr-only">Next</span>
                </a>
                </div>):null}
                </div>
                    <h4 className="card-title">{data.headline.substring(0,56)}</h4>
                    <h6 className="card-subtitle mb-2 text-muted"><i className="fas fa-map-marker-alt"></i> {data.location}</h6>
                    <p className="card-text">{data.amenities.substring(0,40)}...</p>
                    <div className="col-sm-6">
                    <span><strong>Booked From</strong></span>
                    </div>
                <div className="col-sm-6">
                <span><strong>Booked To</strong></span>
                </div>
                <div className="col-sm-6 ">
                    <span>{moment(data.bookedFrom).format('MM/DD/YYYY')}</span>
                </div>
                <div className="col-sm-6">
                <span>{moment(data.bookedTo).format('MM/DD/YYYY')}</span>
                </div>
                <div className="col-sm-6" style={{marginTop:"20px"}}>
                    <span><strong>Total Nights:</strong></span>
                    </div>
                <div className="col-sm-6" style={{marginTop:"20px"}}>
                    <span>{data.nights}</span>
                </div>
                <div className="col-sm-6" style={{marginTop:"20px"}}>
                    <span><strong>Booked Price:</strong></span>
                    </div>
                <div className="col-sm-6" style={{marginTop:"20px"}}>
                    <span>{data.price}</span>
                </div>  
                
                </div>
                </div>
            )
        })
    }
        return (
            <div className="container-fluid">
                {redirectVar}
                <Navbar logoFlag={true} navBlue={true}/>
                <ul className="nav nav-pills" style = {{borderBottom:'1px solid #dfdfdf',marginBottom:'40px'}}>
                <li ><Link to="/inbox">Inbox</Link></li>
                <li className='tab'><Link to="/mytrip">My trips</Link></li>
                <li ><Link to="/profile">Profile</Link></li>
                <li ><Link to="#">Account</Link></li>
                </ul>
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
                <select className="select1 input-lg" name="date" onChange={this.select}> 
                    <option value='' selected disabled>Sort by Date</option>
                    <option value="1">All</option>
                    <option value="2">This month</option>
                    <option value="3">Next month</option>
                    <option value="4">This year</option>
                    <option value="5">Next year</option>
                </select>
                {typeof this.state.itemPerPage!=="undefined"?
                <div className="col-sm-offset-9">
                    <Pagination
                    hideDisabled
                    activePage={this.state.activePage}
                    itemsCountPerPage={5}
                    totalItemsCount={this.state.itemPerPage.length}
                    pageRangeDisplayed={(parseInt(this.state.itemPerPage.length/5)+1)}
                    onChange={this.handlePageChange} >     
                    </Pagination>
                </div>:null}
                <div className="col-sm-offset-1 col-sm-11">
                    {trip}
                </div>
                {typeof this.state.itemPerPage!=="undefined"?
                <div className="col-sm-offset-9">
                    <Pagination
                    hideDisabled
                    activePage={this.state.activePage}
                    itemsCountPerPage={6}
                    totalItemsCount={this.state.itemPerPage.length}
                    pageRangeDisplayed={(parseInt(this.state.itemPerPage.length/5)+1)}
                    onChange={this.handlePageChange} >     
                    </Pagination>
                </div>:null}
                <div style={{marginTop:'40px'}}>
                <Footer/>
                </div>
            </div>
        )
    
    }
}
/*UserTrip.propTypes = {
    login: PropTypes.object.isRequired,
    myTrip: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {login: state.login,mybooking: state.bookData.arrayData}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(UserTrip);*/

export default compose(
    graphql(bookings, { name: "bookings" }),
)(UserTrip);