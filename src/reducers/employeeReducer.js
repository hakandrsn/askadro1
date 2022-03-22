import _ from "lodash"
import {
    CREATE_EMPLOYEE,
    FETCH_EMPLOYEES,
    FETCH_EMPLOYEE,
    DELETE_EMPLOYEE,
    EDIT_EMPLOYEE,
} from "../actions/types"

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_EMPLOYEE:
            return { ...state, ...action.payload }
        case FETCH_EMPLOYEES:
            return { ...state, ..._.mapKeys(action.payload, "id") }
        case FETCH_EMPLOYEE:
            return { ...state, [action.payload.id]: action.payload }
        case DELETE_EMPLOYEE:
            return _.omit(state, action.payload)
        case EDIT_EMPLOYEE:
            return { ...state }
        default:
            return state
    }
}