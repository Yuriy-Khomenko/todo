import { connect } from 'react-redux'
import { emit_UserLog } from '../actions/actions'
import UserLog from '../components/com_user_log.jsx'

const mapStateToProps = (state, ownProps) => {
    return {
        log_in: state.reducUserLog.admin
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        onUserLog: (name, pass) => {
            dispatch(emit_UserLog(name, pass));
        }
    }
}

const ContAdminPage = connect(mapStateToProps, mapDispatchToProps)(UserLog)
export default ContAdminPage