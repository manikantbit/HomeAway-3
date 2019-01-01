import {POST_MESSAGE,GET_MESSAGE,FETCH_MSG_ERROR, LOGOUT} from '../actions/types';

const initialState = {
    messageData:[]
}
export default function(state= initialState, action){
    switch(action.type){
        case POST_MESSAGE:
                return {
                    message : action.payload.data,
                    status:action.payload.status
                }
        case GET_MESSAGE:
        return {
            message : action.payload.data,
            status:action.payload.status
        }       
        case FETCH_MSG_ERROR:
            return {
                ...state,
                error:action.payload.status,
                status:action.payload.status
            }
        case LOGOUT:
            return {
                messageData:[],
                status: ''
            }
        default:
            return state    
            }
        }