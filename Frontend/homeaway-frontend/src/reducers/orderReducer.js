import {POST_ORDER,FETCH_ORDER_ERROR,LOGOUT} from '../actions/types';

const initialState = {
    bookid:'',
    email:'',
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
    bookedFrom: '',
    bookedTo:'',
    image1:'',
    image2:'',
    image3:'',
    image4:'',
    nights:'',
    error:[]
}

export default function(state= initialState, action){
    switch(action.type){
        case POST_ORDER:
        return {
            ...state,
            bookid: action.payload.data.bookid,
            email: action.payload.data.email,
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
            bookedFrom: action.payload.data.bookedFrom,
            bookedTo:action.payload.data.bookedTo,
            image1:action.payload.data.image1,
            image2:action.payload.data.image2,
            image3:action.payload.data.image3,
            image4:action.payload.data.image4,
            nights:action.payload.data.nights,
            status: action.payload.status
        }
        case FETCH_ORDER_ERROR:
            return {
                ...state,
                error:action.payload,
                status:action.payload.status
            }
        case LOGOUT:
            return {
                bookid:'',
                email:'',
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
                bookedFrom: '',
                bookedTo:'',
                image1:'',
                image2:'',
                image3:'',
                image4:'',
                nights:'',
                status: '',
                error:[]
            }
        default:
            return state
    }
}