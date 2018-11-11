import { connect } from 'react-redux'
import { emit_UserLog } from '../actions/actions'
import UserLog from '../components/com_user_log.jsx'

const mapDispatchToProps = (dispatch) => {

    return {
        onUserLog: (name, pass) => {
            dispatch(emit_UserLog(name, pass));
        }
    }
}

const ContAdminPage = connect(null, mapDispatchToProps)(UserLog)
export default ContAdminPage