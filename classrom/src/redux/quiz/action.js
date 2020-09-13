import {alertActions} from "../notification/action";
import axios from "axios";
import {mainUrl} from "../../App";
import {tokenConfig} from "../auth/action";
import {
    GET_QUIZ,
    GET_QUESTION,
    ADD_QUIZ,
    ADD_QUESTION,
    CLEAR_QUESTION,
    DELETE_QUESTION,
    DELETE_QUIZ, ADD_SCORE, GET_SCORE, CLEAR_SCORE
} from "../quiz/types";
import {DELETE_POST} from "../post/types";

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
            console.log(err.response.data.deadline_date)
        dispatch(alertActions.error(err.toString()));
        if(err.response.data.deadline_date){dispatch(alertActions.error("DeadLine Date Field cant be blank"))};
        if(err.response.data.title){dispatch(alertActions.error("Quiz Field cant be blank"))};
    })
};

export const deleteQuiz = (id) => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.delete(mainUrl+`api/quiz/${id}/`,tokenConfig(getState))
        .then(res =>
            {dispatch(alertActions.success("Quiz deleted successfully"))
                dispatch(alertActions.loading_end());
                dispatch({
                    type: DELETE_QUIZ,
                    payload: id
                })}
        )
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
        if(err.response.data.title){dispatch(alertActions.error("Question Field cant be blank"))};
        if(err.response.data.option){dispatch(alertActions.error("Option Fields cant be blank"))};

    })
};

export const clearQuestionOptionList=()=>{
    return{
        type:CLEAR_QUESTION
    }
}

export const deleteQuestionOptions = (id) => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.delete(mainUrl+`api/quiz_question/${id}/`,tokenConfig(getState))
        .then(res =>
            {dispatch(alertActions.success("Question Options deleted successfully"))
                dispatch(alertActions.loading_end());
                dispatch({
                    type: DELETE_QUESTION,
                    payload: id
                })}
        )
};

export const sendScoreDate = (data) => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.post(mainUrl+'api/quiz_score/',data,tokenConfig(getState))
        .then(res =>
            {   dispatch(alertActions.success("Score Send successfully"));
                dispatch(alertActions.loading_end());
                dispatch({
                    type: ADD_SCORE,
                    payload: res.data
                })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));

    })
};

export const getScoreQuizWiseStudent = (id) => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.get(mainUrl+'api/quiz_score_by_user/'+id,tokenConfig(getState))
        .then(res =>
            {    dispatch(alertActions.loading_end());
                console.log(mainUrl)
                dispatch({
                    type: GET_SCORE,
                    payload: res.data.result
                })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));
    })
};

export const getScoreQuizAllStudent = (id) => (dispatch,getState) => {
    dispatch(alertActions.loading_start());
    axios.get(mainUrl+'api/quiz_score_all_user/'+id,tokenConfig(getState))
        .then(res =>
            {    dispatch(alertActions.loading_end());
                console.log(mainUrl)
                dispatch({
                    type: GET_SCORE,
                    payload: res.data.result
                })}
        ).catch(err=>{
        dispatch(alertActions.error(err.toString()));
    })
};

export const clearScore=()=>{
    return{
        type:CLEAR_SCORE,
    }
}