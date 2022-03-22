import _ from "lodash"
import {
    CREATE_COMPANY,
    FETCH_COMPANYS,
    FETCH_COMPANY,
    DELETE_COMPANY,
    EDIT_COMPANY,
} from "../actions/types"


export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_COMPANYS:
            return { ...state, ..._.mapKeys(action.payload, "id") }
        case FETCH_COMPANY:
            return { ...state, [action.payload.id]: action.payload }
        case CREATE_COMPANY:
            return { ...state, ...action.payload }
        case DELETE_COMPANY:
            return _.omit(state, action.payload)
        case EDIT_COMPANY:
            return { ...state }
        default:
            return state
    }
}