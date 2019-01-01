import React from 'react';
import { Field,reduxForm,formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const required = value => (value || typeof value === '' ? undefined : 'Required');

const fields = ['location','availFrom','availTo','allowedGuest']
const renderField = ({
    input,
    type,
    placeholder,
    meta: { touched, error, warning }
  }) => (
    <div>   
      <div>
        <input {...input} className="chgBorder form-control input-lg" type={type} placeholder={placeholder}/>
      </div>
      <div className="bg-danger text-danger">
      {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
        </div>
    </div>
  )
const renderDatePicker = ({input, placeholder, availFromValue,availToValue, meta: {touched, error} }) => (
    <div>
          <DatePicker {...input} className="datepicker"
                    dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null}   minDate={moment()} placeholderText={placeholder}/>
          <div className="bg-danger text-danger">
            {touched &&
          ((error && <span>{error}</span>))}
        </div>
    </div>
  );
  const renderDatePicker1 = ({input, placeholder, availFromValue, meta: {touched, error} }) => (
    <div>
          <DatePicker {...input} className="datepicker" 
          dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null}   minDate={moment(document.querySelector("input[name=availFrom]")!==null ? document.querySelector("input[name=availFrom]").value:Date.now).add(1,"days")} placeholderText={placeholder}/>
          <div className="bg-danger text-danger">
            {touched &&
          ((error && <span>{error}</span>))}
        </div>
    </div>
  );

let SearchForm = props => {
    const {availFromValue,availToValue,handleSubmit,pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit} className="search col-sm-offset-1 col-sm-10 col-sm-offset-1" action='' style={{marginTop:'25px'}}>
                <div className="form-group row">
                <div className="col-sm-4">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fas fa-map-marker-alt"/>  </span>
                    <Field type="text" component={renderField} className="form-control input-lg" name ="location" placeholder="Where do you want to go?" id="place" validate={[required]}/>  
                </div>
                </div>
                <div className="col-sm-2">
                <div className="input-group">
                <span className="input-group-addon"><i className="fas fa-calendar-alt"></i></span>
                <Field
                    name = "availFrom"
                    component={renderDatePicker}
                    dateFormat="MM/DD/YYYY"
                    placeholder="   From"
                    validate={[required]}  
                />
                </div>
                </div>
                <div className="col-sm-2">
                <div className="input-group">
                <span className="input-group-addon"><i className="fas fa-calendar-alt"></i></span>
                <Field 
                    name = "availTo"
                    component={renderDatePicker1}
                    dateFormat="MM/DD/YYYY"
                    placeholder="   To"
                    validate={[required]}  
                    />
                </div>
                </div>
                <div className="col-sm-2">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fas fa-user-friends"></i></span>
                    <Field type="number" component={renderField} className="form-control input-lg" name="allowedGuest" placeholder= "Guest" id="guest" validate={[required]}/>
                </div>
                </div>
                
                <div className="col-sm-2">
                <button type="submit" className="btn btn-primary input-lg col-sm-12" style={{borderRadius: '100px'}}>Submit</button>
                </div>  
                </div>
            </form>
            
        )
    }

SearchForm = reduxForm({
    // a unique name for the form
    form: 'searchform',
    fields,
    destroyOnUnmount: false,
    //initialValues: data,     
})(SearchForm)

const selector = formValueSelector('searchform')
SearchForm = connect(
    state => {
      const availFromValue = selector(state,'availFrom')
      const availToValue = selector(state,'availTo')
      return {
          availFromValue,
          availToValue
    }
    },
)(SearchForm);

function mapStateToProps(state){
    return {login: state.login}
}

export default connect(mapStateToProps,{})(SearchForm);