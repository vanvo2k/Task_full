import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import clientMiddleware from './clientMiddleware';
import rootReducer from "../reducers";
import {authStartupCheck} from "../actions/AuthActions";
import React from "react";
import {setStore} from "../services/StoreServices";
import {cartStartupCheck} from "../actions/CartActions";

let middleware = [thunk, clientMiddleware()];
let middlewareWrapper = applyMiddleware(...middleware);

if (process.env.REACT_APP_ENV === 'production') {
    const LogRocket = require('logrocket');
    middleware = [].concat(middleware, LogRocket.reduxMiddleware());
    middlewareWrapper = applyMiddleware(...middleware);
} else {
    const {whyDidYouUpdate} = require('why-did-you-update');
    if ((window.location.search + '').indexOf('debug=1') !== -1) {
        whyDidYouUpdate(React);
    }

    const {composeWithDevTools} = require('redux-devtools-extension');
    middlewareWrapper = composeWithDevTools(middlewareWrapper);
}

const store = createStore(rootReducer, middlewareWrapper);
const {dispatch} = store;

export default () => {
    return dispatch(authStartupCheck())
        .then(dispatch(cartStartupCheck()))
        .then(() => {
            setStore(store);

            return Promise.resolve(store);
        });
}