import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import reducMain from './redMain'
import reducUserLog from './redUserLog'
import { hasErrored, isLoading } from './networkStatus';


//const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}
const persistedState = null;

const rootReducer = combineReducers({
    reducMain,
    reducUserLog,
    hasErrored,
    isLoading
})


export default function configureStore(initialState = persistedState) {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
}
