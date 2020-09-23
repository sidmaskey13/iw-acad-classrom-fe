import {alertActions} from "../notification/action";
import axios from "axios";
import {mainUrl} from "../../App";
import {tokenConfig} from "../auth/action";
import {ADD_LIKE} from "./types";

export const addLike = (data) => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.post(mainUrl+'api/like/',data,tokenConfig(getState))
        .then(res =>
            {   dispatch(alertActions.loading_end());
                dispatch({
                    type: ADD_LIKE,
                    payload: res.data
                })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));
    })
};