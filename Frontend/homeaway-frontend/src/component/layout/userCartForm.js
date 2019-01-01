import React from 'react';
import { Field,reduxForm, getFormValues,formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
//import {actionCreators} from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';



const required = value => (value || typeof value === '' ? undefined : 'Required');

function toDate(dateStr) {
    const [month,day, year] = dateStr.split("/")
    console.log(month,day,year)
    return new Date(year, month, day)
  }


const total=(availFromValue,availToValue,props)=>{
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
    console.log(nights)
    if (nights>0){
        return parseFloat(props.property.length>0 ? props.property[0].price:0) * nights
    }
    return 0
}

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
const renderDatePicker1 = ({input, placeholder,props, meta: {touched, error} }) => (
    <div>
          <DatePicker {...input} className="datepicker2" dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null}   minDate={(moment(document.querySelector("input[name=availFrom]")!==null ? document.querySelector("input[name=availFrom]").value:Date.now).add(1,"days"))} placeholderText={placeholder}/>
          <div className="text-danger">
            {touched &&
          ((error && <span>{error}</span>))}
        </div>
    </div>
);

const message= (
    <div className="question" style={{marginTop: '20px'}}>
        <h4>Please type your message below</h4>
            <input type="textbox"  rows="5" placeholder="Your message...(optional)" name = "description" id="description"/>
            <button className="btn btn-primary-info" onClick={send()}>Send Message</button>
    </div>
)

function send(){
    console.log("send called")
}

let UserCartForm = props => {
    const {availFromValue,availToValue,handleSubmit,pristine, reset, submitting } = props;
    let m = false
    return (
        <form onSubmit={handleSubmit} className="search col-sm-12" action='' style={{marginTop:'25px'}}>
                <div className="row" style={{marginTop:'20px'}}>
                <div className="col-sm-6">
                <div className="input-group">
                <Field
                    name = "availFrom"
                    component={renderDatePicker}
                    dateFormat="MM/DD/YYYY"
                    placeholder="   From"
                    validate={[required]}
                />
                </div>
                </div>
                <div className="col-sm-6">
                <Field 
                    name = "availTo"
                    component={renderDatePicker1}
                    dateFormat="MM/DD/YYYY"
                    placeholder="   To"
                    validate={[required]}  
                />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12"> 
                <Field type="number" component={renderField} className="form-control input-lg" name="allowedGuest" placeholder= "Guest" id="guest" validate={[required]}/>
                </div>
            </div> 
            <div className ="row" style={{marginTop: '20px'}}>
                <div className="pull-left" style={{paddingLeft:'20px'}}>
                <h4>Total</h4>
                </div>
                <div className="pull-right" style={{paddingRight:'20px'}}>
                <h4>${total(availFromValue,availToValue,props)}</h4>
                </div>
                <div className="clearfix"></div>
             </div> 
                <span className="pull-left"> Includes taxes and fees</span>
                <span className="pull-right"><a href="#">View Details</a></span>
                <div className="text-center">
                <button className="btn btn-primary input-lg" type="submit" style = {{marginTop:'20px',width:'240px', borderRadius:'5px'}}>Book Now</button>
                </div>
            </form>
            
        )
    }
UserCartForm = reduxForm({
    // a unique name for the form
    form: 'usercart',
    fields,
    destroyOnUnmount: false,    
})(UserCartForm)

const selector = formValueSelector('usercart') // <-- same as form name
UserCartForm = connect(
    state => ({
      initialValues: state.form.searchform !=undefined ? state.form.searchform.values: null, // pull initial values from account reducer
    }),
  )(UserCartForm);
UserCartForm = connect(state => {
    const availFromValue = selector(state, 'availFrom')
    const availToValue = selector(state, 'availTo')
    const allowedGuestValue = selector(state,'allowedGuest')
    return {
        availFromValue,
        availToValue,
        allowedGuestValue
    }
})(UserCartForm)

function mapStateToProps(state){
    return {login: state.login,arrayData:state.arrayData.arrayData}
}

export default connect(mapStateToProps,{})(UserCartForm);