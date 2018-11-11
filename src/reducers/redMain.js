import { GET_TASKS, NEXT_PAGE, PREV_PAGE, CHANGE_SORT_DIRECT, CHANGE_SORT_FIELD, UPDATE } from '../actions/actions'

const basket = {
    tasks: [],
    total_task_count: 0,
    curent_page: 1,
    sort_direction: 'asc',
    sort_field: 'id',
    update: false
};

export default function reducTovarBasket(state = basket, action) {

    switch (action.type) {

        case GET_TASKS:
            return Object.assign({}, state, action.data);

        case NEXT_PAGE:
            state.curent_page++;
            return Object.assign({}, state);

        case PREV_PAGE:
            if (state.curent_page == 0) {
                return state;
            }
            state.curent_page--;
            return Object.assign({}, state);

        case CHANGE_SORT_DIRECT:
            return Object.assign({}, state, action.data);

        case CHANGE_SORT_FIELD:
            return Object.assign({}, state, action.data);

        case UPDATE:
            state.update = action.up;
            return Object.assign({}, state);

        default:
            return state
    }
}

