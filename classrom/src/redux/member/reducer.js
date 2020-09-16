import {GET_ALL_USERS,DELETE_USER} from "./types";

const initialState={
    allUser:null
};

const UserReducer=(state = initialState, action)=>{
    switch(action.type) {
        case GET_ALL_USERS:
            return{
                ...state,
                allUser:action.payload
            };
        case DELETE_USER:
            return{
                ...state,
                allUser:state.allUser.filter(i => i.id !== action.payload)
            };

        default:return state

    }
};
export default UserReducer