import {
    GET_QUIZ,
    GET_OPTION,
    GET_QUESTION,
    ADD_OPTION,
    ADD_QUESTION,
    ADD_QUIZ,
    DELETE_OPTION,
    DELETE_QUESTION,
    DELETE_QUIZ,
    CLEAR_QUESTION, GET_SCORE,ADD_SCORE
} from "./types";

const initialState={
    quiz:[],
    question:[],
    option:[],
    score:[]
};

const QuizReducer=(state = initialState, action)=>{
    switch(action.type) {
        case GET_QUIZ:
            return{
                ...state,
                quiz:action.payload
            };
        case GET_QUESTION:
            return{
                ...state,
                question:action.payload
            };
        case GET_OPTION:
            return{
                ...state,
                option:action.payload
            };
        case ADD_QUIZ:
            return{
                ...state,
                quiz:[action.payload,...state.quiz]
            };
        case ADD_QUESTION:
            return{
                ...state,
                question:[action.payload,...state.question]
            };
        case ADD_OPTION:
            return{
                ...state,
                option:[...state.option,action.payload,]
            };
        case CLEAR_QUESTION:
            return{
                ...state,
                question:[]
            };
        case DELETE_QUIZ:
            return{
                ...state,
                quiz:state.quiz.filter(i => i.id !== action.payload)
            };
        case DELETE_QUESTION:
            return{
                ...state,
                question:state.question.filter(i => i.id !== action.payload)
            };
        case DELETE_OPTION:
            return{
                ...state,
                option:state.option.filter(i => i.id !== action.payload)
            };
        case GET_SCORE:
            return{
                ...state,
                score:action.payload
            };
        case ADD_SCORE:
            return{
                ...state,
                score:action.payload
            };
        default:return state

    }
};
export default QuizReducer