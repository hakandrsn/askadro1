import { ADD_WORK ,DELETE_WORK, GET_COMPANY_WORKS, GET_EMPLOYEE_WORKS} from "../actions/types";
import _ from "lodash";

export default (state={},action) =>{
    switch(action.type){
        case ADD_WORK:
            return {...state,[action.payload.id]:action.payload}
        case DELETE_WORK:
            return _.omit(state,action.payload)
        default:
            return state
    }
}