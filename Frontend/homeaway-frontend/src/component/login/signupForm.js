import React from 'react';
import { Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';

const fields = ['first_name','last_name','email','password']

//Validations
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
const required = value => (value || typeof value === '' ? undefined : 'Required');

const renderField = ({
    input,
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
let SignupForm = props => {
    const {handleSubmit,pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group row">
                <div className='col-xs-6'>
                    <Field type="text" component={renderField} className="form-control input-lg" placeholder ="First Name" id="fname" name="first_name" validate={[required]}/> 
                </div>
                <div className='col-xs-6'>
                    <Field type="text" component={renderField} className="form-control input-lg" placeholder ="Last Name" id="lname" name="last_name" validate={[required]}/>
                </div>
                </div>
                <div className="form-group">
                <Field type="email" component={renderField} className="form-control input-lg" placeholder ="Email address" id="email" name="email" validate={[required, email]}/>
                </div>
                <div className="form-group">
                <Field type="password" component={renderField} className="form-control input-lg" placeholder ="Password" id="pwd" name="password" validate={[required]}/>
                </div>
                <button type="submit" className="btn btn-warning col-sm-offset-2 col-sm-8 input-lg">Sign Me Up</button>
        </form>
    )
}

SignupForm = reduxForm({
    // a unique name for the form
    form: 'signupform',
    // initialValues: data,     
})(SignupForm)

export default SignupForm;


