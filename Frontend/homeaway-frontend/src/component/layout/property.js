import React,{Component} from 'react';
import moment from 'moment';
import {compose,graphql} from 'react-apollo';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import SearchForm from '../homepage/searchForm';
import UserCartForm from './userCartForm';
import Link from 'react-router-dom/Link';
import {propertyByID} from '../queries/query'


var amenities=["Internet","Children Welcome","No Smoking","Heater","Washer or Dryer","Satellite or Cable",
    "TV","Pets Allowed"]

var kitchens=["Refrigerator","Microwave","Dishes & Utensils","Washing Machine","Coffee Maker"]
class PropertyPage extends Component{
    constructor(props){
        super(props)
        this.state={property:[],
            isTop: true,
            msg:null,
            errMsg:null
        }
        this.onScroll = this.onScroll.bind(this);
    }   
    async componentDidMount(){
        let obj = this;
        document.addEventListener('scroll', () => {
            let isTop = 0;
            if(this.props.type === "owner"){
                 isTop = window.scrollY < 100;
            } else {
                 isTop = window.scrollY < 192;
            }
            if (isTop !== obj.state.isTop) {
              obj.onScroll(isTop);
            }
          });
        const propid = this.props.propid;
        /*var result = this.props.arrayData.filter(obj => 
            obj.propid === parseInt(propid)
          )*/
        this.props.propertyByID.variables["propid"] = parseInt(propid);
        let {data,error,loading} = await this.props.propertyByID.refetch();
        console.log(data)
        this.setState({property:data.propertyByID})
    }
    onScroll(isTop) {
        this.setState({ isTop });
    }
    editProp=()=>{
        this.props.history.push({
            pathname:'/editprop',
            data: this.state.property[0].propid
        })
    }
    search = async (values) => {
        let obj = this;
        /*axios.get(`/getPropBySearch`, {params:values})
        .then(response => {
            obj.props.searchProp(response)
            obj.props.history.push('/usersearch')
        })*/
    }
    /*delProp=()=>{
        const data = {id:this.state.property.propid}
        axios.delete("http://localhost:7777/delProp",{params:{data}})
        .then(response=>{
            if(response.status ===200){
                this.props.history.push('/ownerhome');
            }
        })
    }*/
    booking=(values)=>{
        this.props.history.push({
            pathname:`/booknow/${this.props.propid}`,
            data: values,
            state: this.state.property[0]
        })
    }

