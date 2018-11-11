import { connect } from 'react-redux'
import { emit_fetchData } from '../actions/actions'
import MainPage from '../components/com_main_page.jsx'


const mapStateToProps = (state) => {
    return {
        tasks: state.reducMain.tasks,
        total_task_count: state.reducMain.total_task_count,
        curent_page: state.reducMain.curent_page,
        sort_direction: state.reducMain.sort_direction,
        sort_field: state.reducMain.sort_field,
        update: state.reducMain.update,
        admin: state.reducUserLog.admin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (url, data, method) => {
            dispatch(emit_fetchData(url, data, method));
        }
    }
}


const ContMainPage = connect(mapStateToProps, mapDispatchToProps)(MainPage)
export default ContMainPage