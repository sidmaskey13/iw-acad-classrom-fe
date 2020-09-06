import axios from 'axios'
import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS, REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED, GET_ALL_USERS, STAFF_REGISTER_SUCCESS, STAFF_REGISTER_FAIL
} from "./types";
import {alertActions} from "../notification/action";
import {mainUrl} from "../../App";

export const loadUser = () => (dispatch, getState) => {
    dispatch(alertActions.loading_start());
    axios.get(mainUrl+'api/auth/user', tokenConfig(getState)).then(
        res => {
            dispatch(alertActions.loading_end());
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }
    ).catch(err => {
            dispatch(alertActions.error('Not Logged In'))
            dispatch({
                type: AUTH_ERROR,
            })
        }
    )
};

export const login = (username,password) => (dispatch) => {
    dispatch(alertActions.loading_start());
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    //request body
    const body=JSON.stringify({username,password});
    axios.post(mainUrl+'api/auth/login', body, config).then(
        res => {
            dispatch(alertActions.success('Logged In'))
            dispatch(alertActions.loading_end())
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }
    ).catch(err => {
            dispatch(alertActions.error('Not Logged In'))
            if(err.response.data.non_field_errors){
                dispatch(alertActions.error('Incorrect Credintials'))
            }
            dispatch({
                type: LOGIN_FAIL,
            })
        }
    )
};
export const register = (formdata) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    axios.post(mainUrl+'api/auth/register', formdata, config).then(
        res => {
            dispatch(alertActions.success('Logged In'))
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }
    ).catch(err => {
            dispatch(alertActions.error(err.toString()))
            dispatch({
                type: REGISTER_FAIL,
            })
        }
    )
};

export const staffRegister = (formdata) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    axios.post(mainUrl+'api/auth/register_staff', formdata, config).then(
        res => {
            dispatch(alertActions.success('Created Staff'))
            dispatch({
                type: STAFF_REGISTER_SUCCESS,
                payload: res.data
            });
        }
    ).catch(err => {
            dispatch(alertActions.error(err.toString()))
            dispatch({
                type: STAFF_REGISTER_FAIL,
            })
        }
    )
};

export const logOut = () => (dispatch, getState) => {
    dispatch(alertActions.loading_start());
    axios.post(mainUrl+'api/auth/logout',null, tokenConfig(getState)).then(
        res => {
            dispatch(alertActions.success('Logged Out'))
            dispatch(alertActions.loading_end());
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        }
    ).catch(err => {
            dispatch(alertActions.error('Failed to Logout'))
        }
    )
};



//setup config with token
export const tokenConfig = getState => {
    const token = getState().auth.token;
    //config headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    //If token then add to header
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config
}