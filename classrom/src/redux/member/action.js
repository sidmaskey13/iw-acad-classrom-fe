import {alertActions} from "../notification/action";
import axios from "axios";
import {mainUrl} from "../../App";
import {GET_ALL_USERS} from "../member/types";
import {tokenConfig} from "../auth/action";

export const getAllUsers = () => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.get(mainUrl+'api/auth/all_users/',tokenConfig(getState))
        .then(res =>
            {    dispatch(alertActions.loading_end());
                console.log(mainUrl)
                dispatch({
                    type: GET_ALL_USERS,
                    payload: res.data
                })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));
    })
};