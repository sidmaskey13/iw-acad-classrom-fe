import axios from 'axios'
import {alertActions} from "../notification/action";
import {tokenConfig} from "../auth/action";

import {GET_POSTS,DELETE_POST,ADD_POST,CLEAR_POST} from "./types";

import {mainUrl} from "../../App";

export const getPosts = () => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.get(mainUrl+'api/post/',tokenConfig(getState))
        .then(res =>
            {    dispatch(alertActions.loading_end());
            console.log(mainUrl)
                dispatch({
                type: GET_POSTS,
                payload: res.data
            })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));
    })
};

export const getOwnPosts = () => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.get(mainUrl+'api/own_post',tokenConfig(getState))
        .then(res =>
            {    dispatch(alertActions.loading_end());
                console.log(mainUrl)
                dispatch({
                    type: GET_POSTS,
                    payload: res.data.result
                })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));
    })
};

export const clearPost=()=>{
    return{
        type:CLEAR_POST,
    }
}

export const deletePost = (id) => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.delete(mainUrl+`api/post/${id}/`,tokenConfig(getState))
        .then(res =>
            {dispatch(alertActions.success("Post deleted successfully"))
                dispatch(alertActions.loading_end());
                dispatch({
                    type: DELETE_POST,
                    payload: id
                })}
        )
};
export const addPost = (data) => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.post(mainUrl+'api/post/',data,tokenConfig(getState))
        .then(res =>
            {   dispatch(alertActions.success("Post added successfully"));
                dispatch(alertActions.loading_end());
                dispatch({
                    type: ADD_POST,
                    payload: res.data
                })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));
    })
};

