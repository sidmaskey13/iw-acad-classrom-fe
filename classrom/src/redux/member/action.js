import {alertActions} from "../notification/action";
import axios from "axios";
import {mainUrl} from "../../App";
import {GET_ALL_USERS,DELETE_USER} from "../member/types";
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

export const deleteUser = (id) => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.delete(mainUrl+`api/auth/all_users_delete/${id}/`,tokenConfig(getState))
        .then(res =>
            {dispatch(alertActions.success("User deleted successfully"))
                dispatch(alertActions.loading_end());
                dispatch({
                    type: DELETE_USER,
                    payload: id
                })}
        )
};