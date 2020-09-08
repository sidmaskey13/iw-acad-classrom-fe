import {alertActions} from "../notification/action";
import axios from "axios";
import {mainUrl} from "../../App";
import {tokenConfig} from "../auth/action";
import {GET_QUIZ, GET_QUESTION, ADD_QUIZ, ADD_QUESTION} from "../quiz/types";

export const getQuizList = () => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.get(mainUrl+'api/quiz/',tokenConfig(getState))
        .then(res =>
            {    dispatch(alertActions.loading_end());
                console.log(mainUrl)
                dispatch({
                    type: GET_QUIZ,
                    payload: res.data
                })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));
    })
};

export const addQuiz = (data) => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.post(mainUrl+'api/quiz/',data,tokenConfig(getState))
        .then(res =>
            {   dispatch(alertActions.success("Quiz Created successfully"));
                dispatch(alertActions.loading_end());
                dispatch({
                    type: ADD_QUIZ,
                    payload: res.data
                })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));
    })
};

export const getQuestion = (id) => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.get(mainUrl+'api/quiz_question_option/'+id,tokenConfig(getState))
        .then(res =>
            {    dispatch(alertActions.loading_end());
                console.log(mainUrl)
                dispatch({
                    type: GET_QUESTION,
                    payload: res.data.result
                })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));
    })
};

export const addQuestionOption = (data) => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.post(mainUrl+'api/quiz_question_add/',data,tokenConfig(getState))
        .then(res =>
            {   dispatch(alertActions.success("Quiz Question Created successfully"));
                dispatch(alertActions.loading_end());
                dispatch({
                    type: ADD_QUESTION,
                    payload: res.data
                })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));
    })
};