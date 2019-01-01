import React from 'react';
import { Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';

//const fields = ['email','password']

//Validations
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
const required = value => (value || typeof value === '' ? undefined : 'Required');

const renderField = ({
    input,
    label,
    type,
    placeholder,
    meta: { touched, error, warning }
  }) => (
    <div>   
      <div>
        <input {...input} className="form-control input-lg" type={type} placeholder={placeholder}/>
      </div>
      <div className="text-danger">
      {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
        </div>
    </div>
  )
//Form
let BookForm = props => {
    const {handleSubmit,pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className='col-sm-6 form-group'style={{marginTop:'10px'}} >
                    <Field type="text" component={renderField} placeholder ="First Name" id="fname" name="first_name" validate={[required]}/> 
                </div>
                <div className='col-sm-6 form-group' style={{marginTop:'10px'}}>
                    <Field type="text" component={renderField} placeholder ="Last Name" id="lname" name="last_name" validate={[required]}/>
                </div>
                <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
                    <Field type="text" component={renderField} placeholder ="Phone" id="phone" name="phone" validate={[required]}/>
                </div>
                <div className="col-sm-12 text">
                    <h4><strong>Send the Owner a message</strong></h4>
                    <i className="fas fa-check" style={{color:'#21c44a'}}></i><span> What brings you to the area? </span>
                    <i className="fas fa-check" style={{color:'#21c44a'}}></i><span> Who are you travelling with? </span>
                </div>
                <div className="col-sm-12 form-group" style={{marginTop:'10px'}}>
                    <Field className="form-control" rows="5" component="textarea" placeholder="Your message...(optional)" name = "description" id="description"></Field>
                </div>
                <div className="col-sm-12">
                <h4>By clicking 'Book Now' you are agreeing to our <a href='#'>Terms and Conditions</a>,</h4>
                <h4> <a href='#'>Privacy Policy</a>, and to receive booking-related texts. Standard messaging</h4>
                <h4> rates may apply.</h4> 
                </div>
                <div className="col-sm-offset-7 col-sm-5 pull-right" style={{marginBottom:"40px",marginLeft:"20px"}}>
                <button type="submit" className="btn btn-primary allow-wrap btn-panel pull-right btn-lg btn-rounded">Book Now</button>
                </div>
        </form>
    )
}

BookForm = reduxForm({
    // a unique name for the form
    form: 'bookform',
    // initialValues: data,     
})(BookForm)

BookForm = connect(
    state => ({
      initialValues: state.login, // pull initial values from account reducer
    }),
  )(BookForm);

function mapStateToProps(state){
    return {login: state.login}
}

export default connect(mapStateToProps,{})(BookForm);