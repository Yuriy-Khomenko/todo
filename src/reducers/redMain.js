import { GET_TASKS, NEXT_PAGE, PREV_PAGE, CHANGE_SORT_FIELD, UPDATE, FIELD_UNCORECT, CHANGE_PAGE, CHANGE_SORT_DIRECTION, } from '../actions/actions'


const init = {
    tasks: [],
    total_task_count: 0,
    update: false,
    err_string: {},
    err_status: 0,
    page: 1,
    sort_direction: 'asc',
    sort_field: 'id'
};

export default function reducMain(state = init, action) {

    switch (action.type) {

        case GET_TASKS:
            return Object.assign({}, state, action.data);

        case CHANGE_PAGE:
            state.page = action.page;
            return Object.assign({}, state);

        case CHANGE_SORT_DIRECTION:
            state.sort_direction = action.sort_direction;
            return Object.assign({}, state);

        case CHANGE_SORT_FIELD:
            state.sort_field = action.field;
            return Object.assign({}, state);

        case NEXT_PAGE:
            state.curent_page++;
            return Object.assign({}, state);

        case PREV_PAGE:
            state.curent_page++;
            return Object.assign({}, state);

        case FIELD_UNCORECT:
            return Object.assign({}, state, {
                err_status: state.err_status + 1,
                err_string: action.errString
            });

        case UPDATE:
            state.update = action.up;
            return Object.assign({}, state);

        default:
            return state
    }
}

