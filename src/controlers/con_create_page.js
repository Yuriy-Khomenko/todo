import { connect } from 'react-redux'
import { emit_fetchData } from '../actions/actions'
import CreatePage from '../components/com_create_page.jsx'

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (url, body) => {
            dispatch(emit_fetchData(url, body, 'POST'));
        }
    }
}

const ContCreatePage = connect(null, mapDispatchToProps)(CreatePage)
export default ContCreatePage