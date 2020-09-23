import {ADD_LIKE} from "./types";

const initialState={
    likes:null
}

const LikeReducer=(state = initialState, action)=>{
    switch(action.type) {
        case ADD_LIKE:
            return{
                ...state,
                likes:action.payload
            };
        default:return state
    }
};
export default LikeReducer