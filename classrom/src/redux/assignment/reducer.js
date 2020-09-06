import {GET_ALL_SUBMISSION_BY_QUESTION,GET_ASSIGNMENT_QUESTION,ADD_ASSIGNMENT_QUESTION,SUBMIT_ASSIGNMENT} from "./types";

const initialState={
    question:[],
    submission:[],
}

const AssignmentReducer=(state = initialState, action)=>{
    switch(action.type) {
        case GET_ASSIGNMENT_QUESTION:
            return{
                ...state,
                question:action.payload
            };
        case GET_ALL_SUBMISSION_BY_QUESTION:
            return{
                ...state,
                submission:action.payload
            };
        case SUBMIT_ASSIGNMENT:
            return{
                ...state,
                submission:action.payload
            };
        case ADD_ASSIGNMENT_QUESTION:
            return{
                ...state,
                question:[...state.question,action.payload,]
            };

        default:return state

    }
};
export default AssignmentReducer