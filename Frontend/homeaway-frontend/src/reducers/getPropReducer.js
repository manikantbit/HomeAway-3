import {FETCH_PROP,FETCH_PROP_ERROR, LOGOUT} from '../actions/types';

const initialState = {
    arrayData:[]
}
export default function(state= initialState, action){
    switch(action.type){
        case FETCH_PROP:
                return {
                    arrayData : action.payload.data,
                    status:action.payload.status
                }
        case FETCH_PROP_ERROR:
            return {
                ...state,
                error:action.payload.status,
                status:action.payload.status
            }
        case LOGOUT:
            return {
                arrayData:[],
                status: ''
            }
        default:
            return state
                
            }
        }