import {alertConstants} from "./types";

export const alertActions={
    success,error,clear,loading_start,loading_end
};

function success(notification){return{type:alertConstants.SUCCESS,payload:notification};}
function error(notification){return{type:alertConstants.ERROR,payload:notification};}
function loading_start(){return{type:alertConstants.LOADING_START};}
function loading_end(){return{type:alertConstants.LOADING_END};}
function clear(){return{type:alertConstants.CLEAR};}

