class User < ApplicationRecord
    has_secure_password

    # IMPORTANT: Any validation changes made in this file should also be
    # implemented in JavaScript validations.
    #
    # - Ruby regex is different than JS regex. Ruby starts with \A and ends
    # with \z
    # - User is validated on the client-side, therefore there is no need to
    # display error message from the server side except email uniqueness.

    EMAIL_REGEX = /\A^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$\z/
    ALL_LETTERS_AND_SINGLE_SPACE_REGEX = /\A^[^\s\d]*(\s[^\s\d]*)?$\z/

    # -- First Name -------------------------------------------------------------- #
    validates :first_name,
              presence:     { message: '' },
              format:       { with: ALL_LETTERS_AND_SINGLE_SPACE_REGEX, message: '' },
              length:       { maximum: 20, message: '' }

    # -- Last Name --------------------------------------------------------------- #
    validates :last_name,
              presence:     { message: '' },
              format:       { with: ALL_LETTERS_AND_SINGLE_SPACE_REGEX, message: '' },
              length:       { maximum: 20, message: '' }

    # -- Email ------------------------------------------------------------------- #
    validates :email,
              presence:     { message: '' },
              format:       { with: EMAIL_REGEX, message: '' },
              length:       { maximum: 50, message: '' },
              uniqueness:   { case_sensitive: false, message: 'This email is already registered' }

    # -- Password ---------------------------------------------------------------- #
    validates :password,
              presence:     { message: '' },
              length:       { minimum: 8, message: '' }
end
