import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthenticationReducer from './authenticationReducer';

export default combineReducers({
    form: formReducer,
    authentication: AuthenticationReducer
})
