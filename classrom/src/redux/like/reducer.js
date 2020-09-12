import {ADD_LIKE} from "./types";

const initialState={
    likes:[]
}

const LikeReducer=(state = initialState, action)=>{
    switch(action.type) {
        case ADD_LIKE:
            return{
                ...state,
                likes:[...state.likes,action.payload]
            };
        default:return state
    }
};
export default LikeReducer