    send = async () => {
        let value = document.querySelector('[name="description"]').value
        if(value === ""){
            this.setState({errMsg: "Please enter message"})
        } else {
        let data = {
            sender: this.props.login.email,
            receiver: this.state.property[0].email,
            propertyID:this.state.property[0].propid,
            propertyName: this.state.property[0].headline,
            message: value,
            createdDate: Date.now(),
            type:"user"
        }
        await this.props.sendMessage(data)
        this.setState({msg:"Message sent successfully", errMsg:null}) 
    }      
    }
    render(){
        if(this.state.property.length>0){
        var carousel = (
            <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval = "false">
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                        <li data-target="#myCarousel" data-slide-to="3"></li>
                    </ol>

                    <div className="carousel-inner">
                        <div className="item active">
                        {this.state.property[0].image1 != null ?
                        <img src={`${process.env.PUBLIC_URL}/images/${this.state.property[0].image1}`} alt="image1"/>
                        : <img src="http://placehold.it/350x250" alt="image1"/>}
                       </div>
                    {this.state.property[0].image2 != null ?   
                    <div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${this.state.property[0].image2}`} alt="image2"/>
                    </div> : null}
                    {this.state.property[0].image3 != null ?
                    <div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${this.state.property[0].image3}`} alt="image3"/>
                    </div>:null}
                    {this.state.property[0].image4 != null ?
                    <div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${this.state.property[0].image4}`} alt="image4"/>
                    </div>:null}
                </div>
                {(this.state.property[0].image2!==null || this.state.property[0].image3!==null || this.state.property[0].image4!==null) ?
                (<div className="arrow">
                <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href="#myCarousel" data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right"></span>
                    <span className="sr-only">Next</span>
                </a>
                </div>) : null}
                </div>
                )
        }

        const amenity = amenities.map(data=>{
            return (
                <div className="col-sm-4" style={{marginBottom:'20px'}}>
                    {data}
                </div>
            )
        })
        const kitchen = kitchens.map(data=>{
            return (
                <div className="col-sm-4" style={{marginBottom:'20px'}}>
                    {data}
                </div>
            )
        })

        let ownerView = (
            <div> 
            
            <div className="row" style={{marginTop:'20px'}}>
                <div className="col-sm-6">
                    <span><strong>Available From</strong></span>
                </div>
                <div className="col-sm-6">
                <span><strong>Available To</strong></span>
                </div>
                <div className="col-sm-6">
                    <span>{this.state.property.length>0 ? moment(this.state.property[0].availFrom).format('MM/DD/YYYY'):null}</span>
                </div>
                <div className="col-sm-6">
                <span>{this.state.property.length>0 ? moment(this.state.property[0].availTo).format('MM/DD/YYYY'):null}</span>
                </div>
            </div>  
            <div className="text-center" style={{marginTop:"60px",backgroundColor:"#f6f7f8"}}>
                <h5><i class="fas fa-bolt"></i> Instant Confirmation</h5>
                <div className="row">
                <div className="col-sm-offset-1  col-sm-4">
                <button className="btn btn-primary input-lg" style = {{marginTop:'20px',width:'140px', borderRadius:'5px'}} onClick={this.editProp}><i className="far fa-edit"></i>Edit Property</button>
                </div>
                <div className="col-sm-4 col-sm-offset-1">
                <button className="btn btn-primary input-lg" style = {{marginTop:'20px',width:'140px', borderRadius:'5px'}} onClick={this.delProp}><i className="far fa-trash-alt"></i>Delete Property</button>
                </div>
                </div>
                {/*<div className="question" style={{marginTop: '20px'}}>
                    <a href="#">Ask Manager a Question</a>
                </div>*/}
                <div className="assist text-center" style={{marginTop: '20px',marginBottom:"40px"}}>
                <span>For booking assistance, call <strong>999-001-9947</strong></span>
                <h5><strong>Property#</strong> {this.state.property.length>0?this.state.property[0].propid:null}</h5>
                </div>
            </div>
            </div>
        )

        let userView = (
            <div>
            <div className="available" style={{marginTop:"30px"}}>
            <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" className="trip-details-alert__icon--check" data-wdio="trip-details-alert__icon--check"><g id="-Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="date-picker" transform="translate(-16.000000, -76.000000)" fill="#21C44A"><g id="message"><g transform="translate(16.000000, 72.000000)"><g id="icon/icn-check-green" transform="translate(0.000000, 4.000000)"><g id="check-circle-08"><path d="M8,0 C3.6,0 0,3.6 0,8 C0,12.4 3.6,16 8,16 C12.4,16 16,12.4 16,8 C16,3.6 12.4,0 8,0 Z M12.4666667,5.8 L7.13333333,11.1333333 C7,11.2666667 6.86666667,11.3333333 6.66666667,11.3333333 C6.46666667,11.3333333 6.33333333,11.2666667 6.2,11.1333333 L3.53333333,8.46666667 C3.26666667,8.2 3.26666667,7.8 3.53333333,7.53333333 C3.8,7.26666667 4.2,7.26666667 4.46666667,7.53333333 L6.66666667,9.73333333 L11.5333333,4.86666667 C11.8,4.6 12.2,4.6 12.4666667,4.86666667 C12.7333333,5.13333333 12.7333333,5.53333333 12.4666667,5.8 Z" id="Shape" fill-rule="nonzero"></path></g></g></g></g></g></g></svg>
            <span>  Your dates are <strong>Available</strong></span> 
            </div> 
            <UserCartForm onSubmit={this.booking} property={this.state.property}/>
            <div className="text-center" style={{marginTop:"60px",backgroundColor:"#f6f7f8"}}>
                <h5><i class="fas fa-bolt"></i> Instant Confirmation</h5>
                <button className="btn btn-link btn-lg" data-toggle="modal" data-target="#myModal" style={{marginTop:'20px'}}>Ask Manager a Question</button>
                <div className="assist text-center" style={{marginTop: '20px',marginBottom:"40px"}}>
                <span>For booking assistance, call <strong>999-001-9947</strong></span>
                <h5><strong>Property#</strong> {this.state.property.length>0 ? this.state.property[0].propid :null}</h5>
                </div>
            </div>
            </div>
        )

        let orderView = (
            <div>
                <div style={{paddingBottom:'0px'}}></div>
            <div className="col-md-4 col-xs-3" style={{marginLeft:"30px", border:'1px solid grey'}}>
            <div className="pull-left">
                <h1><strong>${this.state.property.length>0 ?this.state.property[0].price:null}</strong></h1>
            </div>
            <div className="pull-left">
                <h5 className="text-right" style={{marginTop:'40px'}}>per night</h5>
            </div>
            <div className="clearfix"></div>
            <div className="rating rating-5" style={{marginTop:"20px"}}>
                    <span className="reviews"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> 2 Reviews</span>
            </div>
            {this.props.type ==="owner" ? ownerView: userView}
            
            </div>
            </div>
        )
        if(!this.state.isTop) {
            orderView = (
                <div>
                <div style={{paddingBottom:'645px'}}></div>
                <div style={{position: 'fixed', top: '0px', left: '640px', width: '410px'}}>
                <div className="col-md-12" style={{marginLeft:"30px", border:'1px solid grey'}}>
                <div className="pull-left">
                    <h1><strong>${this.state.property[0].price}</strong></h1>
                </div>
                <div className="pull-left">
                    <h5 className="text-right" style={{marginTop:'40px'}}>per night</h5>
                </div>
                <div className="clearfix"></div>
                <div className="rating rating-5" style={{marginTop:"20px"}}>
                        <span className="reviews"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> 2 Reviews</span>
                </div>
                {this.props.type ==="owner" ? ownerView: userView}
                </div>
                </div>
                </div>
                )
        }
        return(
            <div className="container-fluid">
            {this.props.type ==="user"?
            <SearchForm onSubmit={this.search}/>
            :null}
            <div className="col-md-6 col-xs-4">  
                {carousel}
                {(this.state.property.length>0) ?
                <div className="panel">
                    <h2><strong>{this.state.property[0].headline}</strong></h2>
                    <h4><i className="fas fa-map-marker-alt"/>  {this.state.property[0].location}</h4>
                    <div className='row' style={{marginTop:'40px'}}>
                    <div className="col-sm-2 text-center">
                        <span><i className="fas fa-home fa-2x"></i></span>
                        <span>{this.state.property[0].proptype}</span>
                    </div>
                    <div className="col-sm-2 text-center">
                        <span><i className="fas fa-bed fa-2x"></i></span>
                        <span>Bedrooms</span>
                        <h3>{this.state.property[0].noOfRooms}</h3>
                    </div>
                    <div className="col-sm-2 text-center">
                        <span><i className="fas fa-users fa-2x"></i></span>
                        <span>Sleeps</span>
                        <h3>{this.state.property[0].allowedGuest}</h3>
                    </div>
                    <div className="col-sm-2 text-center">
                        <span><i class="fas fa-bath fa-2x"></i></span>
                        <span>Bathrooms</span>
                        <h3>{this.state.property[0].noOfBath}</h3>
                    </div>
                    <div className="col-sm-3 text-center">
                        <span><i class="far fa-moon fa-2x"></i></span>
                        <h5>Min Stay</h5>
                        <h4>2-3 nights</h4>
                    </div>

                    <div className="col-sm-12" style={{marginTop:'40px'}}>
                        {this.state.property[0].amenities}
                    </div>

                    <div className="col-sm-12" style={{marginTop:'40px'}}>
                        <h2 style={{borderBottom: "1px solid grey", marginBottom:"20px"}}><strong>Bedrooms</strong></h2>
                        <div className="col-sm-2 text-center">
                            <span><i className="fas fa-bed fa-2x"></i></span>
                            <span>Bedrooms</span>
                            <h3>{this.state.property[0].noOfRooms}</h3>
                        </div>
                        <div className="col-sm-2 text-center">
                            <span><i className="fas fa-users fa-2x"></i></span>
                            <span>Sleeps</span>
                            <h3>{this.state.property[0].allowedGuest}</h3>
                        </div>
                    </div>
                    <div className="col-sm-12" style={{marginTop:'40px'}}>
                        <h2 style={{borderBottom: "1px solid grey", marginBottom:"20px"}}><strong>Amenities</strong></h2>
                        {amenity}
                    </div>

                    <div className="col-sm-12" style={{marginTop:'40px'}}>
                        <h2 style={{borderBottom: "1px solid grey", marginBottom:"20px"}}><strong>Bathrooms</strong></h2>
                        <div className="col-sm-2 text-center">
                            <span><i className="fas fa-bath fa-2x"></i></span>
                            <span>Bathrooms</span>
                            <h3>{this.state.property[0].noOfBath}</h3>
                        </div>
                    </div>
                    <div className="col-sm-12" style={{marginTop:'40px'}}>
                        <h2 style={{borderBottom: "1px solid grey", marginBottom:"20px"}}><strong>Kitchen</strong></h2>
                        {kitchen}
                    </div>
                    </div>
                    
                </div> :null}
            </div>    
                    {orderView}

            <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Ask Manager a Question</h4>
                        </div>
                        <div className='text-center text-success'>
                        {this.state.msg}
                        </div>
                        <div className='text-center text-danger'>
                        {this.state.errMsg}
                        </div>
                        <div className="modal-body">
                        <input type="textbox" className="form-control" rows="5" placeholder="Your message...(optional)" name = "description" id="description"/>
                        </div>
                        <div className="modal-footer">
                        <button onClick={this.send} className="btn btn-primary">Send Message</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div> 
        )
    }
}
/*PropertyPage.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired  
}

function mapStateToProps(state){
    return {login: state.login, property:state.property,arrayData:state.arrayData.arrayData,message:state.message.message}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PropertyPage);*/

export default compose(
    graphql(propertyByID, { name: "propertyByID" }),
)(PropertyPage);