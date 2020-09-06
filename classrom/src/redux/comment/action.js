import axios from 'axios'
import {alertActions} from "../notification/action";
import {tokenConfig} from "../auth/action";

import {DELETE_COMMENT,ADD_COMMENT} from "./types";
import {mainUrl} from "../../App";


export const deleteComment = (id) => (dispatch,getState) => {
    axios.delete(mainUrl+`api/post/${id}/`,tokenConfig(getState))
        .then(res =>
            {dispatch(alertActions.success("Post deleted successfully"))
                dispatch({
                    type: DELETE_COMMENT,
                    payload: id
                })}
        )
};

export const addComment = (lead) => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.post(mainUrl+'api/comment/',lead,tokenConfig(getState))
        .then(res =>
            {   dispatch(alertActions.success("Comment added successfully"));
                dispatch(alertActions.loading_end());
                dispatch({
                    type: ADD_COMMENT,
                    payload: res.data
                })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));
    })
};