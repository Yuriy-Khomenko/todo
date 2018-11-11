export const USER_LOG = 'USER_LOG'
export const USER_UNLOG = 'USER_UNLOG'
export const GET_TASKS = 'GET_TASKS'
export const NEXT_PAGE = 'NEXT_PAGE'
export const PREV_PAGE = 'PREV_PAGE'
export const CHANGE_SORT_DIRECT = 'CHANGE_SORT_DIRECT'
export const CHANGE_SORT_FIELD = 'CHANGE_SORT_FIELD'
export const UPDATE = 'UPDATE'
export const HAS_ERRORED = 'HAS_ERRORED';
export const IS_LOADING = 'IS_LOADING';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';



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
export const emit_ChangeSortDir = (val) => {
    return {
        type: CHANGE_SORT_DIRECT,
        data: {
            sort_direction: val
        }
    }
}
export const emit_ChangeSortField = (val) => {
    return {
        type: CHANGE_SORT_FIELD,
        data: {
            sort_field: val
        }
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

export const emit_Update = (val) => {
    return {
        type: UPDATE,
        up: val
    }
}


export function hasErrored(bool, e) {

    console.log(e);
    alert('err')
    return {
        type: HAS_ERRORED,
        hasErrored: bool
    };
}

export function isLoading(bool) {
    return {
        type: IS_LOADING,
        isLoading: bool
    };
}

export function get_tasks(data) {

    console.log(data);
    return {
        type: GET_TASKS,
        data: {
            tasks: data.message.tasks,
            total_task_count: parseInt(data.message.total_task_count)
        }
    }
};
//********************************* */


export function fetchDataSuccess(dispatch, data) {

    console.log(data)
    //dispatch(set_user_name(data));
    dispatch(get_tasks(data));
    dispatch(emit_Update(false));
}

export function fetchCreateSuccess(dispatch, data) {

    //  console.log(data)
    //alert(56456)
    dispatch(emit_Update(true));
    //dispatch(emit_setCurentTask(data.name));
}

export function emit_fetchData(url, body, method) {
    console.log(url);

    return (dispatch, state) => {
        dispatch(isLoading(true));

        if (body) {
            let hnd;
            if (method == 'POST') {
                hnd = fetchCreateSuccess;
            }


            let emit_hendler = (handler_func) => {
                fetch(url, {
                    method: method,
                    body: body
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw Error(response.statusText);
                        }
                        dispatch(isLoading(false));
                        return response;
                    })
                    .then((response) => response.json())
                    .then((data) => handler_func(dispatch, data))
                    .catch((e) => dispatch(hasErrored(true, e))
                    );
            }
            emit_hendler(hnd);

        } else {

            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    dispatch(isLoading(false));
                    return response;
                })
                .then((response) => response.json())
                .then((data) => fetchDataSuccess(dispatch, data))
                .catch((e) => dispatch(hasErrored(true, e))
                );
        }
    };
}
