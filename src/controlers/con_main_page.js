import { connect } from 'react-redux'
import { getTasks, saveChanges, changePage} from '../api/api'
import MainPage from '../components/com_main_page.jsx'

const mapStateToProps = (state) => {

    return {
        tasks: state.reducMain.tasks,
        total_task_count: state.reducMain.total_task_count,
        curent_page: state.reducMain.curent_page,
        sort_direction: state.reducMain.sort_direction,
        sort_field: state.reducMain.sort_field,
        admin: state.reducUserLog.admin,
        isLoading: state.isLoading,
        page: state.reducMain.page
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (data, mode) => {
            if (mode) {
                dispatch(saveChanges(data));
            } else {
                dispatch(getTasks(data));
            }
        },
        changePage: (field, new_page) => dispatch(changePage(field, new_page))
    }
}


const ContMainPage = connect(mapStateToProps, mapDispatchToProps)(MainPage)
export default ContMainPage