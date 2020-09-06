import {DELETE_COMMENT,ADD_COMMENT} from "./types";

const initialState={
    comments:[]
}

const CommentReducer=(state = initialState, action)=>{
    switch(action.type) {

        case ADD_COMMENT:
            return{
                ...state,
                comments:[...state.comments,action.payload,]
            };
        case DELETE_COMMENT:
            return{
                ...state,
                comments:state.comments.filter(i => i.id !== action.payload)
            };
        default:return state

    }
};
export default CommentReducer