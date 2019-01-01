import {FETCH_LOGIN, FETCH_LOGIN_ERROR,LOGOUT,GET_PROFILE,POST_PROFILE,AVATAR} from '../actions/types';

const initialState = {
    token:'',
    email:'',
    first_name:'',
    last_name:'',
    profile_image:'',
    about:'',
    city:'',
    hometown:'',
    company:'',
    school:'',
    languages:'',
    gender:'',
    phone:'',
    type:'',
    //loginDetails:[],
    error:[]
}

export default function(state= initialState, action){
    switch(action.type){
        case FETCH_LOGIN:
        console.log(action.payload)
            return {
                ...state,
                //token:action.payload.data.token,
                email: action.payload.data.email,
                first_name:action.payload.data.first_name,
                last_name:action.payload.data.last_name,
                profile_image:action.payload.data.profile_image,
                about:action.payload.data.about,
                city:action.payload.data.city,
                hometown:action.payload.data.hometown,
                company:action.payload.data.company,
                school:action.payload.data.school,
                languages:action.payload.data.languages,
                gender:action.payload.data.gender,
                phone:action.payload.data.phone,
                type:action.payload.data.type,
                //loginDetails:action.payload,
                error:"", 
                status:"success"
            }
        case FETCH_LOGIN_ERROR:
            return {
                ...state,
                error:action.payload,
                status:"error"
            }
        case LOGOUT:
            return {
                token:'',
                email:'',
                first_name:'',
                last_name:'',
                profile_image:'',
                about:'',
                city:'',
                hometown:'',
                company:'',
                school:'',
                languages:'',
                gender:'',
                phone:'',
                type:'',
                status:""
            }
        case GET_PROFILE:
            return {
                ...state,
                email: action.payload.data.email,
                first_name:action.payload.data.first_name,
                last_name:action.payload.data.last_name,
                profile_image:action.payload.data.profile_image,
                about:action.payload.data.about,
                city:action.payload.data.city,
                hometown:action.payload.data.hometown,
                company:action.payload.data.company,
                school:action.payload.data.school,
                languages:action.payload.data.languages,
                gender:action.payload.data.gender,
                phone:action.payload.data.phone,
                type:action.payload.data.type,
                status: "success"
            }
        case POST_PROFILE:
            return {
                ...state,
                email: action.payload.data.email,
                first_name:action.payload.data.first_name,
                last_name:action.payload.data.last_name,
                profile_image:action.payload.data.profile_image,
                about:action.payload.data.about,
                city:action.payload.data.city,
                hometown:action.payload.data.hometown,
                company:action.payload.data.company,
                school:action.payload.data.school,
                languages:action.payload.data.languages,
                gender:action.payload.data.gender,
                phone:action.payload.data.phone,
                type:action.payload.data.type,
                status_profile: "success"
            }
        
        case "SESSION" : 
            return {
                ...state,
                ...action.user,
            }
            break;
        case AVATAR:
        return {
            ...state,
            profile_image:action.payload.data.profile_image,
            status_image: "success"
        }
        default: return state
    }
}

//export const load = data => ({ type: LOAD, data })