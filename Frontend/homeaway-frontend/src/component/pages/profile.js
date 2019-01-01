import React,{Component} from 'react';
import Navbar from '../layout/navbar';
import {graphql,compose} from 'react-apollo';
import {Redirect} from 'react-router';
import axios from 'axios';
import Footer from '../layout/footer';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import ProfileForm from './profileForm';
import {users} from '../queries/query';
import {postProfile} from '../mutation/mutation'
import {formHandle} from './utility';


class Profile extends Component {
    state={
        user:null,
        changeMsg:null
    }
    async componentDidMount(){
        let values = localStorage.getItem("email");
        this.props.users.variables["email"]=values;
        let {data,error} = await this.props.users.refetch();
        console.log(data.users[0])
        if(data){
            this.setState({user:data.users[0]})
        }

    }
    
    updateUser=async(values) =>{
        console.log(values)
        values["email"] = this.props.users.variables.email;
        console.log(this.props.users.variables.email)
        let {data,error,loading} = await this.props.postProfile({
            variables:values
        });
        console.log(data)
        debugger;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
        if(data){
            this.setState({user:data.postProfile[0],changeMsg:"Your profile is updated successfully"})
        }
        localStorage.setItem("first_name",data.postProfile[0].first_name);
        localStorage.setItem("last_name",data.postProfile[0].last_name);
    }

    changeHandler=(e)=>{
        let formData = new FormData();
        formData.append('profile_image', e.target.files[0])
        formData.append('email',this.props.login.email)
        console.log(formData);
        this.props.postAvatar(formData);
    }
    openDialog =() =>{
        document.getElementById('fileid').click();
     }
    selecter = () => {
        document.getElementById('js-edit-photo').addEventListener('click',this.openDialog);
    }   
    render(){
        let redirectVar = null;
        /*if(this.props.login.token === ""){
            console.log("redirect")
            redirectVar = <Redirect to= "/"/>
        }*/
        /*if(this.props.login.status_profile ==="success"){
            changeMsg="Profile has been updated successfully"
        } 
        if(this.props.login.status_image ==="success"){
            changeMsg="Profile Image has been updated successfully"
        }*/
        return (
            <div className ="container-fluid">
            {redirectVar}
            <Navbar logoFlag={true} navBlue={true}/>
            <ul className="nav nav-pills" style = {{borderBottom:'1px solid #dfdfdf',marginBottom:'40px'}}>
                <li><Link to="/inbox">Inbox</Link></li>
                <li><Link to="/mytrip">My trips</Link></li>
                <li className='tab'><Link to="/profile">Profile</Link></li>
                <li><Link to="#">Account</Link></li>
            </ul>
            {this.state.changeMsg!=null?
            <div className="alert alert-success fade in">
        			<a href="#" className="close" data-dismiss="alert"></a>
        			{this.state.changeMsg}
    		</div>:null}
            <div className="text-center">
                <form id='formid' action="" method="POST" enctype="multipart/form-data"> 
                 <img src={(this.state.user && this.state.user.profile_image!=='') ? "images/"+this.state.user.profile_image:'https://odis.homeaway.com/mda01/7f257b13-2434-404e-b967-285a6b7eca02.2.2'} className="avatar img-circle img-thumbnail" alt="avatar" style={{width:'100px',height:'100px'}}/>
                 <input id='fileid' type='file' name='profile_image' onChange={this.changeHandler} hidden ={true} style={{display:'none'}}/>
                 <button id="js-edit-photo" onClick={this.selecter} className="btn btn-default btn-profile" title="Add photo" type="button">
                 <i className="fas fa-pencil-alt"></i>
                </button> 
                </form>
                    <h2>{this.state.user ?this.state.user.first_name:null} {this.state.user?this.state.user.last_name:null}</h2>
                    <h5>Member since 2018</h5>
            </div> 
        {/*this.state.user!==null ? 
        (<form ref={(f) => {this.form = f;} }>
        <div className="col-sm-8 login-form" style={{border:'1px solid grey',margin:'20px',padding:'20px'}}>
        <h2>Profile Information</h2>
       
        <div className='col-sm-6 form-group'style={{marginTop:'10px'}} >
            <input type="text" className="form-control input-lg" placeholder ="First Name" id="fname" name="first_name" defaultValue={this.state.user.first_name}/> 
        </div>
        <div className='col-sm-6 form-group' style={{marginTop:'10px'}}>
        <input type="text" className="form-control input-lg" placeholder ="Last Name" id="lname" name="last_name" defaultValue={this.state.user.last_name}/>
        </div>
        <div className="col-sm-12 form-group" style={{marginTop:'10px'}}>
        <input className="form-control" component="textarea" rows="5" placeHolder="About me" name = "about" id="about1" defaultValue={this.state.user.about}/>
        </div>
        <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
        <input type="text" className="form-control input-lg"  placeholder ="My city, country" id="city" name="city" defaultValue={this.state.user.city}/>
        </div>
        <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
        <input type="text" className="form-control input-lg" placeholder ="Company"  name="company" defaultValue={this.state.user.company}/>
        </div>
        <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
        <input type="text" className="form-control input-lg" placeholder ="School" name="school" defaultValue={this.state.user.school}/>
        </div>
        <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
        <input type="text" className="form-control input-lg" placeholder ="Hometown" name="hometown" defaultValue={this.state.user.hometown}/>
        </div>
        <div className="col-sm-8 form-group" style={{marginTop:'10px'}}>
        <input type="text" className="form-control input-lg" placeholder ="Languages" name="languages" defaultValue={this.state.user.languages} />
        </div>
        <div className="col-sm-8 form-group">
        <select className="form-control input-lg" placeholder="Gender" name="gender" defaultValue={this.state.user.gender}> 
        <option value='' selected disabled>Select Gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
        </select> 
        </div>
        <div className="col-sm-8">
                <h5><i className="fas fa-lock"></i> This is never shared</h5>
                </div>
                <div className="col-md-10">
                <div className="col-md-2">
                <label className="switch">
                    <input type="checkbox" checked/>
                    <span className="slider round"></span>
                </label>
                </div>
                <div className="col-md-7">
                    <span>Send me texts about my bookings.</span>
                    <span className="sms-pref-info">Only available for mobile phones in select countries. Standard messaging rates apply. See 
                    <a href="#"> terms and conditions</a> and <a href="#"> privacy policy.</a></span>
                </div>
                </div>
        <div className="col-sm-8 form-group" style={{marginTop:'10px'}}> 
        <input type="number" className="form-control input-lg" placeholder ="Phone No" name="phone" defaultValue={this.state.user.phone}/>
        </div>
        </div>
        <button onClick={this.updateUser} className="btn btn-primary col-sm-offset-1 col-lg-4 input-lg" style={{marginTop:'10px',paddingLeft:'30px'}}>Save Changes</button>
        </form>):null*/}       
            <ProfileForm onSubmit={this.updateUser} data={this.state.user}/>
            <div style = {{margin:'100px',paddingTop:'50px'}}>
                <Footer/> 
                </div>

        </div>

        )
    }
}

/*Profile.propTypes = {
    login: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
    postProfile: PropTypes.func.isRequired,
    postAvatar: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {login: state.login}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);*/

export default compose(
    graphql(users, { name: "users" }),
    graphql(postProfile, { name: "postProfile" })
)(Profile);