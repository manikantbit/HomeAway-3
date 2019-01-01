import React,{Component} from 'react';
import {Redirect} from 'react-router';
import {compose,graphql} from 'react-apollo';
import Footer from '../layout/footer';
import Navbar from '../layout/navbar';
import { Link } from 'react-router-dom';
import SearchForm from '../homepage/searchForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import Pagination from 'react-js-pagination';
import {searchProperty} from '../queries/query';

class UserSearch extends Component{
    constructor(props){
        super(props)
        this.state={
            itemPerPage:[],
            activePage:1,
            arrayData:[],
            price:'Price',
            msg:null,
            bedroom:'Bedrooms'
        }
    }
    componentDidMount(){
        if(this.props.location.state && this.props.location.state.searchProperty.length ===0){
            this.setState({msg:"Sorry!! No Results Found. Please check the location value",
                arrayData:[],itemPerPage:[]})
        } else {
            this.setState({msg:null,arrayData:this.props.location.state.searchProperty.slice(0,10),itemPerPage:this.props.arrayData})
    }
}
    search = async (values) => {
        let obj = this;
        this.props.searchProperty.variables["loc"]=values.location;
        this.props.searchProperty.variables["allowedGuest"]=parseInt(values.allowedGuest);
        let {data,error,loading} = await this.props.searchProperty.refetch();  
        if(!data){
            this.setState({msg:"Sorry!! No Results Found. Please check the location value",
                arrayData:[],itemPerPage:[]})
        } else {
            this.setState({msg:null,arrayData:data.searchProperty.slice(0,10),itemPerPage:data.searchProperty})
    }    
        
    }
    handlePageChange=(pageNumber)=>{
        let itemList = this.state.itemPerPage.slice(10*(pageNumber-1),pageNumber*10)
        this.setState({activePage: pageNumber,arrayData:itemList}); 
    }
    filterSearch=(e)=>{
        console.log(e.target.textContent)
        switch(e.target.textContent){
            case "All":
                var text ='Price'
                var filteredData = this.props.arrayData
                break;
            case "$0-$50":
                var text = '$0-$50'
                var filteredData = this.props.arrayData.filter(data=>{
                    return data.price>0 && data.price<=50
                })
                break;
            case "$0-$100": 
                var text = '$0-$100'
                var filteredData = this.props.arrayData.filter(data=>{
                    return data.price>0 && data.price<=100
                })
                break;
            case "$101-$200":
                var text = '$101-$200'
                var filteredData = this.props.arrayData.filter(data=>{
                    return data.price>100 && data.price<=200
                })
                break;
            case "$201-$300":
                var text = '$201-$300'
                var filteredData = this.props.arrayData.filter(data=>{
                    return data.price>200 && data.price<=300
                })
                break;
            case "$300+":
                var text = '$300+'
                var filteredData = this.props.arrayData.filter(data=>{
                    return data.price>300
                })
                break;
            default:
                var text = "Price"
                var filteredData = this.props.arrayData
                break;
            }
            let filterByName1 = filteredData.slice(0,10)
            this.setState({arrayData:filterByName1,itemPerPage:filteredData,activePage:1,price:text, bedroom:'Bedrooms'})   
    }
    filterBed=(e)=>{
        console.log(e.target.textContent)
        switch(e.target.textContent){
            case "All":
                var text ='Bedrooms'
                var filteredData = this.props.arrayData
                break;
            case "1+ Bedrooms":
                var text = '1+ Bedrooms'
                var filteredData = this.props.arrayData.filter(data=>{
                    return data.noOfRooms>=1
                })
                break;
            case "2+ Bedrooms": 
                var text = '2+ Bedrooms'
                var filteredData = this.props.arrayData.filter(data=>{
                    return data.noOfRooms>1
                })
                break;
            case "3+ Bedrooms":
                var text = '3+ Bedrooms'
                var filteredData = this.props.arrayData.filter(data=>{
                    return data.noOfRooms>2
                })
                break;
            case "4+ Bedrooms":
                var text = '4+ Bedrooms'
                var filteredData = this.props.arrayData.filter(data=>{
                    return data.noOfRooms>3
                })
                break;
            default:
                var text = "Bedrooms"
                var filteredData = this.props.arrayData
                break;
            }
            let filterByName1 = filteredData.slice(0,10)
            this.setState({arrayData:filterByName1,itemPerPage:filteredData,activePage:1,bedroom:text, price: 'Price'})   
    }
    render(){
        let mapping = null;
        let dash= null;
        let redirectVar = null;
        if(this.state.arrayData.length>0){
            dash = this.state.arrayData.map(data=>{
             return (
                <div className='card row' style ={{margin:'30px'}}>
                <div className="col-md-4 col-xs-4">  
                <div id={`myCarousel-${data.propid}`} className="carousel slide" data-ride="carousel" data-interval = "false">
                    <div className="carousel-inner">
                        <div className="item active">
                        {data.image1 != null ?
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image1}`} alt="image1"/>
                        : <img src="http://placehold.it/350x250" alt="image1"/>}
                       </div>
                    {data.image2 != null ?   
                    <div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image2}`} alt="image2"/>
                    </div> : null}
                    {data.image3 != null ?
                    <div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image3}`} alt="image3"/>
                    </div>:null}
                    {data.image4 != null ?
                    <div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image4}`} alt="image4"/>
                    </div>:null}
                </div>
                {(data.image2 !==null || data.image3!==null || data.image4!==null) ?
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
                <div className="item-search col-md-6 col-xs-8">
                    <h4><Link to={`/usersearch/${data.propid}`}>{data.headline}</Link></h4>
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
            <div>
            <Navbar logoFlag={true} navBlue={true}/>
            <SearchForm onSubmit={this.search} value="home"/>
            </div>
            <div className="filter">
                <div className="dropdown">
                <span>{this.state.price} <i className="fas fa-chevron-down"></i></span>
                <div className="dropdown-content">
                    <p value="0" name = "filterPrice" onClick={this.filterSearch}>All</p>
                    <p value="1" name = "filterPrice" onClick={this.filterSearch}>$0-$50</p>
                    <p value="2" name = "filterPrice" onClick={this.filterSearch}>$0-$100</p>
                    <p value="3" name = "filterPrice" onClick={this.filterSearch}>$101-$200</p>
                    <p value="4" name = "filterPrice" onClick={this.filterSearch}>$201-$300</p>
                    <p value="5" name = "filterPrice" onClick={this.filterSearch}>$300+</p>
                </div>
                </div>
                <div className="dropdown">
                <span>{this.state.bedroom} <i className="fas fa-chevron-down"></i></span>
                <div className="dropdown-content">
                    <p value="0" onClick={this.filterBed}>All</p>
                    <p value="1" onClick={this.filterBed}>1+ Bedrooms</p>
                    <p value="2" onClick={this.filterBed}>2+ Bedrooms</p>
                    <p value="3" onClick={this.filterBed}>3+ Bedrooms</p>
                    <p value="4" onClick={this.filterBed}>4+ Bedrooms</p>
                </div>
                </div>
                <span>Instant Confirmation  <i className="fas fa-chevron-down"></i></span>
                <span>More filters <i className="fas fa-chevron-down"></i></span>
            </div> 
            <h3 className="text-center text-danger">{this.state.msg}</h3>
            {typeof this.state.itemPerPage!=="undefined"?
            <div className="col-sm-offset-6">
                    <Pagination
                    hideDisabled
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={typeof this.state.itemPerPage!=="undefined"?this.state.itemPerPage.length:null}
                    pageRangeDisplayed={(parseInt(this.state.itemPerPage.length/10)+1)}
                    onChange={this.handlePageChange} >     
                    </Pagination>
            </div> :null}       
            {dash}
            {typeof this.state.itemPerPage!=="undefined"?
            <div className="col-sm-offset-6">
                    <Pagination
                    hideDisabled
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={typeof this.state.itemPerPage!=="undefined"?this.state.itemPerPage.length:null}
                    pageRangeDisplayed={(parseInt(this.state.itemPerPage.length/10)+1)}
                    onChange={this.handlePageChange} >     
                    </Pagination>
                </div>:null}
            <div style={{margin:'50px'}}>
            <Footer />
        </div>
               
        </div>
        )
    }
}
/*UserSearch.propTypes = {
    login: PropTypes.object.isRequired,
    searchProp: PropTypes.func.isRequired,
}

function mapStateToProps(state){
    return {login: state.login, arrayData: state.arrayData.arrayData, status:state.arrayData.status}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UserSearch);*/
export default compose(
    graphql(searchProperty, { name: "searchProperty" }),
)(UserSearch);