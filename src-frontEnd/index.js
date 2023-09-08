import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom/Router";
import {Provider} from 'react-redux';
import smoothScroll from 'smoothscroll-polyfill';

import App from "./App";
import "./scss/main.css";

import configureStore from "./store/configureStore";
import getHistory from "./store/getHistory";
smoothScroll.polyfill();

configureStore()
    .then(store => {
        ReactDOM.render(
            <Provider store={store}>
                <Router history={getHistory()}>
                    <App/>
                </Router>
            </Provider>, document.getElementById('root'));
    });
