import {GET_QUIZ,GET_OPTION,GET_QUESTION,ADD_OPTION,ADD_QUESTION,ADD_QUIZ,DELETE_OPTION,DELETE_QUESTION,DELETE_QUIZ} from "./types";

const initialState={
    quiz:[],
    question:[],
    option:[],
}

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
                quiz:[...state.quiz,action.payload,]
            };
        case ADD_QUESTION:
            return{
                ...state,
                question:[...state.question,action.payload,]
            };
        case ADD_OPTION:
            return{
                ...state,
                option:[...state.option,action.payload,]
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
        default:return state

    }
};
export default QuizReducer