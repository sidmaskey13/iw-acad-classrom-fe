import {combineReducers} from "redux";
import PostReducer from "./post/reducer";
import NotificationReducer from "./notification/reducer";
import AuthReducer from "./auth/reducer";
import CommentReducer from "./comment/reducer";
import QuizReducer from "./quiz/reducer";
import AssignmentReducer from "./assignment/reducer";
import UserReducer from "./member/reducer";
import LikeReducer from "./like/reducer";

export default combineReducers({
    posts:PostReducer,
    notification:NotificationReducer,
    auth:AuthReducer,
    comment:CommentReducer,
    quiz:QuizReducer,
    assignment:AssignmentReducer,
    all_user:UserReducer,
    like:LikeReducer,
});