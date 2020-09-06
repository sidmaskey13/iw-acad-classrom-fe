import {GET_ALL_USERS} from "./types";

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

        default:return state

    }
};
export default UserReducer