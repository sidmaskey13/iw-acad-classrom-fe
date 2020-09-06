import axios from 'axios'
import {alertActions} from "../notification/action";
import {tokenConfig} from "../auth/action";

import {GET_ASSIGNMENT_QUESTION,GET_ALL_SUBMISSION_BY_QUESTION,ADD_ASSIGNMENT_QUESTION, SUBMIT_ASSIGNMENT} from "./types";

import {mainUrl} from "../../App";
import {REGISTER_FAIL, REGISTER_SUCCESS} from "../auth/types";

export const getAllAssignmentQuestion = () => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.get(mainUrl+'api/assignment_question/',tokenConfig(getState))
        .then(res =>
            {   dispatch(alertActions.loading_end());
                dispatch({
                    type: GET_ASSIGNMENT_QUESTION,
                    payload: res.data
                })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));
    })
};

export const getAllSubmissionByQuestion = (id) => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.get(mainUrl+`api/assignment_submit_by_question/${id}/`,tokenConfig(getState))
        .then(res =>
            {   dispatch(alertActions.loading_end());
                dispatch({
                    type: GET_ALL_SUBMISSION_BY_QUESTION,
                    payload: res.data.result
                })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));
    })
};


export const addAssignementQuestion = (formdata) => (dispatch,getState) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    const token = getState().auth.token;
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    dispatch(alertActions.loading_start());
    axios.post(mainUrl+'api/assignment_question/', formdata, config)
        .then(res =>
            {   dispatch(alertActions.success("Assignement Question added successfully"));
                dispatch(alertActions.loading_end());
                dispatch({
                    type: ADD_ASSIGNMENT_QUESTION,
                    payload: res.data
                })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));
    })};


export const submitAssignment = (formdata) => (dispatch,getState) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    const token = getState().auth.token;
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    dispatch(alertActions.loading_start());
    axios.post(mainUrl+'api/assignment_submit/', formdata, config)
        .then(res =>
            {   dispatch(alertActions.success("Assignement Submitted successfully"));
                dispatch(alertActions.loading_end());
                dispatch({
                    type: SUBMIT_ASSIGNMENT,
                    payload: res.data
                })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));
    })};