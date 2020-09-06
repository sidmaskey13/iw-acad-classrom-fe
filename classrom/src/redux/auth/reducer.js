import {
    AUTH_ERROR,
    USER_LOADED,
    USER_LOADING,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS, REGISTER_FAIL,STAFF_REGISTER_FAIL,STAFF_REGISTER_SUCCESS
} from "./types";

const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    isLoading:false,
    user:null,
    allUser:null
};

const AuthReducer=(state = initialState, action)=>{
    switch(action.type) {
        case USER_LOADING:
            return{
                ...state,
                isLoading:true
            };
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                isLoading:false,
                user:action.payload
            };
        case STAFF_REGISTER_SUCCESS:
            return{
                ...state,
                isLoading:false,
                user:action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isLoading:false,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
        case STAFF_REGISTER_FAIL:
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                isLoading:false,
                user:null
            };
        default:return state

    }
};
export default AuthReducer