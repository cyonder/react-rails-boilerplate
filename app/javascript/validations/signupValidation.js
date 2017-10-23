import {
    EMAIL_REGEX,
    ALL_LETTERS_AND_SINGLE_SPACE_REGEX
} from '../constants/configurations';

import { BANNED_DOMAINS } from '../constants/blacklistedDomains';

// IMPORTANT: Any validation changes made in this file should also be
// implemented in the User model.

export default function SignupValidation(values){
    const errors = {};

    let first_name = values.first_name;
    let last_name = values.last_name;
    let email = values.email;
    let email_confirmation = values.email_confirmation;
    let password = values.password;

    if(!first_name){
        errors.first_name = 'Required';
    }else if(!ALL_LETTERS_AND_SINGLE_SPACE_REGEX.test(first_name)){
        errors.first_name = 'First name can have only letters and a single space';
    }else if(first_name.length > 20){
        errors.first_name = 'First name cannot be longer than 20 characters';
    }

    if(!last_name){
        errors.last_name = 'Required';
    }else if(!ALL_LETTERS_AND_SINGLE_SPACE_REGEX.test(last_name)){
        errors.last_name = 'Last name can have only letters and a single space';
    }else if(last_name.length > 20){
        errors.last_name = 'Last name cannot be longer than 20 characters';
    }

    if(!email){
        errors.email = 'Required';
    }else if(!EMAIL_REGEX.test(email)){
        errors.email = 'Incorrect format for the email';
    }else if(email.length > 50){
        errors.email = 'Email cannot be longer than 50 characters'
    }else if(BANNED_DOMAINS.includes(email.substr(email.indexOf('@') + 1))){
        errors.email = 'You are not allowed to register using disposable emails';
    }

    if(!email_confirmation){
        errors.email_confirmation = 'Required';
    }else if(email_confirmation != email){
        errors.email_confirmation = 'Emails must match';
    }

    if(!password){
        errors.password = 'Required';
    }else if(password.length < 8){
        errors.password = 'Password should be at least 8 characters long'
    }

    return errors;
};
