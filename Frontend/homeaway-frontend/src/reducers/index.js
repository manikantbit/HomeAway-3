import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import { reducer as formReducer } from 'redux-form'
import propertyReducer from './propertyReducer';
import getPropReducer from './getPropReducer';
import orderReducer from './orderReducer';
import getTrips from './getTrips';
import getMessage from './getMessage';
import {LOGOUT} from '../../src/actions/types';

export default combineReducers({
    login: loginReducer,
    form: formReducer,
    property:propertyReducer,
    arrayData:getPropReducer,
    orderData:orderReducer,
    bookData:getTrips,
    message: getMessage
})


