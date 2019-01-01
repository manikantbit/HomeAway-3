import {POST_PROP,UPDATE_PROP,FETCH_PROP_ERROR, LOGOUT} from '../actions/types';

const initialState = {
    propid:'',
    location: '',
    proptype: '',
    headline: '',
    noOfRooms: '',
    noOfBath: '',
    allowedGuest: '',
    image: '',
    price: 0.00,
    amenities: '',
    availFrom: '',
    availTo:'',
    image1:'',
    image2:'',
    image3:'',
    image4:'',
    error:[]
}

export default function(state= initialState, action){
    switch(action.type){
        case POST_PROP:
        return {
            ...state,
            propid:action.payload.data.propid,
            location: action.payload.data.location,
            proptype: action.payload.data.proptype,
            headline: action.payload.data.headline,
            noOfRooms: action.payload.data.noOfRooms,
            noOfBath: action.payload.data.noOfBath,
            allowedGuest: action.payload.data.allowedGuest,
            image: action.payload.data.image,
            price: action.payload.data.price,
            amenities: action.payload.data.amenities,
            availFrom: action.payload.data.availFrom,
            availTo:action.payload.data.availTo,
            image1:action.payload.data.image1,
            image2:action.payload.data.image2,
            image3:action.payload.data.image3,
            image4:action.payload.data.image4,
            status:action.payload.status
        }
        case UPDATE_PROP:
        return {
            ...state,
            propid:action.payload.data.propid,
            location: action.payload.data.location,
            proptype: action.payload.data.proptype,
            headline: action.payload.data.headline,
            noOfRooms: action.payload.data.noOfRooms,
            noOfBath: action.payload.data.noOfBath,
            allowedGuest: action.payload.data.allowedGuest,
            image: action.payload.data.image,
            price: action.payload.data.price,
            amenities: action.payload.data.amenities,
            availFrom: action.payload.data.availFrom,
            availTo:action.payload.data.availTo,
            image1:action.payload.data.image1,
            image2:action.payload.data.image2,
            image3:action.payload.data.image3,
            image4:action.payload.data.image4,
            status_update:action.payload.status
        }
        case LOGOUT:
            return {
                propid:'',
                location: '',
                proptype: '',
                headline: '',
                noOfRooms: '',
                noOfBath: '',
                allowedGuest: '',
                image: '',
                price: 0.00,
                amenities: '',
                availFrom: '',
                availTo:'',
                image1:'',
                image2:'',
                image3:'',
                image4:'',
                status: '',
                error:[] 
            }
        case FETCH_PROP_ERROR:
            return {
                ...state,
                error:action.payload,
                status:action.payload.status
            }
        default:
            return state
    }
}