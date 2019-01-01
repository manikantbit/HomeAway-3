import React from 'react';
import { Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';

const fields = ['email','password']

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
let LoginForm = props => {
    const {handleSubmit,pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <Field type="email" component={renderField} name = "email" className="form-control input-lg" placeholder ="Email address" validate={[required, email]}/>
            </div>
            <div className="form-group">
            <Field type="password" component={renderField} className="form-control input-lg" name= "password" placeholder ="Password" validate={[required]}/>
            </div>
            <div className="form-group">
            <a href="#" id="forgotPasswordUrl" className="forgot-password">Forgot password?</a>
            </div> 
            <button type="submit" disabled={submitting} className="btn btn-warning col-sm-12 input-lg">Log In</button>
        </form>
    )
}

LoginForm = reduxForm({
    // a unique name for the form
    form: 'loginform',
    // initialValues: data,     
})(LoginForm)

export default LoginForm;