import React from 'react';
import { Field,reduxForm,formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const required = value => (value || typeof value === '' ? undefined : 'Required');

function toDate(dateStr) {
    const [month,day, year] = dateStr.split("/")
    console.log(month,day,year)
    return new Date(year, month, day)
  }

const totals=(availFromValue,availToValue,props)=>{
    let nights = 0;
    if(typeof availToValue ==="object"){
        availToValue = moment(availToValue).format('MM/DD/YYYY')
    }
    if(typeof availFromValue ==="object"){
        availFromValue = moment(availFromValue).format('MM/DD/YYYY')
    }
    var endDate = availToValue!=undefined ? toDate(availToValue):null;
    var startDate = availFromValue!=undefined ? toDate(availFromValue) :null;
    
    if(startDate!=null && endDate !=null){
        nights = (endDate.getTime()-startDate.getTime())/(1000*3600*24);
    }
    //console.log(nights)
    if (nights>0){
        return parseFloat(props.property!=undefined ? props.property.price:0) * nights
    }
    return 0
}
const nights=(availFromValue,availToValue)=>{
    let nights = 0;
    if(typeof availToValue ==="object"){
        availToValue = moment(availToValue).format('MM/DD/YYYY')
    }
    if(typeof availFromValue ==="object"){
        availFromValue = moment(availFromValue).format('MM/DD/YYYY')
    }
    var endDate = availToValue!=undefined ? toDate(availToValue):null;
    var startDate = availFromValue!=undefined ? toDate(availFromValue) :null;
    
    if(startDate!=null && endDate !=null){
        nights = (endDate.getTime()-startDate.getTime())/(1000*3600*24);
    } 
    console.log(startDate,endDate,typeof nights)
    if(nights >0) {
        return nights
    }
    return 0
}
const renderField = ({
    input,
    type,
    placeholder,
    value,
    meta: { touched, error, warning }
  }) => (
    <div>   
      <div>
        <input {...input} className="form-control input-lg" type={type} placeholder={placeholder} value={value}/>
      </div>
      <div className="text-danger">
      {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
        </div>
    </div>
  )

const renderDatePicker = ({input, placeholder, defaultValue,props, meta: {touched, error} }) => (
    <div>
          <DatePicker {...input} className="datepicker2" dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null}   minDate={moment()} placeholderText={placeholder}/>
          <div className="text-danger">
            {touched &&
          ((error && <span>{error}</span>))}
        </div>
    </div>
  );

  const renderDatePicker1 = ({input, placeholder, defaultValue,props, meta: {touched, error} }) => (
    <div>
          <DatePicker {...input} className="datepicker2" dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null}   minDate={moment(moment(document.querySelector("input[name=availFrom]")!==null ? document.querySelector("input[name=availFrom]").value:Date.now).add(1,"days"))} placeholderText={placeholder}/>
          <div className="text-danger">
            {touched &&
          ((error && <span>{error}</span>))}
        </div>
    </div>
  );
//Form
let OrderForm = props => {
    const {availFromValue,availToValue,allowedGuestValue,nightsValue,handleSubmit,pristine, reset, submitting } = props;
    console.log(nightsValue)
    return (
        <div>
         <div className="col-sm-12" style={{marginTop:"30px",marginBottom:"30px"}}>
        <form onSubmit={handleSubmit}>
                <table style={{width:'100%'}}>
                    <tbody>
                    <tr>
                        <td colSpan='3'>
                        <label for="check-in-date" className="control-label">
                            Arrive
                        </label>
                        <div className="input-group">
                        <Field
                            name = "availFrom"
                            component={renderDatePicker}
                            dateFormat="MM/DD/YYYY"
                            placeholder="   From"
                            validate={[required]}
                        />
                        </div>
                        </td>
                        <td>
                        <label for="check-out-date" className="control-label">
                            Depart
                        </label>
                        <Field
                            name = "availTo"
                            component={renderDatePicker1}
                            dateFormat="MM/DD/YYYY"
                            placeholder="   To"
                            validate={[required]}
                        />
                        </td>
                        {/*<i className="icon-calendar gt-clickable form-control-feedback no-margin input-lg"></i> */}
                        <td>
                        <label for="nights" className="control-label">
                            Nights
                        </label>
                        <input type="text" name="nights" component="input" className="form-control input-lg" readonly="" value={nightsValue}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6">
                        
                        <label className="control-label">
                            Guests
                        </label>
                        
                            <Field type="number" name="allowedGuest" component= "input" className="form-control input-lg" tabIndex="0"/>
                            
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
            </div>
            <div className = "col-sm-12 price" style={{marginBottom:"40px"}}>
                        <h4><span> $ {props.property!=undefined?props.property.price:""} X {nights(availFromValue,availToValue)} nights</span><span className="pull-right" name="total">$ {totals(availFromValue,availToValue,props)}</span></h4>
                        <div style={{borderTop:"1px dotted grey",borderBottom:"1px dotted grey"}}>
                        <h4><span><strong>Total:</strong></span><span className="pull-right"><strong>$ {totals(availFromValue,availToValue,props)}</strong></span></h4>
                        </div>
            </div>
            </div>
    )
}

OrderForm = reduxForm({
    // a unique name for the form
    form: 'orderform',
    // initialValues: data,     
})(OrderForm)

const selector = formValueSelector('orderform') // <-- same as form name
OrderForm = connect(
      state => ({
        initialValues: state.form.usercart !=undefined ? state.form.usercart.values: null,       // pull initial values from account reducer
      }),
    )(OrderForm);
OrderForm = connect(state => {
        const availFromValue = selector(state, 'availFrom')
        const availToValue = selector(state, 'availTo')
        const allowedGuestValue = selector(state,'allowedGuest')
        let nightsValue = nights(availFromValue,availToValue)
        console.log(nightsValue)
        return {
            availFromValue,
            availToValue,
            allowedGuestValue,
            nightsValue
    }
      /*availFromValue: selector(state, 'availFrom'),
      availToValue : selector(state, 'availTo'),
      allowedGuestValue :selector(state,'allowedGuest'),
      nightsValue : selector(state,'nights')
      //nights(selector(state, 'availFrom'),selector(state, 'availTo'))*/
    }
  )(OrderForm)  

function mapStateToProps(state){
    return {login: state.login}
}

export default connect(mapStateToProps,{})(OrderForm);