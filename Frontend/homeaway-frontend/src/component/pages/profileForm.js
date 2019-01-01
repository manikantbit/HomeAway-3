import React from 'react';
import { Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';

const fields = ['first_name','last_name','about','city','hometown','company','school','languages','gender','phone']
let ProfileForm = props => {
    console.log(props);
    let post = props.data!==null ?props.dispatch({payload:props, type: "FETCH_LOGIN"}):null;   
    const {handleSubmit,pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
        <div className="col-sm-8 login-form" style={{border:'1px solid grey',margin:'20px',padding:'20px'}}>
        <h2>Profile Information</h2>
        <div className='col-sm-6 form-group'style={{marginTop:'10px'}} >
            <Field type="text" component="input" className="form-control input-lg" placeholder ="First Name" id="fname" name="first_name"/> 
        </div>
        <div className='col-sm-6 form-group' style={{marginTop:'10px'}}>
        <Field type="text" component="input" className="form-control input-lg" placeholder ="Last Name" id="lname" name="last_name" />
        </div>
        <div className="col-sm-12 form-group" style={{marginTop:'10px'}}>
        <Field className="form-control" component="textarea" rows="5" placeHolder="About me" name = "about" id="about1" />
        </div>
        <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
        <Field type="text" className="form-control input-lg"  component="input" placeholder ="My city, country" id="city" name="city"/>
        </div>
        <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
        <Field type="text" className="form-control input-lg" component="input" placeholder ="Company"  name="company"/>
        </div>
        <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
        <Field type="text" className="form-control input-lg" component="input" placeholder ="School" name="school"/>
        </div>
        <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
        <Field type="text" className="form-control input-lg" component="input" placeholder ="Hometown" name="hometown" />
        </div>
        <div className="col-sm-8 form-group" style={{marginTop:'10px'}}>
        <Field type="text" className="form-control input-lg" component="input" placeholder ="Languages" name="languages" />
        </div>
        <div className="col-sm-8 form-group">
        <Field className="form-control input-lg" component="select" placeholder="Gender" name="gender" > 
        <option value='' selected disabled>Select Gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
        </Field> 
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
        <Field type="number" className="form-control input-lg" component="input" placeholder ="Phone No" name="phone" />
        </div>
        </div>
        <button type="submit" disabled={pristine || submitting} className="btn btn-primary col-sm-offset-1 col-lg-4 input-lg" style={{marginTop:'10px',paddingLeft:'30px'}}>Save Changes</button>
        </form>
    )
}

ProfileForm = reduxForm({
    // a unique name for the form
    form: 'profile',
    // initialValues: data,     
})(ProfileForm)

ProfileForm = connect(
    state => ({
      initialValues: state.login,
         // pull initial values from account reducer
    }),
  )(ProfileForm);

function mapStateToProps(state){
    return {login: state.login}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,{})(ProfileForm);
