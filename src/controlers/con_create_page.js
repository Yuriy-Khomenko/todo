import { connect } from 'react-redux';
import CreatePage from '../components/com_create_page.jsx';
import {saveTasc} from '../api/api'


const mapStateToProps = (state, ownProps) => {


    //console.log(state);
    //alert(9999999)
    return {
        isLoading: state.isLoading,
        err_status: state.reducMain.err_status,
        err_string: state.reducMain.err_string,
        sin_err_status: state.hasErrored.serverStatus,
        sin_err_string: state.hasErrored.serverMsg
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (data) => {
            dispatch(saveTasc(data));
        }
    }
}

const ContCreatePage = connect(mapStateToProps, mapDispatchToProps)(CreatePage)
export default ContCreatePage