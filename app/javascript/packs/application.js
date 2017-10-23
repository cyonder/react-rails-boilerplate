import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { AUTHENTICATE_USER } from '../constants/actionTypes';
import { AUTHENTICATION_TOKEN } from '../constants/configurations';

import rootReducer from '../reducers/rootReducer';
import Root from '../components/Root';

let store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Get the token, if the token exist, auto authenticate the user
const token = localStorage.getItem(AUTHENTICATION_TOKEN);
if(token){ store.dispatch({ type: AUTHENTICATE_USER }) }

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Root store={ store } />,
        document.body.appendChild(document.createElement('div'))
    )
});
