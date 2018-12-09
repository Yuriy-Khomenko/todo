import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux'
import configureStore from './reducers/index'
import { BrowserRouter } from "react-router-dom";


const store = configureStore();
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})


ReactDOM.render(

    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>

    , document.getElementById('root'));
registerServiceWorker();
