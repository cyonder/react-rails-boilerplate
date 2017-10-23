import { axiosInstance as axios } from '../constants/axiosInstance';

import {
    AUTHENTICATE_USER,
    DEAUTHENTICATE_USER,
    SIGNUP_USER_ERROR,
    SIGNIN_USER_ERROR
} from '../constants/actionTypes';

import {
    ROOT_URL,
    ROOT_API_URL,
    AUTHENTICATION_TOKEN
} from '../constants/configurations';

export const signupUserError = (error) => {
    return{
        type: SIGNUP_USER_ERROR,
        payload: error
    };
};

export const signinUserError = (error) => {
    return{
        type: SIGNIN_USER_ERROR,
        payload: error
    };
};

export const signupUser = (user, callback) => {
    return (dispatch) => {
        axios.post(`/users`, { user })
            .then( () => callback() ) // Sign in user and re-direct to "/dashboard"
            .catch(error => {
                if(error.response.status == 422){
                    dispatch( signupUserError(error.response.data.errors.email) )
                }else{
                    dispatch( signupUserError('Something went wrong. Please refresh your page and try again.') )
                    console.error(error.response.data.error);
                }
            })
    };
};

export const signinUser = (login_credentials, callback) => {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/signin`, login_credentials)
            .then(response => {
                dispatch({ type: AUTHENTICATE_USER });
                localStorage.setItem(AUTHENTICATION_TOKEN, response.data.auth_token);
            })
            .then( () => callback() ) // Re-direct to "/dashboard"
            .catch(error => {
                if(error.response.status == 401){
                    dispatch( signinUserError(error.response.data.error.user_authentication) )
                }else{
                    dispatch( signinUserError('Something went wrong. Please refresh your page and try again.') )
                    console.error(error.response.data.error);
                }
            })
    };
};

export const signoutUser = () => {
    localStorage.removeItem(AUTHENTICATION_TOKEN);
    return{ type: DEAUTHENTICATE_USER };
};
