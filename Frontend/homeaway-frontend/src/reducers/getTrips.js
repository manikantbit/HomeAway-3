import {GET_ORDER,FETCH_BOOK_ERROR, LOGOUT} from '../actions/types';

const initialState = {
    arrayData:[]
}
export default function(state= initialState, action){
    switch(action.type){
        case GET_ORDER:
                return {
                    arrayData : action.payload.data,
                    status:action.payload.status
                }
        case FETCH_BOOK_ERROR:
            return {
                ...state,
                error:action.payload.status,
                status:"error"
            }
        case LOGOUT:
            return {
                arrayData :[],
                status: ''
            }
        default:
            return state    
            }
        }