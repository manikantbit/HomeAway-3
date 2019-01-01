import axios from 'axios';
import {nodeURL} from '../component/config';

var type = require('./types');

export const fetchLogin = (data) => {

    return {
        type : 'FETCH_LOGIN',
        payload : data
    }
}

export const sessionAction = (data) => {

    return {
        type : 'SESSION',
        user : data
    }
} 

/*export const fetchSignup = (data) => {

    return {
        type : 'FETCH_LOGIN',
        payload : data
    }
}
/*export const fetchSignup = (data) => dispatch => {
    axios.post(`/signup`,data)
    .then(loginDetails => {
        dispatch({
            type:type.FETCH_LOGIN,
            payload: loginDetails
        })
    }
,error => {
    dispatch({
        type:type.FETCH_LOGIN_ERROR,
        payload: error.toString()
    })
}
    )}*/
export const logout= (data) => dispatch => {
    axios.post(`/logout`,data)
    .then(loginDetails => {
        dispatch({
            type:type.LOGOUT
        })
    })
}
/*export const getProfile = (data) => dispatch => {
    axios.get(`/getprofile`,{params:data})
    .then(loginDetails=>{

        console.log(loginDetails);

        dispatch({
            type:type.GET_PROFILE,
            payload: loginDetails
        })
    })
    ,error => {
        dispatch({
            type:type.FETCH_LOGIN_ERROR,
            payload: error.toString()
        })
    }
}

export const postProfile = (data) => dispatch => {
    axios.post(`/profile`, data)
    .then(loginDetails=>{
        dispatch({
            type:type.POST_PROFILE,
            payload: loginDetails
        })
    })
    ,error => {
        dispatch({
            type:type.FETCH_LOGIN_ERROR,
            payload: error.toString()
        })
    }
}
export const postAvatar = (data) => dispatch => {
    axios.post(`/avatar`, data)
    .then(loginDetails=>{
        dispatch({
            type:type.AVATAR,
            payload: loginDetails
        })
    })
    ,error => {
        dispatch({
            type:type.FETCH_LOGIN_ERROR,
            payload: error.toString()
        })
    }
}

//Property

export const getPropByUser = (data) => {

    return {
        type: type.FETCH_PROP,
        payload : data
    }
} 
export const postProperty = (data) => dispatch => {
    axios.post(`/property`, data)
    .then(propDetails=>{
        dispatch({
            type:type.POST_PROP,
            payload: propDetails
        })
    })
    ,error => {
        dispatch({
            type:type.FETCH_PROP_ERROR,
            payload: error.toString()
        })
    }
}

export const updateProp = (data) => dispatch => {
    axios.put(`/property`, data)
    .then(propDetails=>{
        dispatch({
            type:type.UPDATE_PROP,
            payload: propDetails
        })
    })
    ,error => {
        dispatch({
            type:type.FETCH_PROP_ERROR,
            payload: error.toString()
        })
    }
}

export const searchProp = (data) => {

    return {
        type: type.FETCH_PROP,
        payload : data
    }
} 

export const bookOrder = (data) => {

    return {
        type: type.POST_ORDER,
        payload : data
    }
}

export const myTrip = (data) => {

    return {
        type: type.GET_ORDER,
        payload : data
    }
} 

export const sendMessage=(data)  => dispatch => {
    axios.post(`/message`, data)
    .then(myBooking=>{
        dispatch({
            type:type.POST_MESSAGE,
            payload: myBooking
        })
    })
    ,error => {
        dispatch({
            type:type.FETCH_MSG_ERROR,
            payload: error.toString()
        })
    }
}

export const getMessage = (data) => {

    return {
        type: type.GET_MESSAGE,
        payload : data
    }
} */


