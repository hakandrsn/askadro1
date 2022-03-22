import { IN_MANAGER, OUT_MANAGER } from "../actions/types";

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
    user: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // case SIGN_IN:
        //     return { ...state, isSignedIn: true, userId: action.payload }
        // case SIGN_OUT:
        //     return { ...state, isSignedIn: false, userId: null }
        case IN_MANAGER:
            return { ...state, isSignedIn: true, userId: action.payload.uid, user: action.payload }
        case OUT_MANAGER:
            return { ...state, isSignedIn: false, userId: null, user: null }
        default:
            return state
    }
}