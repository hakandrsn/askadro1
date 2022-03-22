import { CLOSE_MODAL, ERROR, SUCCESS } from "../actions/types";
const INITIAL_STATE ={
    open:null,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUCCESS:
            return {...state,open:true,["where"]:action.payload}
        case ERROR:
            return {...state,open:true,["error"]:action.payload}
        case CLOSE_MODAL:
            return {...state,open:false}
        default:
            return state
    }
}