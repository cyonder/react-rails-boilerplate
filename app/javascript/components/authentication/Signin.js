import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'

import {
    signinUser
} from '../../actions/authentication';

class Signin extends Component {
    constructor(){
        super();
        this.onSubmit = this.onSubmit.bind(this);
    };

    renderServerErrorMessage = () => {
        if(this.props.errorMessage){
            return(
                <span>{ this.props.errorMessage }</span>
            )
        }
    };

    renderTextField = (field) => {
        return(
            <div>
                <label>{ field.label }</label>
                <input
                    type="text"
                    { ...field.input }
                />
            </div>
        )
    };

    renderPasswordField = (field) => {
        return(
            <div>
                <label>{ field.label }</label>
                <input
                    type="password"
                    { ...field.input }
                />
            </div>
        )
    };

    renderForm = () => {
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={ handleSubmit(this.onSubmit) } >
                <Field
                    label="Email"
                    name="email"
                    component={ this.renderTextField } />
                <Field
                    label="Password"
                    name="password"
                    component={ this.renderPasswordField } />
                { this.renderServerErrorMessage() }
                <button type="submit">Sign in</button>
            </form>
        )
    };

    onSubmit = (values) => {
        this.props.signinUser(values, () => {
            this.props.history.push('/dashboard');
        });
    };

    render(){
        return(
            <div>
                { this.renderForm() }
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return{
        errorMessage: state.authentication.signinError
    };
};

export default reduxForm({
    form: 'signin'
})(
    connect(mapStateToProps, { signinUser })(Signin)
);
