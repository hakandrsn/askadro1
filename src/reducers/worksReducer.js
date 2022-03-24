import { ADD_WORK ,DELETE_WORK, GET_COMPANY_WORKS, GET_EMPLOYEE_WORKS} from "../actions/types";
import _ from "lodash";

export default (state={},action) =>{
    switch(action.type){
        case GET_EMPLOYEE_WORKS:
            return {...state,["data"]:action.payload}
        case GET_COMPANY_WORKS:
            return {...state,["data2"]:action.payload}
        default:
            return state
    }
}