import {GET_POSTS,DELETE_POST,ADD_POST} from "./types";

const initialState={
    posts:[]
}

const PostReducer=(state = initialState, action)=>{
    switch(action.type) {
        case GET_POSTS:
            return{
                ...state,
                posts:action.payload
            };
        case ADD_POST:
            return{
                ...state,
                posts:[...state.posts,action.payload,]
            };
        case DELETE_POST:
            return{
                ...state,
                posts:state.posts.filter(i => i.id !== action.payload)
            };
        default:return state

    }
};
export default PostReducer