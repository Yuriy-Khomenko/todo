
import { SERVER_MSG, IS_LOADING } from '../actions/actions'

let init = {
    status: 0,
    serverMsg: ""
}


export function hasErrored(state = init, action) {
    switch (action.type) {
        case SERVER_MSG:
            return {
                serverStatus: action.serverStatus,
                serverMsg: action.serverMsg
            };

        default:
            return state;
    }
}

export function isLoading(state = false, action) {
    switch (action.type) {
        case IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}


