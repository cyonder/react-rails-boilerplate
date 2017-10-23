import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AUTHENTICATION_TOKEN } from '../../constants/configurations';
import { axiosInstance as axios } from '../../constants/axiosInstance';

export default function(ComposedComponent) {
    class Authentication extends Component {
        constructor(){
            super();
            // Pass JWT Token to all authorized headers
            var token = localStorage.getItem(AUTHENTICATION_TOKEN);
            var headers = axios.defaults.headers
            token ? headers.authorization = token : headers.authorization = null;
        };

        PropTypes = {
            router: PropTypes.object
        }

        componentWillMount() {
            if (!this.props.authenticated) {
                this.props.history.push('/');
            }
        };

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.props.history.push('/');
            }
        };

        render() {
            return <ComposedComponent {...this.props} />
        };
    };

    function mapStateToProps(state) {
        return { authenticated: state.authentication.authenticated };
    };

    return connect(mapStateToProps)(Authentication);
};
