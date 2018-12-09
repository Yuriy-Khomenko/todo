import { connect } from 'react-redux'
import NavBar from '../components/com_navbar.jsx'
import { emit_UserUnLog } from '../actions/actions'


const mapStateToProps = (state, ownProps) => {
    return {
        user_name: state.reducUserLog.userName,
        is_admin: state.reducUserLog.admin,
        is_loading: state.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUnLog: () => {
            dispatch(emit_UserUnLog());
        }
    }
}

const ContNavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar)
export default ContNavBar