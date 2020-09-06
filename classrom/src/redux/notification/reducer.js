import {alertConstants} from "./types";

const NotificationReducer=(state = {isLoading:false}, action)=>{
    switch(action.type) {
        case alertConstants.SUCCESS:
            return{
                type:'success',
                title:'Congratulations',
                notification:action.payload
            };
        case alertConstants.ERROR:
            return{
                type:'error',
                title:'Opps',
                notification:action.payload
            };
        case alertConstants.LOADING_START:
            return{
                type:'loading_start',
                isLoading:true,
            };
        case alertConstants.LOADING_END:
            return{
                type:'loading_end',
                isLoading:false
            };
        case alertConstants.CLEAR:
            return{};
        default:return state

    }
};
export default NotificationReducer