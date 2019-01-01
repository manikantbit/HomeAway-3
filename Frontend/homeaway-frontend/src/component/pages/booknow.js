import React,{Component} from 'react';
import {graphql,compose} from 'react-apollo';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer'; 
import {Redirect} from 'react-router'; 
import moment from 'moment';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import BookForm from './bookForm';
import OrderDetails from './orderDetail';
import {postOrder} from '../mutation/mutation';


class Book extends Component{
    state = {
        msg: '',
        errMsg:''
    }
    bookNow=async (values)=>{ 
        //e.preventDefault();
        values["email"] = localStorage.getItem("email");
        values["propid"] = parseInt(this.props.match.params.propid);
        values["email"] = this.props.location.state.email;
        values["location"] = this.props.location.state.location;
        values["proptype"] = this.props.location.state.proptype;
        values["headline"] = this.props.location.state.headline;
        values["noOfRooms"] = this.props.location.state.noOfRooms;
        values["noOfBath"] = this.props.location.state.noOfBath;
        values["allowedGuest"] = this.props.location.state.allowedGuest;
        values["phone"] = parseInt(document.querySelector("input[name=phone]").value);
        values["image1"] = this.props.location.state.image1;
        values["image2"] = this.props.location.state.image2;
        values["image3"] = this.props.location.state.image3;
        values["image4"] = this.props.location.state.image4;
        values["price"] = parseInt(this.props.location.state.price);
        values["amenities"] = this.props.location.state.amenities;
        values["bookedFrom"] = this.props.location.data.availFrom;
        values["bookedTo"] = this.props.location.data.availTo;
        values["nights"] = document.querySelector("input[name=nights]").value;  //this.props.orderform.nights;
        values["createdDate"] = Date.now();
        console.log(values)
        let {data,error,loading} = await this.props.postOrder({
            variables:values
        });
        console.log(data)
        debugger;
        if(data){
            this.setState({msg:`Order has been booked successfully. Your reference ID is ${data.postOrder.bookid}`})
        } else {
            this.setState({errMsg:"There was problem in booking the order. Please try again"})
        }
    }
    render(){
        let redirectVar = null;
         
        return (
            <div className="container-fluid">
                <Navbar logoFlag={true} navBlue={true} />
                <div className="headline text-center">
                    <h3><strong>Book with confidence. Guaranteed.</strong></h3>
                    <h4>You’re covered when you book and pay on HomeAway.<a href="#">Learn more</a></h4>
                </div>
                <div className="col-md-12 margin-bottom-md text-center">
                    <div className="alert alert-info fade in">
                        <span><i className="fas fa-stopwatch"></i><strong> Act Fast!</strong> Price and availability may change.</span>
                        {/* <span style={{paddingLeft:'50px'}}><i className="fas fa-check"></i><strong> Free Cancellation</strong> until {(this.props.location.data!=undefined) ? (this.props.location.data.availFrom).subtract(1,"days").format('MM/DD/YYYY'): moment().format('MM/DD/YYYY')} (including the Service Fee)</span>*/}
                    </div>
            {(this.state.msg!=="") ? (
            <div className="alert alert-success fade in">
                {this.state.msg}  
          </div>
            ):null}
            {(this.state.errMsg) !=="" ?
            (<div className="alert alert-error fade in">
                There was problem in booking the order. Please try again.  
            </div>
            ):null}
                </div>  
                
                <div className="col-md-6" style={{backgroundColor:'white'}}>
                    <h2>1. Begin your booking</h2>
                    <div style={{paddingLeft:'20px',marginTop:'30px'}}>
                    <h4>Welcome back <strong>{localStorage.getItem("first_name")}!</strong></h4>
                    <h4>Signed in as: <strong>{localStorage.getItem("first_name")}</strong></h4>
                    </div>
                    <BookForm onSubmit={this.bookNow}/>
                </div>
                <div className="col-md-5" style={{backgroundColor:'white',marginLeft:"4%",border:"1px solid lightgrey"}}>
                    <div className="col-sm-1" style={{bottom:"-20px"}}>
                    <i className="fas fa-phone fa-2x" ></i>
                    </div>
                    <div className="col-sm-11">
                    <h4>For booking assistance, call <strong>(888)640-6970</strong></h4>
                    <h4>Rental Number: <strong></strong></h4>
                    </div>
                </div>
                <div className="col-md-5" style={{backgroundColor:'white',marginLeft:"4%",border:"1px solid lightgrey", marginTop:"20px"}}>
                    {(this.props.location!= undefined && this.props.location.state !=undefined && this.props.location.state.image1!=null)?
                    <div className="col-sm-4">
                        <img className="image" src={`${process.env.PUBLIC_URL}/images/${this.props.location.state.image1}`} alt="image1" style={{width: '100%',height: '100%',objectFit: 'contain'}}/>
                    </div> :null}
                    {(this.props.location!= undefined && this.props.location.state !=undefined && this.props.location.state.image2!=null)?
                    <div className="col-sm-4">
                    <img src={`${process.env.PUBLIC_URL}/images/${this.props.location.state.image2}`} alt="image2" style={{width: '100%',height: '100%',objectFit: 'contain'}}/>
                    </div>:null}
                    {(this.props.location!= undefined && this.props.location.state !=undefined && this.props.location.state.image3!=null)?
                    <div className="col-sm-4">
                    <img src={`${process.env.PUBLIC_URL}/images/${this.props.location.state.image3}`} alt="image3" style={{width: '100%',height: '100%',objectFit: 'contain'}}/>
                    </div>:null}
                    {this.props.location.state !=undefined ?
                    (<div>
                    <div className="col-sm-12">
                    <h3><strong>{this.props.location.state.headline.substring(0,50)}...</strong></h3>
                    <h4><i className="fas fa-map-marker-alt"></i> {this.props.location.state.location}</h4>
                    </div>
                    <div className="col-sm-12 rating">
                        <span style = {{backgroundColor:"green", color:"white"}}><strong>5</strong>/5</span>
                        <span><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i> (6)</span>
                    </div>
                    </div>):null}
                   
                    <OrderDetails property={this.props.location.state}/>
                    

                </div>
                <Footer />
            </div>
        )
    }
}

/*Book.propTypes = {
    property: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    //fetchProperty: PropTypes.func.isRequired,
    //postProperty: PropTypes.func.isRequired 
}

function mapStateToProps(state){
    return {login: state.login,orderBook: state.orderData, orderform: state.form.orderform !=undefined ? state.form.orderform.values: null, arrayData:state.arrayData.arrayData}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Book);*/

export default compose(
    graphql(postOrder, { name: "postOrder" }),
)(Book);
