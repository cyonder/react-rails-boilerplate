import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import {
    signupUser,
    signinUser
} from '../../actions/authentication';

import SignupValidation from '../../validations/signupValidation';

class Signup extends Component {
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
        const { meta: { touched, error } } = field;

        return(
            <div>
                <label>{ field.label }</label>
                <input
                    type="text"
                    { ...field.input }
                />
                { touched ? error : '' }
            </div>
        )
    };

    renderPasswordField = (field) => {
        const { meta: { touched, error } } = field;

        return(
            <div>
                <label>{ field.label }</label>
                <input
                    type="password"
                    { ...field.input }
                />
                { touched ? error : '' }
            </div>
        )
    };

    renderForm = () => {
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={ handleSubmit(this.onSubmit) } >
                <Field
                    label="First Name"
                    name="first_name"
                    component={ this.renderTextField } />
                <Field
                    label="Last Name"
                    name="last_name"
                    component={ this.renderTextField } />
                <Field
                    label="Email"
                    name="email"
                    component={ this.renderTextField } />
                <Field
                    label="Email Confirmation"
                    name="email_confirmation"
                    component={ this.renderTextField } />
                <Field
                    label="Password"
                    name="password"
                    component={ this.renderPasswordField } />
                { this.renderServerErrorMessage() }
                <button type="submit">Sign up</button>
            </form>
        )
    };

    onSubmit = (values) => {
        this.props.signupUser(values, () => {
            let email = values.email;
            let password = values.password

            this.props.signinUser({ email, password }, () => {
                this.props.history.push('/dashboard');
            });
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
        errorMessage: state.authentication.signupError
    };
};

export default reduxForm({
    form: 'signup',
    validate: (values) => SignupValidation(values)
})(
    connect(mapStateToProps, { signupUser, signinUser })(Signup)
);
