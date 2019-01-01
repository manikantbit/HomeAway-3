import React from 'react';
import { Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';


//Validations
const required = value => (value || typeof value === '' ? undefined : 'Required');

const propEdit = (props)=>{
    console.log("prop",props)
    return (props !=undefined ? props.prop : [])
}

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

  const renderDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => (
    <div>
          <DatePicker {...input} className="datepicker3" dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null}   minDate={moment()} placeholderText={placeholder}/>
          <div className="text-danger">
            {touched &&
          ((error && <span>{error}</span>))}
        </div>
    </div>
  );
//Form
let PropForm = props => {
    const {handleSubmit,pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className='col-sm-6 form-group' style={{marginTop:'10px'}} >
                    <Field type="text" component= {renderField} className="form-control input-lg" placeholder ="Location" id="location" name="location" validate={[required]}/> 
                </div>
                <div className='col-sm-6 form-group' style={{marginTop:'10px'}}>
                    <Field type="text" component= "select" className="form-control input-lg" placeholder ="Property Type" id="ptype" name="proptype" validate={[required]}>
                    <option value='' selected disabled>Select Property Type</option>
                    <option value='House'>House</option>
                    <option value='Hotel'>Hotel</option>
                    <option value='Guest House'>Guest House</option>
                    <option value='Hostel'>Hostel</option>
                    </Field>
                </div>
                <div className="col-sm-8 form-group" style={{marginTop:'10px'}}>
                <Field type="text" component= {renderField} className="form-control input-lg" placeholder ="Headline" id="hline" name="headline" validate={[required]}/>
                </div>
                <div className="col-sm-12 form-group" style={{marginTop:'10px'}}>
                    <Field className="form-control" rows="5" component= "textarea" placeholder="Description" name = "amenities" id="amenities"></Field>
                </div>
                
                <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
                <Field type="number" component= {renderField} className="form-control input-lg" placeholder ="Bedrooms"  name="noOfRooms" validate={[required]}/>
                </div>
                <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
                <Field type="number" component= {renderField} className="form-control input-lg" placeholder ="Bathrooms" name="noOfBath" validate={[required]}/>
                </div>
                <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
                <Field type="number" component= {renderField} className="form-control input-lg" placeholder ="Accomodates" name="allowedGuest" validate={[required]}/>
                </div>
                <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
                <Field
                    name = "availFrom"
                    component={renderDatePicker}
                    dateFormat="MM/DD/YYYY"
                    placeholder="   From"
                    validate={[required]}
                />
                </div>
                <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
                <Field
                    name = "availTo"
                    component={renderDatePicker}
                    dateFormat="MM/DD/YYYY"
                    placeholder="   To"
                    validate={[required]}
                />
                </div>
                <div className="col-sm-5 form-group input-group" style={{marginTop:'20px',bottom:'-10px',paddingLeft:'20px'}}>
                <span className="input-group-addon"><i class="fas fa-dollar-sign"></i></span>
                <Field type="number" component= {renderField} className="form-control input-lg" placeholder ="Price per night" name="price" validate={[required]}/>
                </div>
                <div className='col-lg-8'>
                <button type="submit" disabled={pristine || submitting} className="btn btn-primary col-sm-offset-1 col-lg-4 input-lg" style={{marginTop:'10px',paddingLeft:'30px'}}>Continue</button>  
                </div>
        </form>
    )
}

PropForm = reduxForm({
    // a unique name for the form
    form: 'propform',
    //initialValues: propEdit,    
})(PropForm)

export default PropForm;



