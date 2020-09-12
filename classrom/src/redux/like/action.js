import {alertActions} from "../notification/action";
import axios from "axios";
import {mainUrl} from "../../App";
import {tokenConfig} from "../auth/action";
import {ADD_COMMENT} from "../comment/types";

export const addLike = (id) => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.post(mainUrl+'api/like/',id,tokenConfig(getState))
        .then(res =>
            {   dispatch(alertActions.loading_end());
                dispatch({
                    type: ADD_COMMENT,
                    payload: res.data
                })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));
    })
};