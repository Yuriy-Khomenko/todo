import { getTasks } from '../api/api';

export const USER_LOG = 'USER_LOG'
export const USER_UNLOG = 'USER_UNLOG'
export const GET_TASKS = 'GET_TASKS'
export const NEXT_PAGE = 'NEXT_PAGE'
export const PREV_PAGE = 'PREV_PAGE'
export const UPDATE = 'UPDATE'
export const SERVER_MSG = 'SERVER_MSG';
export const IS_LOADING = 'IS_LOADING';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FIELD_UNCORECT = 'FIELD_UNCORECT'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const CHANGE_SORT_DIRECTION = 'CHANGE_SORT_DIRECTION'
export const CHANGE_SORT_FIELD = 'CHANGE_SORT_FIELD'


export const emit_ChangePage = (page) => {
    return {
        type: CHANGE_PAGE,
        page: page
    }
}

export const emit_ChangeSortDir = (sd) => {
    return {
        type: CHANGE_SORT_DIRECTION,
        sort_direction: sd
    }
}

export const emit_ChangeSortField = (field) => {
    return {
        type: CHANGE_SORT_FIELD,
        field: field
    }
}


export const emit_NextPage = () => {
    return {
        type: NEXT_PAGE
    }
}
export const emit_PrevPage = () => {
    return {
        type: PREV_PAGE
    }
}

export const emit_UserLog = (name, pass) => {
    return {
        type: USER_LOG,
        name,
        pass
    }
}

export const emit_UserUnLog = () => {
    return {
        type: USER_UNLOG
    }
}

export function hasErrored(msg, e) {
    return {
        type: SERVER_MSG,
        serverStatus: msg,
        serverMsg: e
    };
}

export function emit_serverMsg(err_string) {
    return {
        type: FIELD_UNCORECT,
        errString: err_string
    };
}

export function isLoading(bool) {
    return {
        type: IS_LOADING,
        isLoading: bool
    };
}

export function get_tasks(data) {
    return {
        type: GET_TASKS,
        data: {
            tasks: data.message.tasks,
            total_task_count: parseInt(data.message.total_task_count, 10)
        }
    }
};

export const emit_Update = (val) => {
    return {
        type: UPDATE,
        up: val
    }
}
//********************************* */


export function fetchDataSuccess(dispatch, data) {
    dispatch(get_tasks(data));
}

export function fetchCreateSuccess(dispatch, data, getState) {

    let state = getState().hasErrored;
    state.serverStatus = 0;
    state.serverMsg = "";

    if (data.status === "error") {
        dispatch(emit_serverMsg(data.message));
    } else if (data.status === "ok") {

        dispatch(hasErrored(2, "створення задачі пройшло успішно"));

        //} else {
        let { reducMain: stor } = getState();
        let field_set = {
            page: stor.page,
            sort_direction: stor.sort_direction,
            sort_field: stor.sort_field
        }
        dispatch(getTasks(field_set));
    }
}

export function emit_fetchData(url, params = {}) {

    return (dispatch, getState) => {
        dispatch(isLoading(true));

        let hnd;
        let method = params ? params.method : 'GET';
        switch (method) {
            case 'POST':
                hnd = fetchCreateSuccess;
                break;
            default:
                hnd = fetchDataSuccess;
        };

        let emit_hendler = (handler_func) => {
            fetch(url, {
                method: 'GET',
                /*headers: {
                    'Content-Type': 'application/json'
                },*/
                ...params
            })
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    dispatch(isLoading(false));
                    return response;
                })
                .then((response) => response.json())
                .then((data) => handler_func(dispatch, data, getState))
                .catch((e) => dispatch(hasErrored(1, e))
                );
        }
        emit_hendler(hnd);
    };
}