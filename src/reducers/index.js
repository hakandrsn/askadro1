import { combineReducers } from "redux"
import companyReducers from "./companyReducer"
import authReducer from "./authReducer"
import employeeReducer from "./employeeReducer"
import workReducer from "./workReducer"
import successReducer from "./successReducer"

export default combineReducers({
    auth:authReducer,
    companys:companyReducers,
    employees:employeeReducer,
    works:workReducer,
    success:successReducer,
})